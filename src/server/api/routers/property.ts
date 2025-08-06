import { z } from "zod";
import { 
  createTRPCRouter, 
  protectedProcedure, 
  publicProcedure,
  adminProcedure,
  editorProcedure 
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { DealBreakerValidator } from "~/lib/validators/deal-breakers";
import { 
  extractPropertyData, 
  extractPropertyId, 
  isValidPropertyUrl, 
  getWebsiteName, 
  PropertyExtractionError 
} from "~/lib/scrapers/property-extractor";

// Validation schemas
const createPropertySchema = z.object({
  url: z.string().url("Must be a valid URL").refine(
    (url) => isValidPropertyUrl(url),
    {
      message: "URL must be from realestate.com.au or domain.com.au",
    }
  ),
  notes: z.string().optional(),
  skipExisting: z.boolean().default(false),
});

const updatePropertySchema = z.object({
  id: z.string().cuid(),
  status: z.enum(['RESEARCHING', 'INTERESTED', 'VIEWING_SCHEDULED', 'VIEWED', 'OFFER_PENDING', 'REJECTED', 'PURCHASED', 'ARCHIVED']).optional(),
  notes: z.string().optional(),
});

const dealBreakerSchema = z.object({
  propertyId: z.string().cuid(),
  checks: z.object({
    isFloodZone: z.boolean(),
    isTwoStory: z.boolean(),
    hasCarAccommodation: z.boolean(),
    hasSolarPanels: z.boolean(),
    isDogFriendly: z.boolean(),
    isMainRoad: z.boolean(),
    hasOverheadPowerLines: z.boolean(),
  }),
});

export const propertyRouter = createTRPCRouter({
  // Get all properties with optional filtering
  list: protectedProcedure
    .input(z.object({
      status: z.enum(['RESEARCHING', 'INTERESTED', 'VIEWING_SCHEDULED', 'VIEWED', 'OFFER_PENDING', 'REJECTED', 'PURCHASED', 'ARCHIVED']).optional(),
      suburb: z.string().optional(),
      limit: z.number().min(1).max(50).default(10),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ ctx, input }) => {
      const { status, suburb, limit, offset } = input;
      
      const where: any = {
        // Only show active properties by default (not archived)
        ...(status ? { status } : { status: { not: 'ARCHIVED' } }),
        ...(suburb && { suburb: { contains: suburb, mode: 'insensitive' } }),
      };

      const [properties, total] = await Promise.all([
        ctx.db.property.findMany({
          where,
          include: {
            suburbProfile: {
              select: {
                name: true,
                medianHousePrice: true,
                floodRisk: true,
                crimeStats: true,
              },
            },
            analysis: {
              select: {
                estimatedValue: true,
                overpricing: true,
                priceAssessment: true,
                confidence: true,
              },
            },
            notes: {
              select: {
                id: true,
                content: true,
                type: true,
                createdAt: true,
                author: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
              orderBy: { createdAt: 'desc' },
              take: 3, // Latest 3 notes
            },
            _count: {
              select: {
                notes: true,
                documents: true,
              },
            },
          },
          orderBy: [
            { updatedAt: 'desc' },
            { createdAt: 'desc' },
          ],
          skip: offset,
          take: limit,
        }),
        ctx.db.property.count({ where }),
      ]);

      return {
        properties,
        pagination: {
          total,
          hasMore: offset + limit < total,
        },
      };
    }),

  // Get property by ID with full details
  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const property = await ctx.db.property.findUnique({
        where: { id: input.id },
        include: {
          suburbProfile: true,
          analysis: true,
          notes: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  role: true,
                },
              },
              mentions: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              replies: {
                include: {
                  author: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                      role: true,
                    },
                  },
                },
                orderBy: { createdAt: 'asc' },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          documents: true,
          activities: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
          createdBy: {
            select: {
              id: true,
              name: true,
              image: true,
              role: true,
            },
          },
        },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      return property;
    }),

  // Create new property from URL with comprehensive web scraping
  create: editorProcedure
    .input(createPropertySchema)
    .mutation(async ({ ctx, input }) => {
      const { url, notes, skipExisting } = input;
      
      // Check if property already exists
      const existingProperty = await ctx.db.property.findUnique({
        where: { url },
        include: {
          suburbProfile: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      if (existingProperty && !skipExisting) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Property already exists in the system',
          cause: { existingPropertyId: existingProperty.id },
        });
      }

      if (existingProperty && skipExisting) {
        return existingProperty;
      }

      try {
        // Extract property data using our comprehensive scraper
        console.log(`Starting property extraction for: ${url}`);
        const extractedData = await extractPropertyData(url);
        console.log(`Successfully extracted data for: ${extractedData.address}`);

        // Find or create suburb profile
        let suburbProfile = await ctx.db.suburbProfile.findUnique({
          where: {
            name_state_postcode: {
              name: extractedData.suburb,
              state: extractedData.state,
              postcode: extractedData.postcode,
            },
          },
        });

        if (!suburbProfile) {
          console.log(`Creating new suburb profile for: ${extractedData.suburb}`);
          suburbProfile = await ctx.db.suburbProfile.create({
            data: {
              name: extractedData.suburb,
              state: extractedData.state,
              postcode: extractedData.postcode,
              lastUpdated: new Date(),
              sources: {
                propertyExtraction: {
                  url,
                  extractedAt: new Date().toISOString(),
                  source: getWebsiteName(url),
                },
              },
            },
          });
        }

        // Create property with extracted data
        const property = await ctx.db.property.create({
          data: {
            url: extractedData.url,
            address: extractedData.address,
            suburb: extractedData.suburb,
            state: extractedData.state,
            postcode: extractedData.postcode,
            priceDisplay: extractedData.priceDisplay,
            priceMin: extractedData.priceMin,
            priceMax: extractedData.priceMax,
            bedrooms: extractedData.bedrooms,
            bathrooms: extractedData.bathrooms,
            parking: extractedData.parking,
            landSize: extractedData.landSize,
            propertyType: extractedData.propertyType,
            description: extractedData.description,
            features: extractedData.features,
            images: extractedData.images,
            agentName: extractedData.agentName,
            agentAgency: extractedData.agentAgency,
            agentPhone: extractedData.agentPhone,
            agentEmail: extractedData.agentEmail,
            hasFloodRisk: extractedData.hasFloodRisk,
            hasTwoStories: extractedData.hasTwoStories,
            hasCarParking: extractedData.hasCarParking,
            hasSolarPanels: extractedData.hasSolarPanels,
            isDogFriendly: extractedData.isDogFriendly,
            isMainRoad: extractedData.isMainRoad,
            hasPowerLines: extractedData.hasPowerLines,
            listingId: extractedData.listingId,
            listedDate: extractedData.listedDate,
            daysOnMarket: extractedData.daysOnMarket,
            scrapedData: extractedData.scrapedData,
            status: 'RESEARCHING',
            statusHistory: [
              {
                status: 'RESEARCHING',
                timestamp: new Date().toISOString(),
                userId: ctx.session.user.id,
                notes: `Property added from ${getWebsiteName(url)}`,
              },
            ],
            lastScraped: new Date(),
            createdById: ctx.session.user.id,
            suburbId: suburbProfile.id,
          },
          include: {
            suburbProfile: true,
            createdBy: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });

        console.log(`Successfully created property: ${property.id}`);

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'PROPERTY_ADDED',
            action: `Added property: ${property.address}`,
            userId: ctx.session.user.id,
            propertyId: property.id,
            metadata: {
              url,
              source: getWebsiteName(url),
              extractedData: {
                bedrooms: extractedData.bedrooms,
                bathrooms: extractedData.bathrooms,
                parking: extractedData.parking,
                priceDisplay: extractedData.priceDisplay,
                landSize: extractedData.landSize,
              },
            },
          },
        });

        // Add initial note if provided
        if (notes) {
          await ctx.db.note.create({
            data: {
              content: notes,
              type: 'GENERAL',
              propertyId: property.id,
              authorId: ctx.session.user.id,
            },
          });
        }

        // Auto-check for deal breakers
        const dealBreakers = [];
        if (extractedData.hasFloodRisk) dealBreakers.push('Flood risk detected');
        if (extractedData.hasTwoStories) dealBreakers.push('Two-story property');
        if (!extractedData.hasCarParking) dealBreakers.push('No car parking');
        if (!extractedData.hasSolarPanels) dealBreakers.push('No solar panels');
        if (!extractedData.isDogFriendly) dealBreakers.push('Not dog-friendly');
        if (extractedData.isMainRoad) dealBreakers.push('Main road location');
        if (extractedData.hasPowerLines) dealBreakers.push('Overhead power lines');

        // If deal breakers found, add warning note
        if (dealBreakers.length > 0) {
          await ctx.db.note.create({
            data: {
              content: `⚠️ **Potential Deal Breakers Detected:**\n\n${dealBreakers.map(db => `• ${db}`).join('\n')}\n\n*Please review these issues before proceeding.*`,
              type: 'IMPORTANT',
              propertyId: property.id,
              authorId: ctx.session.user.id,
            },
          });
        }

        return property;

      } catch (error) {
        console.error('Error creating property:', error);
        
        if (error instanceof PropertyExtractionError) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Property extraction failed: ${error.message}`,
            cause: {
              stage: error.stage,
              url: error.url,
              originalError: error.cause,
            },
          });
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create property due to an unexpected error',
          cause: error,
        });
      }
    }),

  // Update property status or details
  update: editorProcedure
    .input(updatePropertySchema)
    .mutation(async ({ ctx, input }) => {
      const { id, status, notes } = input;

      const property = await ctx.db.property.findUnique({
        where: { id },
        select: { 
          id: true, 
          status: true, 
          statusHistory: true,
          address: true,
        },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      const updateData: any = {};
      
      if (status && status !== property.status) {
        // Update status and history
        const newStatusHistory = [
          ...(property.statusHistory as any[]),
          {
            status,
            timestamp: new Date(),
            userId: ctx.session.user.id,
            notes: notes || `Status changed to ${status}`,
          },
        ];
        
        updateData.status = status;
        updateData.statusHistory = newStatusHistory;

        // Create activity log for status change
        await ctx.db.activity.create({
          data: {
            type: 'STATUS_CHANGED',
            action: `Changed status to ${status}`,
            userId: ctx.session.user.id,
            propertyId: id,
            metadata: {
              previousStatus: property.status,
              newStatus: status,
              notes,
            },
          },
        });
      }

      const updatedProperty = await ctx.db.property.update({
        where: { id },
        data: updateData,
        include: {
          suburbProfile: true,
          analysis: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      return updatedProperty;
    }),

  // Check deal breakers for a property
  checkDealBreakers: protectedProcedure
    .input(dealBreakerSchema)
    .mutation(async ({ ctx, input }) => {
      const { propertyId, checks } = input;

      const property = await ctx.db.property.findUnique({
        where: { id: propertyId },
        select: { id: true, address: true },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      // Identify deal breakers based on family requirements
      const dealBreakers = [];
      
      if (checks.isFloodZone) {
        dealBreakers.push('Located in flood zone');
      }
      if (checks.isTwoStory) {
        dealBreakers.push('Two-story property (family requires single story)');
      }
      if (!checks.hasCarAccommodation) {
        dealBreakers.push('No car accommodation (family requires 2+ spaces)');
      }
      if (!checks.hasSolarPanels) {
        dealBreakers.push('No solar panels installed');
      }
      if (!checks.isDogFriendly) {
        dealBreakers.push('Not dog-friendly (family has dogs)');
      }
      if (checks.isMainRoad) {
        dealBreakers.push('Located on heavy traffic road');
      }
      if (checks.hasOverheadPowerLines) {
        dealBreakers.push('Overhead power lines present');
      }

      // If deal breakers found, automatically update property status
      if (dealBreakers.length > 0) {
        await ctx.db.property.update({
          where: { id: propertyId },
          data: {
            status: 'REJECTED',
            statusHistory: [
              ...(property as any).statusHistory || [],
              {
                status: 'REJECTED',
                timestamp: new Date(),
                userId: ctx.session.user.id,
                notes: `Automatically rejected: ${dealBreakers.join(', ')}`,
              },
            ],
          },
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'STATUS_CHANGED',
            action: 'Property automatically rejected due to deal breakers',
            userId: ctx.session.user.id,
            propertyId,
            metadata: {
              dealBreakers,
              checks,
            },
          },
        });
      }

      return {
        hasDealbBreakers: dealBreakers.length > 0,
        dealBreakers,
        autoRejected: dealBreakers.length > 0,
      };
    }),

  // Delete property (admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const property = await ctx.db.property.findUnique({
        where: { id: input.id },
        select: { id: true, address: true },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      // Soft delete by archiving
      await ctx.db.property.update({
        where: { id: input.id },
        data: {
          status: 'ARCHIVED',
          statusHistory: [
            ...(property as any).statusHistory || [],
            {
              status: 'ARCHIVED',
              timestamp: new Date(),
              userId: ctx.session.user.id,
              notes: 'Property archived by admin',
            },
          ],
        },
      });

      // Create activity log
      await ctx.db.activity.create({
        data: {
          type: 'PROPERTY_ARCHIVED',
          action: `Archived property: ${property.address}`,
          userId: ctx.session.user.id,
          propertyId: input.id,
          metadata: {
            reason: 'Admin deletion',
          },
        },
      });

      return { success: true };
    }),

  // Get property statistics
  getStats: protectedProcedure
    .query(async ({ ctx }) => {
      const [
        totalProperties,
        byStatus,
        recentlyAdded,
        needingAttention,
      ] = await Promise.all([
        ctx.db.property.count({
          where: { status: { not: 'ARCHIVED' } },
        }),
        ctx.db.property.groupBy({
          by: ['status'],
          _count: { status: true },
          where: { status: { not: 'ARCHIVED' } },
        }),
        ctx.db.property.count({
          where: {
            status: { not: 'ARCHIVED' },
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
        }),
        ctx.db.property.count({
          where: {
            OR: [
              { status: 'RESEARCHING' },
              { status: 'VIEWING_SCHEDULED' },
              { status: 'OFFER_PENDING' },
            ],
          },
        }),
      ]);

      const statusCounts = byStatus.reduce((acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalProperties,
        byStatus: statusCounts,
        recentlyAdded,
        needingAttention,
      };
    }),

  // Enhanced deal-breaker validation with detailed analysis
  validateDealBreakers: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const property = await ctx.db.property.findUnique({
        where: { id: input.id },
        include: {
          suburbProfile: true,
        },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      const validation = DealBreakerValidator.validate(property as any);
      const recommendation = DealBreakerValidator.generateRecommendation(validation);

      return {
        ...validation,
        recommendation,
        propertyId: property.id,
        address: property.address,
      };
    }),

  // Rescrape property data to update with latest information
  rescrape: editorProcedure
    .input(z.object({ 
      id: z.string().cuid(),
      forceUpdate: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, forceUpdate } = input;

      const property = await ctx.db.property.findUnique({
        where: { id },
        select: { 
          id: true, 
          url: true, 
          address: true, 
          lastScraped: true,
        },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      // Check if property was scraped recently (within last 24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      if (!forceUpdate && property.lastScraped && property.lastScraped > oneDayAgo) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: 'Property was scraped recently. Use forceUpdate=true to override.',
        });
      }

      try {
        console.log(`Re-scraping property: ${property.id} - ${property.url}`);
        const extractedData = await extractPropertyData(property.url);
        console.log(`Successfully re-scraped: ${extractedData.address}`);

        // Update property with new data
        const updatedProperty = await ctx.db.property.update({
          where: { id },
          data: {
            address: extractedData.address,
            suburb: extractedData.suburb,
            state: extractedData.state,
            postcode: extractedData.postcode,
            priceDisplay: extractedData.priceDisplay,
            priceMin: extractedData.priceMin,
            priceMax: extractedData.priceMax,
            bedrooms: extractedData.bedrooms,
            bathrooms: extractedData.bathrooms,
            parking: extractedData.parking,
            landSize: extractedData.landSize,
            propertyType: extractedData.propertyType,
            description: extractedData.description,
            features: extractedData.features,
            images: extractedData.images,
            agentName: extractedData.agentName,
            agentAgency: extractedData.agentAgency,
            agentPhone: extractedData.agentPhone,
            agentEmail: extractedData.agentEmail,
            hasFloodRisk: extractedData.hasFloodRisk,
            hasTwoStories: extractedData.hasTwoStories,
            hasCarParking: extractedData.hasCarParking,
            hasSolarPanels: extractedData.hasSolarPanels,
            isDogFriendly: extractedData.isDogFriendly,
            isMainRoad: extractedData.isMainRoad,
            hasPowerLines: extractedData.hasPowerLines,
            listingId: extractedData.listingId,
            listedDate: extractedData.listedDate,
            daysOnMarket: extractedData.daysOnMarket,
            scrapedData: {
              ...extractedData.scrapedData,
              previousScrape: property.lastScraped,
            },
            lastScraped: new Date(),
          },
          include: {
            suburbProfile: true,
            analysis: true,
            createdBy: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'PROPERTY_UPDATED',
            action: `Property data refreshed from ${getWebsiteName(property.url)}`,
            userId: ctx.session.user.id,
            propertyId: id,
            metadata: {
              source: getWebsiteName(property.url),
              previousScrape: property.lastScraped,
              forceUpdate,
            },
          },
        });

        return {
          property: updatedProperty,
          message: 'Property data successfully refreshed',
        };

      } catch (error) {
        console.error('Error re-scraping property:', error);
        
        if (error instanceof PropertyExtractionError) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Property re-scraping failed: ${error.message}`,
            cause: {
              stage: error.stage,
              url: error.url,
              originalError: error.cause,
            },
          });
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to re-scrape property',
          cause: error,
        });
      }
    }),

  // Preview property data without saving (for testing URLs)
  preview: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      const { url } = input;
      
      if (!isValidPropertyUrl(url)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'URL must be from realestate.com.au or domain.com.au',
        });
      }

      try {
        console.log(`Previewing property from: ${url}`);
        const extractedData = await extractPropertyData(url);
        
        return {
          success: true,
          data: extractedData,
          website: getWebsiteName(url),
          message: `Successfully extracted data from ${getWebsiteName(url)}`,
        };
      } catch (error) {
        console.error('Error previewing property:', error);
        
        if (error instanceof PropertyExtractionError) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Property preview failed: ${error.message}`,
            cause: {
              stage: error.stage,
              url: error.url,
              originalError: error.cause,
            },
          });
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to preview property',
        });
      }
    }),
});
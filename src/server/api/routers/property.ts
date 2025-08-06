import { z } from "zod";
import { 
  createTRPCRouter, 
  protectedProcedure, 
  publicProcedure,
  adminProcedure,
  editorProcedure 
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

// Validation schemas
const createPropertySchema = z.object({
  url: z.string().url("Must be a valid URL"),
  notes: z.string().optional(),
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

  // Create new property from URL (requires web scraping)
  create: editorProcedure
    .input(createPropertySchema)
    .mutation(async ({ ctx, input }) => {
      const { url, notes } = input;
      
      // Check if property already exists
      const existingProperty = await ctx.db.property.findUnique({
        where: { url },
      });

      if (existingProperty) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Property already exists in the system',
        });
      }

      try {
        // TODO: Implement web scraping agent here
        // For now, create a placeholder property
        const property = await ctx.db.property.create({
          data: {
            url,
            address: 'Pending address extraction...',
            suburb: 'Unknown',
            state: 'SA',
            postcode: '0000',
            priceDisplay: 'Price TBA',
            bedrooms: 0,
            bathrooms: 0,
            parking: 0,
            propertyType: 'HOUSE',
            description: 'Property details being extracted...',
            features: [],
            images: [],
            scrapedData: {},
            status: 'RESEARCHING',
            statusHistory: [
              {
                status: 'RESEARCHING',
                timestamp: new Date(),
                userId: ctx.session.user.id,
                notes: 'Property added to research list',
              },
            ],
            createdById: ctx.session.user.id,
            suburbId: 'temp-suburb-id', // TODO: Create or find suburb
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

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'PROPERTY_ADDED',
            action: `Added property: ${property.address}`,
            userId: ctx.session.user.id,
            propertyId: property.id,
            metadata: {
              url,
              source: 'manual',
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

        return property;
      } catch (error) {
        console.error('Error creating property:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create property',
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
});
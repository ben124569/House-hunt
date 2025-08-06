import { z } from "zod";
import { 
  createTRPCRouter, 
  protectedProcedure, 
  publicProcedure, 
  editorProcedure 
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

// Validation schemas
const suburbSearchSchema = z.object({
  name: z.string().min(1),
  state: z.string().length(2).optional().default('SA'),
  postcode: z.string().optional(),
});

const updateSuburbSchema = z.object({
  id: z.string().cuid(),
  forceRefresh: z.boolean().default(false),
});

export const suburbRouter = createTRPCRouter({
  // Get suburb profile by name and state
  getByName: protectedProcedure
    .input(suburbSearchSchema)
    .query(async ({ ctx, input }) => {
      const { name, state, postcode } = input;
      
      const where = {
        name: { equals: name, mode: 'insensitive' as const },
        state,
        ...(postcode && { postcode }),
      };

      const suburb = await ctx.db.suburbProfile.findFirst({
        where,
        include: {
          properties: {
            select: {
              id: true,
              address: true,
              status: true,
              priceDisplay: true,
              createdAt: true,
            },
            where: {
              status: { not: 'ARCHIVED' },
            },
            orderBy: { createdAt: 'desc' },
            take: 5, // Latest 5 properties
          },
          history: {
            orderBy: { recordedAt: 'desc' },
            take: 3, // Latest 3 data updates
          },
        },
      });

      if (!suburb) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Suburb "${name}, ${state}" not found. You may need to research this suburb first.`,
        });
      }

      return suburb;
    }),

  // Get suburb by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const suburb = await ctx.db.suburbProfile.findUnique({
        where: { id: input.id },
        include: {
          properties: {
            select: {
              id: true,
              address: true,
              status: true,
              priceDisplay: true,
              bedrooms: true,
              bathrooms: true,
              createdAt: true,
            },
            where: {
              status: { not: 'ARCHIVED' },
            },
            orderBy: { createdAt: 'desc' },
          },
          history: {
            orderBy: { recordedAt: 'desc' },
            take: 5,
          },
        },
      });

      if (!suburb) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Suburb profile not found',
        });
      }

      return suburb;
    }),

  // List all suburbs (for dropdown/search)
  list: protectedProcedure
    .input(z.object({
      search: z.string().optional(),
      state: z.string().optional(),
      limit: z.number().min(1).max(100).default(20),
    }))
    .query(async ({ ctx, input }) => {
      const { search, state, limit } = input;

      const where: any = {};
      
      if (search) {
        where.name = { contains: search, mode: 'insensitive' };
      }
      
      if (state) {
        where.state = state;
      }

      const suburbs = await ctx.db.suburbProfile.findMany({
        where,
        select: {
          id: true,
          name: true,
          state: true,
          postcode: true,
          medianHousePrice: true,
          medianUnitPrice: true,
          floodRisk: true,
          lastUpdated: true,
          _count: {
            select: {
              properties: {
                where: { status: { not: 'ARCHIVED' } },
              },
            },
          },
        },
        orderBy: [
          { name: 'asc' },
          { postcode: 'asc' },
        ],
        take: limit,
      });

      return suburbs;
    }),

  // Get or create suburb profile (used when adding properties)
  getOrCreate: editorProcedure
    .input(suburbSearchSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, state, postcode } = input;
      
      // First, try to find existing suburb
      const existingSuburb = await ctx.db.suburbProfile.findFirst({
        where: {
          name: { equals: name, mode: 'insensitive' },
          state,
          ...(postcode && { postcode }),
        },
      });

      if (existingSuburb) {
        // Check if data is stale (older than 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const needsRefresh = existingSuburb.lastUpdated < thirtyDaysAgo;

        if (needsRefresh) {
          // TODO: Trigger suburb intelligence agent to refresh data
          console.log(`Suburb ${name} needs data refresh (last updated: ${existingSuburb.lastUpdated})`);
        }

        return existingSuburb;
      }

      try {
        // Create new suburb profile with basic data
        // TODO: Trigger suburb intelligence agent to populate full data
        const newSuburb = await ctx.db.suburbProfile.create({
          data: {
            name,
            state,
            postcode: postcode || '0000',
            latitude: 0, // TODO: Get from geocoding
            longitude: 0, // TODO: Get from geocoding
            demographics: {},
            schools: [],
            catchments: [],
            crimeStats: {},
            transport: {},
            commuteTime: {},
            amenities: {},
            marketData: {},
            developments: {},
            sources: [],
            lastUpdated: new Date(),
          },
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'SUBURB_ADDED',
            action: `Added new suburb profile: ${name}, ${state}`,
            userId: ctx.session.user.id,
            metadata: {
              suburbId: newSuburb.id,
              source: 'property_addition',
            },
          },
        });

        return newSuburb;
      } catch (error) {
        console.error('Error creating suburb:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create suburb profile',
        });
      }
    }),

  // Update suburb data (force refresh)
  update: editorProcedure
    .input(updateSuburbSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, forceRefresh } = input;

      const suburb = await ctx.db.suburbProfile.findUnique({
        where: { id },
        select: { id: true, name: true, state: true, lastUpdated: true },
      });

      if (!suburb) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Suburb profile not found',
        });
      }

      try {
        // Save current data to history before updating
        await ctx.db.suburbHistory.create({
          data: {
            suburbId: id,
            data: suburb as any, // Store current state
            changes: forceRefresh ? { reason: 'manual_refresh' } : {},
            recordedAt: new Date(),
          },
        });

        // TODO: Trigger suburb intelligence agent to refresh all data
        const updatedSuburb = await ctx.db.suburbProfile.update({
          where: { id },
          data: {
            lastUpdated: new Date(),
            // TODO: Update with fresh data from agents
          },
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'SUBURB_UPDATED',
            action: `Updated suburb data: ${suburb.name}, ${suburb.state}`,
            userId: ctx.session.user.id,
            metadata: {
              suburbId: id,
              forceRefresh,
              previousUpdate: suburb.lastUpdated,
            },
          },
        });

        return updatedSuburb;
      } catch (error) {
        console.error('Error updating suburb:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update suburb data',
        });
      }
    }),

  // Get suburbs needing data refresh
  getStaleSuburbs: editorProcedure
    .query(async ({ ctx }) => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      
      const staleSuburbs = await ctx.db.suburbProfile.findMany({
        where: {
          lastUpdated: { lt: thirtyDaysAgo },
          properties: {
            some: {
              status: { not: 'ARCHIVED' },
            },
          },
        },
        select: {
          id: true,
          name: true,
          state: true,
          postcode: true,
          lastUpdated: true,
          _count: {
            select: {
              properties: {
                where: { status: { not: 'ARCHIVED' } },
              },
            },
          },
        },
        orderBy: { lastUpdated: 'asc' },
      });

      return staleSuburbs;
    }),

  // Get suburb comparison data
  compare: protectedProcedure
    .input(z.object({
      suburbIds: z.array(z.string().cuid()).min(2).max(5),
    }))
    .query(async ({ ctx, input }) => {
      const { suburbIds } = input;

      const suburbs = await ctx.db.suburbProfile.findMany({
        where: { id: { in: suburbIds } },
        select: {
          id: true,
          name: true,
          state: true,
          postcode: true,
          medianHousePrice: true,
          medianUnitPrice: true,
          rentalYield: true,
          growthRate: true,
          daysOnMarket: true,
          floodRisk: true,
          bushfireRisk: true,
          crimeStats: true,
          demographics: true,
          lastUpdated: true,
        },
      });

      if (suburbs.length !== suburbIds.length) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'One or more suburbs not found',
        });
      }

      return {
        suburbs,
        comparison: {
          // Add comparison logic here
          medianPriceRange: {
            min: Math.min(...suburbs.map(s => s.medianHousePrice || 0)),
            max: Math.max(...suburbs.map(s => s.medianHousePrice || 0)),
          },
          riskLevels: suburbs.map(s => ({
            id: s.id,
            name: s.name,
            flood: s.floodRisk,
            bushfire: s.bushfireRisk,
          })),
        },
      };
    }),

  // Get nearby suburbs
  getNearby: protectedProcedure
    .input(z.object({
      suburbId: z.string().cuid(),
      radius: z.number().min(1).max(50).default(10), // km
    }))
    .query(async ({ ctx, input }) => {
      const { suburbId, radius } = input;

      const targetSuburb = await ctx.db.suburbProfile.findUnique({
        where: { id: suburbId },
        select: { latitude: true, longitude: true, name: true },
      });

      if (!targetSuburb) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Target suburb not found',
        });
      }

      // TODO: Implement proper geographic distance calculation
      // For now, return suburbs in the same state
      const nearbySuburbs = await ctx.db.suburbProfile.findMany({
        where: {
          id: { not: suburbId },
          // TODO: Add geographic distance calculation
        },
        select: {
          id: true,
          name: true,
          state: true,
          postcode: true,
          medianHousePrice: true,
          floodRisk: true,
          _count: {
            select: {
              properties: {
                where: { status: { not: 'ARCHIVED' } },
              },
            },
          },
        },
        take: 10,
      });

      return {
        target: targetSuburb,
        nearby: nearbySuburbs,
      };
    }),
});
import { z } from "zod";
import { 
  createTRPCRouter, 
  protectedProcedure, 
  publicProcedure, 
  editorProcedure 
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { 
  getOrCreateSuburbProfile,
  researchSuburb,
  generateIntelligenceSummary,
  getCouncilArea,
  isHighFloodRiskSuburb,
  batchResearchSuburbs,
  NORTHERN_ADELAIDE_SUBURBS,
  COUNCIL_AREAS,
  type ComprehensiveSuburbData,
} from "~/lib/research/suburb-intelligence";

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

const researchSuburbSchema = z.object({
  name: z.string().min(1),
  postcode: z.string().optional(),
  forceRefresh: z.boolean().default(false),
});

const batchResearchSchema = z.object({
  suburbs: z.array(z.object({
    name: z.string().min(1),
    postcode: z.string().optional(),
  })).min(1).max(10),
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

      // Enrich with intelligence summary if we have comprehensive data
      const intelligence = suburb.dataConfidence && suburb.dataConfidence > 50 
        ? generateIntelligenceSummary({
            name: suburb.name,
            state: suburb.state,
            postcode: suburb.postcode,
            demographics: suburb.demographics as any,
            schools: suburb.schools as any,
            crimeStats: suburb.crimeStats as any,
            transport: suburb.transport as any,
            amenities: suburb.amenities as any,
            marketData: suburb.marketData as any,
            developments: suburb.developments as any,
            riskAssessment: {
              floodRisk: suburb.floodRisk ? { level: suburb.floodRisk } : undefined,
              bushfireRisk: suburb.bushfireRisk ? { level: suburb.bushfireRisk } : undefined,
            },
            sources: suburb.sources as any,
            dataConfidence: suburb.dataConfidence,
            lastUpdated: suburb.lastUpdated,
          } as ComprehensiveSuburbData)
        : null;

      return {
        ...suburb,
        intelligence,
        councilArea: getCouncilArea(suburb.name),
        isHighFloodRisk: isHighFloodRiskSuburb(suburb.name),
      };
    }),

  // List all suburbs (for dropdown/search) - simplified to avoid COUNCIL_AREAS issue
  list: protectedProcedure
    .input(z.object({
      search: z.string().optional(),
      state: z.string().optional(),
      northernAdelaideOnly: z.boolean().default(false),
      limit: z.number().min(1).max(100).default(20),
    }))
    .query(async ({ ctx, input }) => {
      const { search, state, northernAdelaideOnly, limit } = input;

      const where: any = {};
      
      if (search) {
        where.name = { contains: search, mode: 'insensitive' };
      }
      
      if (state) {
        where.state = state;
      }

      // Filter to Northern Adelaide suburbs only if requested
      if (northernAdelaideOnly) {
        where.name = {
          ...where.name,
          in: Array.from(NORTHERN_ADELAIDE_SUBURBS),
        };
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
          dataConfidence: true,
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

      return suburbs.map(suburb => ({
        ...suburb,
        councilArea: getCouncilArea(suburb.name),
        isHighFloodRisk: isHighFloodRiskSuburb(suburb.name),
        needsResearch: !suburb.dataConfidence || suburb.dataConfidence < 70,
      }));
    }),

  // Get or create suburb profile (used when adding properties) - now uses intelligence system
  getOrCreate: editorProcedure
    .input(suburbSearchSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, state, postcode } = input;
      
      try {
        // Use the intelligence system to get or create the profile
        const suburbProfile = await getOrCreateSuburbProfile(name, postcode, false);
        
        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'SUBURB_ADDED',
            action: `Retrieved/created suburb profile: ${name}, ${state}`,
            userId: ctx.session.user.id,
            metadata: {
              suburbId: suburbProfile.id,
              source: 'property_addition',
              dataConfidence: suburbProfile.dataConfidence,
            },
          },
        });

        return {
          ...suburbProfile,
          councilArea: getCouncilArea(suburbProfile.name),
          isHighFloodRisk: isHighFloodRiskSuburb(suburbProfile.name),
        };
      } catch (error) {
        console.error('Error in getOrCreate suburb:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to get or create suburb profile: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }),

  // Research a suburb comprehensively (new endpoint)
  research: editorProcedure
    .input(researchSuburbSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, postcode, forceRefresh } = input;

      try {
        // Perform comprehensive research
        const researchData = await researchSuburb(name, postcode, forceRefresh);
        
        // Generate intelligence summary
        const intelligence = generateIntelligenceSummary(researchData);
        
        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'SUBURB_ADDED',
            action: `Comprehensive research completed for ${name}${postcode ? ` ${postcode}` : ''}`,
            userId: ctx.session.user.id,
            metadata: {
              dataConfidence: researchData.dataConfidence,
              sourcesCount: researchData.sources?.length || 0,
              recommendation: intelligence.recommendation,
              forceRefresh,
            },
          },
        });

        return {
          suburb: researchData,
          intelligence,
          councilArea: getCouncilArea(name),
          isHighFloodRisk: isHighFloodRiskSuburb(name),
        };
      } catch (error) {
        console.error('Error researching suburb:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to research suburb: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }),

  // Get Northern Adelaide suburbs overview - simplified
  getNorthernAdelaideOverview: protectedProcedure
    .query(async ({ ctx }) => {
      const northernSuburbs = await ctx.db.suburbProfile.findMany({
        where: {
          name: { in: Array.from(NORTHERN_ADELAIDE_SUBURBS) },
          state: 'SA',
        },
        select: {
          id: true,
          name: true,
          postcode: true,
          medianHousePrice: true,
          floodRisk: true,
          dataConfidence: true,
          lastUpdated: true,
          _count: {
            select: {
              properties: { where: { status: { not: 'ARCHIVED' } } },
            },
          },
        },
        orderBy: { name: 'asc' },
      });

      // Group by council area - simplified approach
      const byCouncil: Record<string, any[]> = {};
      
      // Initialize council groups
      Object.keys(COUNCIL_AREAS).forEach(council => {
        byCouncil[council] = [];
      });
      
      // Group suburbs by council
      northernSuburbs.forEach(suburb => {
        const council = getCouncilArea(suburb.name);
        if (council && byCouncil[council]) {
          byCouncil[council].push({
            ...suburb,
            isHighFloodRisk: isHighFloodRiskSuburb(suburb.name),
            needsResearch: !suburb.dataConfidence || suburb.dataConfidence < 70,
          });
        }
      });

      const stats = {
        totalSuburbs: Array.from(NORTHERN_ADELAIDE_SUBURBS).length,
        researched: northernSuburbs.length,
        needingResearch: northernSuburbs.filter(s => !s.dataConfidence || s.dataConfidence < 70).length,
        highFloodRisk: northernSuburbs.filter(s => isHighFloodRiskSuburb(s.name)).length,
        withProperties: northernSuburbs.filter(s => s._count.properties > 0).length,
      };

      return {
        byCouncil,
        stats,
        allSuburbs: Array.from(NORTHERN_ADELAIDE_SUBURBS),
      };
    }),
});
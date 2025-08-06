import { z } from "zod";
import { 
  createTRPCRouter, 
  protectedProcedure, 
  editorProcedure 
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

// Validation schemas
const generateAnalysisSchema = z.object({
  propertyId: z.string().cuid(),
  forceRefresh: z.boolean().default(false),
});

const updateAnalysisSchema = z.object({
  id: z.string().cuid(),
  estimatedValue: z.number().positive().optional(),
  overpricing: z.number().optional(),
  priceAssessment: z.enum(['underpriced', 'fair', 'overpriced']).optional(),
  confidence: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

const comparablesSchema = z.object({
  propertyId: z.string().cuid(),
  radius: z.number().min(0.5).max(10).default(2), // km
  timeframe: z.number().min(1).max(24).default(6), // months
  bedroomTolerance: z.number().min(0).max(2).default(1),
});

export const analysisRouter = createTRPCRouter({
  // Get analysis for a property
  getByProperty: protectedProcedure
    .input(z.object({ propertyId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const analysis = await ctx.db.analysis.findUnique({
        where: { propertyId: input.propertyId },
        include: {
          property: {
            select: {
              id: true,
              address: true,
              priceDisplay: true,
              priceMin: true,
              priceMax: true,
              bedrooms: true,
              bathrooms: true,
              suburb: true,
              suburbProfile: {
                select: {
                  medianHousePrice: true,
                  daysOnMarket: true,
                },
              },
            },
          },
        },
      });

      if (!analysis) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No analysis found for this property. Generate analysis first.',
        });
      }

      return analysis;
    }),

  // Generate new analysis for a property
  generate: editorProcedure
    .input(generateAnalysisSchema)
    .mutation(async ({ ctx, input }) => {
      const { propertyId, forceRefresh } = input;

      const property = await ctx.db.property.findUnique({
        where: { id: propertyId },
        include: {
          suburbProfile: true,
          analysis: true,
        },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      // Check if analysis exists and is recent
      if (property.analysis && !forceRefresh) {
        const daysSinceAnalysis = Math.floor(
          (new Date().getTime() - property.analysis.generatedAt.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysSinceAnalysis < 7) {
          return property.analysis;
        }
      }

      try {
        // TODO: Implement market analysis agent here
        // For now, create basic analysis with placeholder data
        
        const estimatedValue = calculateEstimatedValue(property);
        const listingPrice = property.priceMin || property.priceMax || 0;
        const overpricing = listingPrice > 0 
          ? ((listingPrice - estimatedValue) / estimatedValue) * 100
          : 0;
        
        const priceAssessment = 
          overpricing > 10 ? 'overpriced' as const :
          overpricing < -5 ? 'underpriced' as const : 
          'fair' as const;

        const analysisData = {
          propertyId,
          estimatedValue,
          overpricing,
          priceAssessment,
          confidence: 75, // Placeholder confidence
          comparables: [], // TODO: Find actual comparables
          rentalYield: calculateRentalYield(property),
          capitalGrowth: property.suburbProfile?.growthRate || 0,
          valueScore: calculateValueScore(overpricing, property.suburbProfile),
          investmentScore: calculateInvestmentScore(property),
          locationScore: calculateLocationScore(property.suburbProfile),
          risks: identifyRisks(property),
          summary: generateSummary(property, overpricing, priceAssessment),
          generatedAt: new Date(),
        };

        // Upsert analysis (create or update)
        const analysis = await ctx.db.analysis.upsert({
          where: { propertyId },
          create: analysisData,
          update: analysisData,
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'ANALYSIS_GENERATED',
            action: `Generated market analysis for property: ${property.address}`,
            userId: ctx.session.user.id,
            propertyId,
            metadata: {
              priceAssessment,
              estimatedValue,
              overpricing: Math.round(overpricing * 100) / 100,
              confidence: analysisData.confidence,
            },
          },
        });

        return analysis;
      } catch (error) {
        console.error('Error generating analysis:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate property analysis',
        });
      }
    }),

  // Update existing analysis
  update: editorProcedure
    .input(updateAnalysisSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, notes, ...updateData } = input;

      const existingAnalysis = await ctx.db.analysis.findUnique({
        where: { id },
        include: {
          property: {
            select: { address: true },
          },
        },
      });

      if (!existingAnalysis) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Analysis not found',
        });
      }

      try {
        const updatedAnalysis = await ctx.db.analysis.update({
          where: { id },
          data: {
            ...updateData,
            updatedAt: new Date(),
          },
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'ANALYSIS_UPDATED',
            action: `Updated analysis for property: ${existingAnalysis.property.address}`,
            userId: ctx.session.user.id,
            propertyId: existingAnalysis.propertyId,
            metadata: {
              changedFields: Object.keys(updateData),
              notes,
            },
          },
        });

        return updatedAnalysis;
      } catch (error) {
        console.error('Error updating analysis:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update analysis',
        });
      }
    }),

  // Find comparable properties
  findComparables: protectedProcedure
    .input(comparablesSchema)
    .query(async ({ ctx, input }) => {
      const { propertyId, radius, timeframe, bedroomTolerance } = input;

      const targetProperty = await ctx.db.property.findUnique({
        where: { id: propertyId },
        select: {
          bedrooms: true,
          bathrooms: true,
          suburb: true,
          suburbProfile: {
            select: {
              latitude: true,
              longitude: true,
            },
          },
        },
      });

      if (!targetProperty) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      // Find similar properties
      const timeframeDate = new Date();
      timeframeDate.setMonth(timeframeDate.getMonth() - timeframe);

      const comparables = await ctx.db.property.findMany({
        where: {
          id: { not: propertyId },
          bedrooms: {
            gte: targetProperty.bedrooms - bedroomTolerance,
            lte: targetProperty.bedrooms + bedroomTolerance,
          },
          bathrooms: {
            gte: Math.max(1, targetProperty.bathrooms - 1),
          },
          // TODO: Add geographic distance filter
          suburb: targetProperty.suburb, // Temporary: same suburb
          status: { in: ['PURCHASED', 'REJECTED'] },
          updatedAt: { gte: timeframeDate },
          priceMin: { gt: 0 },
        },
        select: {
          id: true,
          address: true,
          suburb: true,
          priceDisplay: true,
          priceMin: true,
          priceMax: true,
          bedrooms: true,
          bathrooms: true,
          landSize: true,
          status: true,
          updatedAt: true,
          analysis: {
            select: {
              estimatedValue: true,
              confidence: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 20,
      });

      return {
        target: targetProperty,
        comparables,
        searchCriteria: {
          radius,
          timeframe,
          bedroomTolerance,
          found: comparables.length,
        },
      };
    }),

  // Get market summary for a suburb
  getMarketSummary: protectedProcedure
    .input(z.object({
      suburbName: z.string(),
      state: z.string().default('SA'),
    }))
    .query(async ({ ctx, input }) => {
      const { suburbName, state } = input;

      // Get suburb profile
      const suburb = await ctx.db.suburbProfile.findFirst({
        where: {
          name: { equals: suburbName, mode: 'insensitive' },
          state,
        },
      });

      if (!suburb) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Suburb not found',
        });
      }

      // Get property statistics for this suburb
      const [
        totalProperties,
        averageAnalysis,
        recentActivity,
        priceDistribution,
      ] = await Promise.all([
        ctx.db.property.count({
          where: { 
            suburb: suburbName,
            status: { not: 'ARCHIVED' },
          },
        }),
        ctx.db.analysis.aggregate({
          where: {
            property: {
              suburb: suburbName,
            },
          },
          _avg: {
            estimatedValue: true,
            overpricing: true,
            confidence: true,
            valueScore: true,
          },
        }),
        ctx.db.property.count({
          where: {
            suburb: suburbName,
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        }),
        ctx.db.property.findMany({
          where: {
            suburb: suburbName,
            status: { not: 'ARCHIVED' },
            priceMin: { gt: 0 },
          },
          select: {
            priceMin: true,
            priceMax: true,
            bedrooms: true,
          },
        }),
      ]);

      return {
        suburb,
        statistics: {
          totalProperties,
          recentActivity,
          averageEstimatedValue: averageAnalysis._avg.estimatedValue,
          averageOverpricing: averageAnalysis._avg.overpricing,
          averageConfidence: averageAnalysis._avg.confidence,
          averageValueScore: averageAnalysis._avg.valueScore,
        },
        priceRanges: calculatePriceRanges(priceDistribution),
      };
    }),

  // Get analysis trends
  getTrends: protectedProcedure
    .input(z.object({
      timeframe: z.number().min(1).max(12).default(3), // months
    }))
    .query(async ({ ctx, input }) => {
      const { timeframe } = input;
      
      const timeframeDate = new Date();
      timeframeDate.setMonth(timeframeDate.getMonth() - timeframe);

      const analyses = await ctx.db.analysis.findMany({
        where: {
          generatedAt: { gte: timeframeDate },
          property: {
            status: { not: 'ARCHIVED' },
          },
        },
        select: {
          generatedAt: true,
          priceAssessment: true,
          overpricing: true,
          confidence: true,
          property: {
            select: {
              suburb: true,
            },
          },
        },
        orderBy: { generatedAt: 'asc' },
      });

      return {
        totalAnalyses: analyses.length,
        trends: calculateTrends(analyses),
        timeframe,
      };
    }),

});

// Helper functions (would be moved to separate service in real implementation)
const calculateEstimatedValue = (property: any) => {
    // Basic estimation logic
    const basePrice = property.suburbProfile?.medianHousePrice || 600000;
    const bedroomMultiplier = Math.max(0.8, Math.min(1.4, property.bedrooms / 3));
    const bathroomMultiplier = Math.max(0.9, Math.min(1.2, property.bathrooms / 2));
    
    return Math.round(basePrice * bedroomMultiplier * bathroomMultiplier);
};

const calculateRentalYield = (property: any) => {
  // Estimated rental yield based on suburb data
  return property.suburbProfile?.rentalYield || 4.2;
};

const calculateValueScore = (overpricing: number, suburbProfile: any) => {
    let score = 50; // Base score
    
    // Price factor
    if (overpricing < -10) score += 30;
    else if (overpricing < -5) score += 20;
    else if (overpricing < 0) score += 10;
    else if (overpricing > 20) score -= 30;
    else if (overpricing > 10) score -= 20;
    else if (overpricing > 5) score -= 10;
    
    // Location factors
    if (suburbProfile?.growthRate > 5) score += 10;
    if (suburbProfile?.floodRisk === 'LOW') score += 5;
    if (suburbProfile?.floodRisk === 'HIGH') score -= 15;
    
    return Math.max(0, Math.min(100, score));
};

const calculateInvestmentScore = (property: any) => {
    // Basic investment scoring
    let score = 50;
    
    // Add factors like growth potential, rental yield, etc.
    if (property.suburbProfile?.growthRate > 5) score += 20;
    if (property.suburbProfile?.rentalYield > 4.5) score += 15;
    if (property.suburbProfile?.daysOnMarket < 30) score += 10;
    
    return Math.max(0, Math.min(100, score));
};

const calculateLocationScore = (suburbProfile: any) => {
    let score = 50;
    
    if (suburbProfile?.floodRisk === 'LOW') score += 20;
    if (suburbProfile?.floodRisk === 'HIGH') score -= 30;
    
    // Add other location factors
    
    return Math.max(0, Math.min(100, score));
};

const identifyRisks = (property: any) => {
    const risks = [];
    
    if (property.suburbProfile?.floodRisk === 'HIGH') {
      risks.push({
        type: 'flood',
        severity: 'high',
        description: 'Property located in high flood risk area',
      });
    }
    
    if (property.priceMin && property.suburbProfile?.medianHousePrice) {
      const overpricing = ((property.priceMin - property.suburbProfile.medianHousePrice) / property.suburbProfile.medianHousePrice) * 100;
      if (overpricing > 20) {
        risks.push({
          type: 'overpricing',
          severity: 'medium',
          description: `Property priced ${Math.round(overpricing)}% above suburb median`,
        });
      }
    }
    
    return risks;
};

const generateSummary = (property: any, overpricing: number, priceAssessment: string) => {
    const address = property.address;
    const suburb = property.suburb;
    
    if (priceAssessment === 'overpriced') {
      return `${address} in ${suburb} appears to be overpriced by approximately ${Math.round(overpricing)}%. Consider negotiating or looking at comparable properties in the area.`;
    } else if (priceAssessment === 'underpriced') {
      return `${address} in ${suburb} appears to offer good value, potentially underpriced by ${Math.abs(Math.round(overpricing))}%. This could be a good opportunity.`;
    } else {
      return `${address} in ${suburb} appears to be fairly priced based on current market conditions and comparable properties.`;
    }
};

const calculatePriceRanges = (properties: any[]) => {
    // Calculate price distribution
    const prices = properties.map(p => p.priceMin || p.priceMax || 0).filter(p => p > 0);
    
    if (prices.length === 0) return {};
    
    prices.sort((a, b) => a - b);
    
    return {
      min: prices[0],
      max: prices[prices.length - 1],
      median: prices[Math.floor(prices.length / 2)],
      average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      count: prices.length,
    };
};

const calculateTrends = (analyses: any[]) => {
    // Calculate trend data
    const byMonth = analyses.reduce((acc, analysis) => {
      const month = analysis.generatedAt.getMonth();
      if (!acc[month]) acc[month] = [];
      acc[month].push(analysis);
      return acc;
    }, {});
    
    return Object.entries(byMonth).map(([month, data]) => ({
      month: parseInt(month),
      count: (data as any[]).length,
      averageOverpricing: (data as any[]).reduce((sum, a) => sum + (a.overpricing || 0), 0) / (data as any[]).length,
      priceAssessments: (data as any[]).reduce((acc, a) => {
        acc[a.priceAssessment] = (acc[a.priceAssessment] || 0) + 1;
        return acc;
      }, {}),
    }));
};
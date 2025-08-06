/**
 * Data Quality Assurance for Suburb Intelligence
 * 
 * This module provides validation, quality checks, and confidence scoring
 * for suburb research data to ensure reliability and accuracy.
 * 
 * Author: Claude Code
 * Created: 2025-08-06
 */

import { z } from 'zod';
import type { 
  ComprehensiveSuburbData, 
  Demographics, 
  DataSource 
} from './suburb-intelligence';

// Define missing types locally until they're properly exported
type CrimeStats = any;
type Transport = any; 
type Amenities = any;
type MarketData = any;

// =============================================================================
// QUALITY CHECK TYPES
// =============================================================================

export const QualityCheckSchema = z.object({
  field: z.string(),
  check: z.string(),
  passed: z.boolean(),
  severity: z.enum(['info', 'warning', 'error']),
  message: z.string(),
  suggestion: z.string().optional(),
});

export const QualityReportSchema = z.object({
  overallScore: z.number().min(0).max(100),
  dataCompleteness: z.number().min(0).max(100),
  dataReliability: z.number().min(0).max(100),
  dataFreshness: z.number().min(0).max(100),
  checks: z.array(QualityCheckSchema),
  recommendations: z.array(z.string()),
  warnings: z.array(z.string()),
  errors: z.array(z.string()),
});

export type QualityCheck = z.infer<typeof QualityCheckSchema>;
export type QualityReport = z.infer<typeof QualityReportSchema>;

// =============================================================================
// DATA VALIDATION RULES
// =============================================================================

interface ValidationRule {
  field: string;
  check: string;
  validator: (data: any) => boolean;
  severity: 'info' | 'warning' | 'error';
  message: string;
  suggestion?: string;
}

const DEMOGRAPHIC_RULES: ValidationRule[] = [
  {
    field: 'demographics.population',
    check: 'population_range',
    validator: (data) => !data.demographics?.population || (data.demographics.population > 100 && data.demographics.population < 100000),
    severity: 'warning',
    message: 'Population seems unusually high or low for a suburb',
    suggestion: 'Verify population data source and check if it includes surrounding areas',
  },
  {
    field: 'demographics.medianAge',
    check: 'median_age_range',
    validator: (data) => !data.demographics?.medianAge || (data.demographics.medianAge >= 20 && data.demographics.medianAge <= 80),
    severity: 'warning',
    message: 'Median age is outside normal range (20-80 years)',
    suggestion: 'Check if median age calculation is correct',
  },
  {
    field: 'demographics.medianIncome',
    check: 'income_range',
    validator: (data) => !data.demographics?.medianIncome || (data.demographics.medianIncome >= 20000 && data.demographics.medianIncome <= 200000),
    severity: 'warning',
    message: 'Median income seems unusually high or low',
    suggestion: 'Verify income data is in AUD and represents household income',
  },
  {
    field: 'demographics.employmentRate',
    check: 'employment_rate_range',
    validator: (data) => !data.demographics?.employmentRate || (data.demographics.employmentRate >= 0 && data.demographics.employmentRate <= 1),
    severity: 'error',
    message: 'Employment rate must be between 0 and 1 (0% to 100%)',
    suggestion: 'Convert employment rate to decimal format (e.g., 0.75 for 75%)',
  },
];

const CRIME_RULES: ValidationRule[] = [
  {
    field: 'crimeStats.totalOffences',
    check: 'crime_rate_reasonableness',
    validator: (data) => !data.crimeStats?.totalOffences || (data.crimeStats.totalOffences >= 0 && data.crimeStats.totalOffences <= 50000),
    severity: 'warning',
    message: 'Total offences rate seems unusually high',
    suggestion: 'Verify crime statistics are per 100,000 population and check data source',
  },
  {
    field: 'crimeStats.confidence',
    check: 'crime_confidence_exists',
    validator: (data) => data.crimeStats?.confidence != null,
    severity: 'info',
    message: 'Crime data confidence score is missing',
    suggestion: 'Add confidence scoring based on data source reliability',
  },
  {
    field: 'crimeStats.threeYearTrend',
    check: 'trend_validity',
    validator: (data) => !data.crimeStats?.threeYearTrend || ['improving', 'stable', 'declining'].includes(data.crimeStats.threeYearTrend),
    severity: 'error',
    message: 'Crime trend must be one of: improving, stable, declining',
  },
];

const MARKET_RULES: ValidationRule[] = [
  {
    field: 'marketData.medianHousePrice',
    check: 'house_price_reasonableness',
    validator: (data) => !data.marketData?.medianHousePrice || (data.marketData.medianHousePrice >= 100000 && data.marketData.medianHousePrice <= 2000000),
    severity: 'warning',
    message: 'Median house price seems unusually high or low for South Australia',
    suggestion: 'Verify price data is current and in AUD',
  },
  {
    field: 'marketData.rentalYield',
    check: 'rental_yield_range',
    validator: (data) => !data.marketData?.rentalYield?.house || (data.marketData.rentalYield.house >= 1 && data.marketData.rentalYield.house <= 15),
    severity: 'warning',
    message: 'Rental yield is outside typical range (1-15%)',
    suggestion: 'Check rental yield calculation and ensure it represents annual gross yield',
  },
  {
    field: 'marketData.daysOnMarket',
    check: 'days_on_market_range',
    validator: (data) => !data.marketData?.daysOnMarket || (data.marketData.daysOnMarket >= 7 && data.marketData.daysOnMarket <= 365),
    severity: 'warning',
    message: 'Days on market seems unusual (should be 7-365 days)',
    suggestion: 'Verify this represents average time from listing to sale',
  },
];

const TRANSPORT_RULES: ValidationRule[] = [
  {
    field: 'transport.commuteTime.adelaideCBD',
    check: 'cbd_commute_time',
    validator: (data) => !data.transport?.commuteTime?.adelaideCBD || (data.transport.commuteTime.adelaideCBD >= 5 && data.transport.commuteTime.adelaideCBD <= 120),
    severity: 'warning',
    message: 'Commute time to Adelaide CBD seems unusual',
    suggestion: 'Verify commute time is realistic for the suburb location',
  },
  {
    field: 'transport.walkabilityScore',
    check: 'walkability_range',
    validator: (data) => !data.transport?.walkabilityScore || (data.transport.walkabilityScore >= 0 && data.transport.walkabilityScore <= 100),
    severity: 'error',
    message: 'Walkability score must be between 0 and 100',
  },
];

const SOURCE_RULES: ValidationRule[] = [
  {
    field: 'sources',
    check: 'has_sources',
    validator: (data) => data.sources && Array.isArray(data.sources) && data.sources.length > 0,
    severity: 'error',
    message: 'No data sources provided',
    suggestion: 'All data must be properly cited with source URLs',
  },
  {
    field: 'sources',
    check: 'source_urls',
    validator: (data) => !data.sources || data.sources.every((source: DataSource) => source.url && source.url.startsWith('http')),
    severity: 'error',
    message: 'All sources must have valid HTTP/HTTPS URLs',
    suggestion: 'Ensure each data source includes a valid URL for verification',
  },
  {
    field: 'sources',
    check: 'source_diversity',
    validator: (data) => {
      if (!data.sources || data.sources.length < 2) return false;
      const domains = new Set(data.sources.map((s: DataSource) => {
        try { return new URL(s.url).hostname; } catch { return s.url; }
      }));
      return domains.size >= 2;
    },
    severity: 'warning',
    message: 'Data relies on too few sources',
    suggestion: 'Use multiple independent sources to increase reliability',
  },
];

const FRESHNESS_RULES: ValidationRule[] = [
  {
    field: 'lastUpdated',
    check: 'data_freshness',
    validator: (data) => {
      const daysSinceUpdate = (Date.now() - new Date(data.lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate <= 30;
    },
    severity: 'warning',
    message: 'Data is more than 30 days old',
    suggestion: 'Consider refreshing suburb data to ensure current information',
  },
];

// =============================================================================
// QUALITY ASSESSMENT FUNCTIONS
// =============================================================================

/**
 * Perform comprehensive quality assessment on suburb data
 */
export function assessDataQuality(data: ComprehensiveSuburbData): QualityReport {
  const checks: QualityCheck[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];
  const recommendations: string[] = [];

  // Run all validation rules
  const allRules = [
    ...DEMOGRAPHIC_RULES,
    ...CRIME_RULES,
    ...MARKET_RULES,
    ...TRANSPORT_RULES,
    ...SOURCE_RULES,
    ...FRESHNESS_RULES,
  ];

  for (const rule of allRules) {
    try {
      const passed = rule.validator(data);
      
      const check: QualityCheck = {
        field: rule.field,
        check: rule.check,
        passed,
        severity: rule.severity,
        message: rule.message,
        suggestion: rule.suggestion,
      };
      
      checks.push(check);
      
      if (!passed) {
        switch (rule.severity) {
          case 'error':
            errors.push(`${rule.field}: ${rule.message}`);
            if (rule.suggestion) recommendations.push(rule.suggestion);
            break;
          case 'warning':
            warnings.push(`${rule.field}: ${rule.message}`);
            if (rule.suggestion) recommendations.push(rule.suggestion);
            break;
          case 'info':
            if (rule.suggestion) recommendations.push(rule.suggestion);
            break;
        }
      }
    } catch (error) {
      console.warn(`Quality check failed for ${rule.field}:`, error);
      checks.push({
        field: rule.field,
        check: rule.check,
        passed: false,
        severity: 'error',
        message: `Quality check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  // Calculate component scores
  const dataCompleteness = calculateCompleteness(data);
  const dataReliability = calculateReliability(data);
  const dataFreshness = calculateFreshness(data);

  // Calculate overall score
  const passedChecks = checks.filter(c => c.passed).length;
  const totalChecks = checks.length;
  const checkScore = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;
  
  const overallScore = Math.round(
    (checkScore * 0.4) +
    (dataCompleteness * 0.3) +
    (dataReliability * 0.2) +
    (dataFreshness * 0.1)
  );

  return {
    overallScore,
    dataCompleteness,
    dataReliability,
    dataFreshness,
    checks,
    recommendations: Array.from(new Set(recommendations)), // Remove duplicates
    warnings: Array.from(new Set(warnings)),
    errors: Array.from(new Set(errors)),
  };
}

/**
 * Calculate data completeness score (0-100)
 */
function calculateCompleteness(data: ComprehensiveSuburbData): number {
  const fields = [
    // Basic info (required)
    { field: 'name', weight: 10, value: !!data.name },
    { field: 'postcode', weight: 5, value: !!data.postcode },
    
    // Demographics
    { field: 'demographics', weight: 15, value: !!data.demographics && Object.keys(data.demographics).length > 0 },
    { field: 'demographics.population', weight: 5, value: !!data.demographics?.population },
    { field: 'demographics.medianAge', weight: 3, value: !!data.demographics?.medianAge },
    { field: 'demographics.medianIncome', weight: 5, value: !!data.demographics?.medianIncome },
    
    // Schools
    { field: 'schools', weight: 10, value: !!data.schools && data.schools.length > 0 },
    
    // Crime
    { field: 'crimeStats', weight: 10, value: !!data.crimeStats && Object.keys(data.crimeStats).length > 0 },
    
    // Transport
    { field: 'transport', weight: 8, value: !!data.transport && Object.keys(data.transport).length > 0 },
    { field: 'transport.commuteTime', weight: 5, value: !!data.transport?.commuteTime },
    
    // Amenities
    { field: 'amenities', weight: 8, value: !!data.amenities && Object.keys(data.amenities).length > 0 },
    
    // Market data
    { field: 'marketData', weight: 12, value: !!data.marketData && Object.keys(data.marketData).length > 0 },
    { field: 'marketData.medianHousePrice', weight: 5, value: !!data.marketData?.medianHousePrice },
    
    // Risk assessment
    { field: 'riskAssessment', weight: 10, value: !!data.riskAssessment && Object.keys(data.riskAssessment).length > 0 },
    
    // Scores
    { field: 'scores', weight: 5, value: !!data.scores && Object.keys(data.scores).length > 0 },
    
    // Sources (critical)
    { field: 'sources', weight: 15, value: !!data.sources && data.sources.length > 0 },
  ];

  const totalWeight = fields.reduce((sum, field) => sum + field.weight, 0);
  const achievedWeight = fields.reduce((sum, field) => sum + (field.value ? field.weight : 0), 0);

  return Math.round((achievedWeight / totalWeight) * 100);
}

/**
 * Calculate data reliability score based on sources (0-100)
 */
function calculateReliability(data: ComprehensiveSuburbData): number {
  if (!data.sources || data.sources.length === 0) return 0;

  let totalReliabilityScore = 0;
  const reliabilityWeights = { high: 100, medium: 70, low: 40 };

  for (const source of data.sources) {
    const reliability = source.reliability || 'medium';
    totalReliabilityScore += reliabilityWeights[reliability];
  }

  const averageReliability = totalReliabilityScore / data.sources.length;

  // Bonus for having multiple sources
  const sourceBonus = Math.min(20, (data.sources.length - 1) * 5);

  // Bonus for source diversity (different domains)
  const domains = new Set(data.sources.map(s => {
    try { return new URL(s.url).hostname; } catch { return s.url; }
  }));
  const diversityBonus = Math.min(15, (domains.size - 1) * 3);

  return Math.min(100, Math.round(averageReliability + sourceBonus + diversityBonus));
}

/**
 * Calculate data freshness score (0-100)
 */
function calculateFreshness(data: ComprehensiveSuburbData): number {
  const now = new Date();
  const lastUpdated = new Date(data.lastUpdated);
  const daysSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceUpdate <= 1) return 100;      // 100% if updated today
  if (daysSinceUpdate <= 7) return 90;       // 90% if updated this week
  if (daysSinceUpdate <= 30) return 70;      // 70% if updated this month
  if (daysSinceUpdate <= 90) return 40;      // 40% if updated this quarter
  if (daysSinceUpdate <= 180) return 20;     // 20% if updated in last 6 months
  
  return 10; // 10% if older than 6 months
}

/**
 * Validate specific data types with custom rules
 */
export function validateDemographics(demographics: Demographics): QualityCheck[] {
  const checks: QualityCheck[] = [];
  
  // Population consistency check
  if (demographics.population && demographics.population > 0) {
    const ageTotal = (demographics.ageDistribution?.under18 || 0) +
                     (demographics.ageDistribution?.age18to34 || 0) +
                     (demographics.ageDistribution?.age35to54 || 0) +
                     (demographics.ageDistribution?.age55to64 || 0) +
                     (demographics.ageDistribution?.over65 || 0);
    
    if (ageTotal > 0) {
      const difference = Math.abs(demographics.population - ageTotal);
      const percentDifference = (difference / demographics.population) * 100;
      
      checks.push({
        field: 'demographics.ageDistribution',
        check: 'age_distribution_consistency',
        passed: percentDifference <= 10,
        severity: percentDifference > 20 ? 'error' : 'warning',
        message: `Age distribution total (${ageTotal}) doesn't match population (${demographics.population})`,
        suggestion: 'Verify age distribution data adds up to total population',
      });
    }
  }
  
  return checks;
}

/**
 * Cross-reference data for consistency
 */
export function crossReferenceData(data: ComprehensiveSuburbData): QualityCheck[] {
  const checks: QualityCheck[] = [];
  
  // Check if price growth matches market cycle
  if (data.marketData?.priceGrowth?.fiveYear && data.marketData?.marketCycle) {
    const growth = data.marketData.priceGrowth.fiveYear;
    const cycle = data.marketData.marketCycle;
    
    let expectedGrowth = false;
    if (cycle === 'rising' && growth > 5) expectedGrowth = true;
    if (cycle === 'peak' && growth >= -2 && growth <= 8) expectedGrowth = true;
    if (cycle === 'declining' && growth < 5) expectedGrowth = true;
    if (cycle === 'bottom' && growth <= 5) expectedGrowth = true;
    
    checks.push({
      field: 'marketData',
      check: 'price_growth_cycle_consistency',
      passed: expectedGrowth,
      severity: 'warning',
      message: `Price growth (${growth}%) seems inconsistent with market cycle (${cycle})`,
      suggestion: 'Verify market cycle classification matches price growth data',
    });
  }
  
  // Check if commute time matches distance
  if (data.transport?.commuteTime?.adelaideCBD && data.latitude && data.longitude) {
    const commuteTime = data.transport.commuteTime.adelaideCBD;
    // This would require calculating actual distance - simplified for now
    const expectedTimeRange = { min: 20, max: 90 }; // Rough estimate for Northern Adelaide
    
    checks.push({
      field: 'transport.commuteTime',
      check: 'commute_time_reasonableness',
      passed: commuteTime >= expectedTimeRange.min && commuteTime <= expectedTimeRange.max,
      severity: 'info',
      message: `Commute time (${commuteTime} min) may be outside expected range for Northern Adelaide`,
      suggestion: 'Verify commute time calculation includes realistic traffic conditions',
    });
  }
  
  return checks;
}

/**
 * Get quality improvement suggestions based on data gaps
 */
export function getImprovementSuggestions(data: ComprehensiveSuburbData): string[] {
  const suggestions: string[] = [];
  
  // Check for missing critical data
  if (!data.demographics || Object.keys(data.demographics).length === 0) {
    suggestions.push('Add demographic data from ABS Census to improve family-friendliness assessment');
  }
  
  if (!data.schools || data.schools.length === 0) {
    suggestions.push('Include school information to better assess education quality and catchment zones');
  }
  
  if (!data.crimeStats || Object.keys(data.crimeStats).length === 0) {
    suggestions.push('Add crime statistics from SA Police to improve safety assessment');
  }
  
  if (!data.marketData?.medianHousePrice) {
    suggestions.push('Include median house price data for investment potential analysis');
  }
  
  if (!data.riskAssessment?.floodRisk) {
    suggestions.push('Critical: Add flood risk assessment as this is a deal-breaker for your family');
  }
  
  if (!data.transport?.commuteTime?.adelaideCBD) {
    suggestions.push('Add commute time to Adelaide CBD for work accessibility assessment');
  }
  
  // Check source diversity
  if (data.sources && data.sources.length < 3) {
    suggestions.push('Use more diverse data sources to increase reliability and reduce bias');
  }
  
  // Check data freshness
  const daysSinceUpdate = (Date.now() - new Date(data.lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate > 30) {
    suggestions.push('Update data to ensure current market conditions and statistics');
  }
  
  return suggestions;
}

// =============================================================================
// CONFIDENCE SCORING
// =============================================================================

/**
 * Calculate overall data confidence score (0-100)
 */
export function calculateConfidenceScore(data: ComprehensiveSuburbData, qualityReport?: QualityReport): number {
  const report = qualityReport || assessDataQuality(data);
  
  // Base confidence from quality assessment
  let confidence = report.overallScore;
  
  // Adjust for critical errors
  const criticalErrors = report.errors.length;
  confidence -= criticalErrors * 15; // -15 points per error
  
  // Adjust for warnings
  const warnings = report.warnings.length;
  confidence -= warnings * 5; // -5 points per warning
  
  // Bonus for high source reliability
  if (report.dataReliability > 80) confidence += 5;
  
  // Bonus for data freshness
  if (report.dataFreshness > 80) confidence += 5;
  
  // Ensure confidence is within bounds
  return Math.max(0, Math.min(100, Math.round(confidence)));
}

/**
 * Get confidence level description
 */
export function getConfidenceDescription(score: number): {
  level: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  description: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
} {
  if (score >= 90) return {
    level: 'very_high',
    description: 'Very high confidence - data is comprehensive, recent, and from reliable sources',
    color: 'blue',
  };
  
  if (score >= 75) return {
    level: 'high',
    description: 'High confidence - good data quality with minor gaps or warnings',
    color: 'green',
  };
  
  if (score >= 60) return {
    level: 'medium',
    description: 'Medium confidence - acceptable data quality but some important information missing',
    color: 'yellow',
  };
  
  if (score >= 40) return {
    level: 'low',
    description: 'Low confidence - significant data gaps or quality issues',
    color: 'orange',
  };
  
  return {
    level: 'very_low',
    description: 'Very low confidence - major data quality issues or insufficient information',
    color: 'red',
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  assessDataQuality,
  validateDemographics,
  crossReferenceData,
  getImprovementSuggestions,
  calculateConfidenceScore,
  getConfidenceDescription,
};
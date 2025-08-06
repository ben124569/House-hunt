/**
 * Usage Examples for Suburb Intelligence System
 * 
 * This file demonstrates how to use the suburb intelligence system
 * for property research in Northern Adelaide.
 * 
 * Author: Claude Code
 * Created: 2025-08-06
 */

import { 
  researchSuburb,
  generateIntelligenceSummary,
  batchResearchSuburbs,
  getCouncilArea,
  isHighFloodRiskSuburb,
  NORTHERN_ADELAIDE_SUBURBS,
  HIGH_FLOOD_RISK_SUBURBS,
} from '../suburb-intelligence';
import { assessDataQuality, calculateConfidenceScore } from '../data-quality';
import { geocodeSuburb, calculateKeyDistances, findNearbySuburbs } from '../data-collectors/geocoding';

// =============================================================================
// EXAMPLE 1: RESEARCH A SINGLE SUBURB
// =============================================================================

/**
 * Example: Research a suburb comprehensively
 */
export async function exampleResearchSingleSuburb() {
  console.log('🔍 Example 1: Researching Angle Vale for property investment...\n');
  
  try {
    // Research the suburb
    const suburbData = await researchSuburb('Angle Vale', '5117', false);
    
    // Generate intelligence summary
    const intelligence = generateIntelligenceSummary(suburbData);
    
    // Assess data quality
    const qualityReport = assessDataQuality(suburbData);
    
    // Get location info
    const councilArea = getCouncilArea(suburbData.name);
    const isFloodRisk = isHighFloodRiskSuburb(suburbData.name);
    
    console.log(`📍 Suburb: ${suburbData.name}, ${suburbData.postcode}`);
    console.log(`🏛️  Council: ${councilArea}`);
    console.log(`💧 Flood Risk: ${isFloodRisk ? 'HIGH RISK ⚠️' : 'Low Risk ✅'}`);
    console.log(`📊 Data Confidence: ${suburbData.dataConfidence}%`);
    console.log(`🎯 Recommendation: ${intelligence.recommendation.toUpperCase()}`);
    console.log(`💭 Reasoning: ${intelligence.reasoning}\n`);
    
    console.log('🎯 Key Strengths:');
    intelligence.strengths.forEach(strength => console.log(`  ✅ ${strength}`));
    
    console.log('\n⚠️  Key Concerns:');
    intelligence.concerns.forEach(concern => console.log(`  ❌ ${concern}`));
    
    console.log('\n📈 Composite Scores:');
    if (suburbData.scores) {
      console.log(`  🏠 Overall Livability: ${suburbData.scores.livability || 'N/A'}/100`);
      console.log(`  👨‍👩‍👧‍👦 Family Friendliness: ${suburbData.scores.familyFriendliness || 'N/A'}/100`);
      console.log(`  💰 Investment Potential: ${suburbData.scores.investmentPotential || 'N/A'}/100`);
      console.log(`  🛡️  Safety: ${suburbData.scores.safety || 'N/A'}/100`);
      console.log(`  🚌 Transport Access: ${suburbData.scores.transportAccess || 'N/A'}/100`);
      console.log(`  🏪 Amenity Access: ${suburbData.scores.amenityAccess || 'N/A'}/100`);
    }
    
    console.log('\n📋 Quality Assessment:');
    console.log(`  Overall Score: ${qualityReport.overallScore}/100`);
    console.log(`  Data Completeness: ${qualityReport.dataCompleteness}/100`);
    console.log(`  Data Reliability: ${qualityReport.dataReliability}/100`);
    console.log(`  Data Freshness: ${qualityReport.dataFreshness}/100`);
    
    if (qualityReport.warnings.length > 0) {
      console.log('\n⚠️  Data Quality Warnings:');
      qualityReport.warnings.slice(0, 3).forEach(warning => console.log(`  • ${warning}`));
    }
    
    console.log(`\n📚 Data Sources: ${suburbData.sources?.length || 0} sources`);
    suburbData.sources?.slice(0, 3).forEach(source => {
      console.log(`  • ${source.name} (${source.reliability} reliability)`);
    });
    
    return { suburbData, intelligence, qualityReport };
    
  } catch (error) {
    console.error('❌ Research failed:', error);
    throw error;
  }
}

// =============================================================================
// EXAMPLE 2: BATCH RESEARCH MULTIPLE SUBURBS
// =============================================================================

/**
 * Example: Compare multiple suburbs for family home purchase
 */
export async function exampleBatchResearch() {
  console.log('🔍 Example 2: Comparing suburbs for family home under $900k...\n');
  
  const targetSuburbs = [
    { name: 'Angle Vale', postcode: '5117' },
    { name: 'Smithfield Plains', postcode: '5114' },
    { name: 'Andrews Farm', postcode: '5114' },
    { name: 'Gawler East', postcode: '5118' },
    { name: 'Para Hills', postcode: '5096' },
  ];
  
  try {
    // Batch research
    const results = await batchResearchSuburbs(targetSuburbs, false);
    
    console.log(`📊 Researched ${results.length}/${targetSuburbs.length} suburbs successfully\n`);
    
    // Generate comparison table
    console.log('📋 SUBURB COMPARISON TABLE');
    console.log('=' .repeat(120));
    console.log('Suburb'.padEnd(18) + 
                'Council'.padEnd(12) + 
                'Flood'.padEnd(8) + 
                'Confidence'.padEnd(12) + 
                'Recommendation'.padEnd(15) + 
                'Livability'.padEnd(12) + 
                'Safety'.padEnd(8) + 
                'Family'.padEnd(8));
    console.log('-'.repeat(120));
    
    results.forEach(data => {
      const intelligence = generateIntelligenceSummary(data);
      const council = getCouncilArea(data.name)?.slice(0, 10) || 'Unknown';
      const flood = isHighFloodRiskSuburb(data.name) ? 'HIGH' : 'Low';
      const confidence = `${data.dataConfidence || 0}%`;
      const recommendation = intelligence.recommendation.slice(0, 12);
      const livability = data.scores?.livability ? `${data.scores.livability}/100` : 'N/A';
      const safety = data.scores?.safety ? `${data.scores.safety}` : 'N/A';
      const family = data.scores?.familyFriendliness ? `${data.scores.familyFriendliness}` : 'N/A';
      
      console.log(data.name.padEnd(18) + 
                  council.padEnd(12) + 
                  flood.padEnd(8) + 
                  confidence.padEnd(12) + 
                  recommendation.padEnd(15) + 
                  livability.padEnd(12) + 
                  safety.padEnd(8) + 
                  family.padEnd(8));
    });
    
    console.log('\n🎯 RECOMMENDATIONS SUMMARY:');
    const recommendations = results.map(data => generateIntelligenceSummary(data));
    const priority = recommendations.filter(r => r.recommendation === 'priority');
    const investigate = recommendations.filter(r => r.recommendation === 'investigate');
    const avoid = recommendations.filter(r => r.recommendation === 'avoid');
    
    console.log(`  🌟 Priority suburbs (${priority.length}): ${priority.map(r => results.find(d => generateIntelligenceSummary(d).recommendation === 'priority')?.name).join(', ') || 'None'}`);
    console.log(`  🔍 Worth investigating (${investigate.length}): ${investigate.map(r => results.find(d => generateIntelligenceSummary(d).recommendation === 'investigate')?.name).join(', ') || 'None'}`);
    console.log(`  ❌ Avoid (${avoid.length}): ${avoid.map(r => results.find(d => generateIntelligenceSummary(d).recommendation === 'avoid')?.name).join(', ') || 'None'}`);
    
    // Identify deal breakers
    const dealBreakers = results.filter(data => 
      isHighFloodRiskSuburb(data.name) || 
      generateIntelligenceSummary(data).recommendation === 'avoid'
    );
    
    if (dealBreakers.length > 0) {
      console.log(`\n⚠️  DEAL BREAKERS (${dealBreakers.length} suburbs):`);
      dealBreakers.forEach(data => {
        const intelligence = generateIntelligenceSummary(data);
        console.log(`  ❌ ${data.name}: ${intelligence.reasoning}`);
      });
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ Batch research failed:', error);
    throw error;
  }
}

// =============================================================================
// EXAMPLE 3: GEOGRAPHICAL ANALYSIS
// =============================================================================

/**
 * Example: Analyze suburbs by location and distance
 */
export async function exampleGeographicalAnalysis() {
  console.log('🔍 Example 3: Geographical analysis for commute-friendly suburbs...\n');
  
  const centerSuburb = 'Salisbury';
  const radiusKm = 15;
  
  try {
    // Get geocoding info
    const geocodeResult = await geocodeSuburb(centerSuburb, 'SA');
    console.log(`📍 Center: ${centerSuburb}`);
    if (geocodeResult.success && geocodeResult.coordinates) {
      console.log(`   Coordinates: ${geocodeResult.coordinates.latitude}, ${geocodeResult.coordinates.longitude}`);
    }
    
    // Find nearby suburbs
    const nearbySuburbs = findNearbySuburbs(centerSuburb, radiusKm);
    console.log(`\n🗺️  Found ${nearbySuburbs.length} suburbs within ${radiusKm}km:`);
    
    nearbySuburbs.slice(0, 10).forEach(suburb => {
      const distances = calculateKeyDistances(suburb.name);
      const council = getCouncilArea(suburb.name);
      const floodRisk = isHighFloodRiskSuburb(suburb.name) ? '⚠️' : '✅';
      
      console.log(`  • ${suburb.name.padEnd(20)} ${suburb.distance.toFixed(1)}km away, Council: ${council?.slice(0, 8)}, CBD: ${distances.adelaide_cbd?.toFixed(1)}km ${floodRisk}`);
    });
    
    // Group by council area
    const byCouncil: Record<string, typeof nearbySuburbs> = {};
    nearbySuburbs.forEach(suburb => {
      const council = getCouncilArea(suburb.name) || 'Unknown';
      if (!byCouncil[council]) byCouncil[council] = [];
      byCouncil[council].push(suburb);
    });
    
    console.log('\n🏛️  BY COUNCIL AREA:');
    Object.entries(byCouncil).forEach(([council, suburbs]) => {
      const floodRiskCount = suburbs.filter(s => isHighFloodRiskSuburb(s.name)).length;
      console.log(`  ${council}: ${suburbs.length} suburbs ${floodRiskCount > 0 ? `(${floodRiskCount} with flood risk)` : ''}`);
    });
    
    return { centerSuburb, nearbySuburbs, byCouncil };
    
  } catch (error) {
    console.error('❌ Geographical analysis failed:', error);
    throw error;
  }
}

// =============================================================================
// EXAMPLE 4: FLOOD RISK ASSESSMENT
// =============================================================================

/**
 * Example: Specifically assess flood risks (critical for this family)
 */
export async function exampleFloodRiskAssessment() {
  console.log('🔍 Example 4: Flood risk assessment for Northern Adelaide suburbs...\n');
  
  console.log(`💧 HIGH FLOOD RISK SUBURBS (${HIGH_FLOOD_RISK_SUBURBS.length} total):`);
  console.log('   These suburbs should be AVOIDED due to family requirements:\n');
  
  HIGH_FLOOD_RISK_SUBURBS.forEach(suburbName => {
    const council = getCouncilArea(suburbName);
    const distances = calculateKeyDistances(suburbName);
    const cbdDistance = distances.adelaide_cbd ? `${distances.adelaide_cbd.toFixed(1)}km to CBD` : 'Distance unknown';
    
    console.log(`  ❌ ${suburbName.padEnd(20)} (${council?.padEnd(10)}) ${cbdDistance}`);
  });
  
  // Find safe alternatives nearby flood risk areas
  console.log('\n✅ SAFER ALTERNATIVES:');
  const safeSuburbs = Array.from(NORTHERN_ADELAIDE_SUBURBS)
    .filter(suburb => !HIGH_FLOOD_RISK_SUBURBS.includes(suburb as any))
    .slice(0, 10);
    
  safeSuburbs.forEach(suburbName => {
    const council = getCouncilArea(suburbName);
    const distances = calculateKeyDistances(suburbName);
    const cbdDistance = distances.adelaide_cbd ? `${distances.adelaide_cbd.toFixed(1)}km to CBD` : 'Distance unknown';
    
    console.log(`  ✅ ${suburbName.padEnd(20)} (${council?.padEnd(10)}) ${cbdDistance}`);
  });
  
  // Council-wise flood risk summary
  console.log('\n🏛️  FLOOD RISK BY COUNCIL:');
  const councilRisks: Record<string, { total: number; highRisk: number }> = {};
  
  Array.from(NORTHERN_ADELAIDE_SUBURBS).forEach(suburb => {
    const council = getCouncilArea(suburb) || 'Unknown';
    if (!councilRisks[council]) councilRisks[council] = { total: 0, highRisk: 0 };
    
    councilRisks[council].total++;
    if (HIGH_FLOOD_RISK_SUBURBS.includes(suburb as any)) {
      councilRisks[council].highRisk++;
    }
  });
  
  Object.entries(councilRisks).forEach(([council, stats]) => {
    const percentage = ((stats.highRisk / stats.total) * 100).toFixed(0);
    const risk = stats.highRisk > 0 ? `⚠️  ${stats.highRisk}/${stats.total} (${percentage}%)` : '✅ 0 high risk areas';
    console.log(`  ${council.padEnd(15)}: ${risk}`);
  });
  
  return { highRiskSuburbs: HIGH_FLOOD_RISK_SUBURBS, safeSuburbs, councilRisks };
}

// =============================================================================
// EXAMPLE 5: INVESTMENT ANALYSIS
// =============================================================================

/**
 * Example: Analyze suburbs for investment potential
 */
export async function exampleInvestmentAnalysis() {
  console.log('🔍 Example 5: Investment analysis for Northern Adelaide suburbs...\n');
  
  // Focus on suburbs with good investment potential
  const investmentSuburbs = [
    'Mawson Lakes', 'Golden Grove', 'Gawler East', 'Salisbury North', 
    'Andrews Farm', 'Paralowie', 'Smithfield Plains'
  ];
  
  try {
    const results = await batchResearchSuburbs(
      investmentSuburbs.map(name => ({ name })), 
      false
    );
    
    console.log('💰 INVESTMENT POTENTIAL ANALYSIS\n');
    
    results.forEach(data => {
      const intelligence = generateIntelligenceSummary(data);
      const qualityReport = assessDataQuality(data);
      
      console.log(`🏘️  ${data.name.toUpperCase()}`);
      console.log(`   Recommendation: ${intelligence.recommendation.toUpperCase()}`);
      console.log(`   Investment Score: ${data.scores?.investmentPotential || 'N/A'}/100`);
      console.log(`   Data Confidence: ${data.dataConfidence || 0}%`);
      
      if (data.marketData?.medianHousePrice) {
        console.log(`   Median Price: $${data.marketData.medianHousePrice.toLocaleString()}`);
      }
      if (data.marketData?.priceGrowth?.fiveYear) {
        console.log(`   5-Year Growth: ${data.marketData.priceGrowth.fiveYear}%`);
      }
      if (data.marketData?.rentalYield?.house) {
        console.log(`   Rental Yield: ${data.marketData.rentalYield.house}%`);
      }
      if (data.marketData?.daysOnMarket) {
        console.log(`   Days on Market: ${data.marketData.daysOnMarket} days`);
      }
      
      console.log(`   Key Strengths: ${intelligence.strengths.slice(0, 2).join(', ') || 'None identified'}`);
      console.log(`   Key Concerns: ${intelligence.concerns.slice(0, 2).join(', ') || 'None identified'}`);
      console.log('');
    });
    
    // Ranking by investment potential
    const ranked = results
      .filter(data => data.scores?.investmentPotential)
      .sort((a, b) => (b.scores?.investmentPotential || 0) - (a.scores?.investmentPotential || 0));
    
    console.log('🏆 TOP INVESTMENT OPPORTUNITIES:');
    ranked.slice(0, 5).forEach((data, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
      console.log(`   ${medal} ${data.name}: ${data.scores?.investmentPotential}/100 investment score`);
    });
    
    return results;
    
  } catch (error) {
    console.error('❌ Investment analysis failed:', error);
    throw error;
  }
}

// =============================================================================
// EXAMPLE 6: RUNNING ALL EXAMPLES
// =============================================================================

/**
 * Run all examples in sequence
 */
export async function runAllExamples() {
  console.log('🎯 RUNNING ALL SUBURB INTELLIGENCE EXAMPLES');
  console.log('='.repeat(80) + '\n');
  
  try {
    // Example 1: Single suburb research
    await exampleResearchSingleSuburb();
    
    console.log('\n' + '='.repeat(80) + '\n');
    
    // Example 2: Batch comparison
    await exampleBatchResearch();
    
    console.log('\n' + '='.repeat(80) + '\n');
    
    // Example 3: Geographical analysis
    await exampleGeographicalAnalysis();
    
    console.log('\n' + '='.repeat(80) + '\n');
    
    // Example 4: Flood risk assessment
    await exampleFloodRiskAssessment();
    
    console.log('\n' + '='.repeat(80) + '\n');
    
    // Example 5: Investment analysis
    await exampleInvestmentAnalysis();
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ ALL EXAMPLES COMPLETED SUCCESSFULLY!');
    
  } catch (error) {
    console.error('❌ Example execution failed:', error);
    throw error;
  }
}

// =============================================================================
// UTILITY FUNCTIONS FOR EXAMPLES
// =============================================================================

/**
 * Helper to format numbers as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Helper to format percentages
 */
export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

/**
 * Helper to get emoji for recommendation
 */
export function getRecommendationEmoji(recommendation: string): string {
  switch (recommendation) {
    case 'priority': return '🌟';
    case 'investigate': return '🔍';
    case 'consider': return '🤔';
    case 'avoid': return '❌';
    default: return '❓';
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  exampleResearchSingleSuburb,
  exampleBatchResearch,
  exampleGeographicalAnalysis,
  exampleFloodRiskAssessment,
  exampleInvestmentAnalysis,
  runAllExamples,
  formatCurrency,
  formatPercentage,
  getRecommendationEmoji,
};
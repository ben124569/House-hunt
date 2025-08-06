/**
 * Test utility for the property extractor
 * Use this to test scraping functionality without hitting the database
 */

import { extractPropertyData, isValidPropertyUrl, getWebsiteName, PropertyExtractionError } from "./property-extractor";

// Test URLs for different sites
export const TEST_URLS = {
  REALESTATE: [
    // Add real URLs here for testing
    // "https://www.realestate.com.au/property-house-sa-angle+vale-123456789",
  ],
  DOMAIN: [
    // Add real URLs here for testing  
    // "https://www.domain.com.au/123456-smith-street-smithfield-sa-5114",
  ],
  INVALID: [
    "https://www.google.com",
    "https://www.realestate.com.au/news",
    "not-a-url",
  ],
};

/**
 * Test URL validation
 */
export function testUrlValidation(): void {
  console.log("🧪 Testing URL validation...\n");
  
  // Test valid URLs
  const allValidUrls: string[] = [...TEST_URLS.REALESTATE, ...TEST_URLS.DOMAIN];
  if (allValidUrls.length === 0) {
    console.log("⚠️ No test URLs provided. Add real property URLs to TEST_URLS for testing.");
  } else {
    allValidUrls.forEach(url => {
      if (url.startsWith("//")) return; // Skip commented URLs
      
      const isValid = isValidPropertyUrl(url);
      const website = getWebsiteName(url);
      console.log(`✅ ${url} -> Valid: ${isValid}, Website: ${website}`);
    });
  }
  
  // Test invalid URLs
  TEST_URLS.INVALID.forEach(url => {
    const isValid = isValidPropertyUrl(url);
    console.log(`❌ ${url} -> Valid: ${isValid}`);
  });
}

/**
 * Test property extraction for a single URL
 */
export async function testPropertyExtraction(url: string): Promise<void> {
  console.log(`\n🏠 Testing property extraction for: ${url}`);
  console.log("=".repeat(60));
  
  if (!isValidPropertyUrl(url)) {
    console.log("❌ Invalid URL format");
    return;
  }
  
  try {
    const startTime = Date.now();
    const property = await extractPropertyData(url);
    const duration = Date.now() - startTime;
    
    console.log(`✅ Extraction completed in ${duration}ms`);
    console.log(`📍 Address: ${property.address}`);
    console.log(`💰 Price: ${property.priceDisplay}`);
    console.log(`🏠 Type: ${property.propertyType}`);
    console.log(`🛏️ Specs: ${property.bedrooms}BR, ${property.bathrooms}BA, ${property.parking} car`);
    
    if (property.landSize) {
      console.log(`📐 Land: ${property.landSize} sqm`);
    }
    
    console.log(`📷 Images: ${property.images.length}`);
    console.log(`🏷️ Features: ${property.features.length}`);
    
    if (property.agentName) {
      console.log(`👤 Agent: ${property.agentName} (${property.agentAgency || 'Unknown agency'})`);
    }
    
    // Test deal breakers
    console.log("\n🔍 Deal Breaker Analysis:");
    const dealBreakers = [];
    if (property.hasFloodRisk === true) dealBreakers.push("Flood risk");
    if (property.hasTwoStories === true) dealBreakers.push("Two stories");
    if (property.hasCarParking === false) dealBreakers.push("No parking");
    if (property.hasSolarPanels === false) dealBreakers.push("No solar");
    if (property.isDogFriendly === false) dealBreakers.push("Not dog friendly");
    
    if (dealBreakers.length > 0) {
      console.log(`❌ Deal breakers found: ${dealBreakers.join(", ")}`);
    } else {
      console.log("✅ No obvious deal breakers detected");
    }
    
  } catch (error) {
    console.error(`❌ Extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    if (error instanceof PropertyExtractionError) {
      console.error(`   Stage: ${error.stage}`);
      console.error(`   URL: ${error.url}`);
    }
  }
}

/**
 * Run comprehensive tests
 */
export async function runTests(testUrls: string[] = []): Promise<void> {
  console.log("🧪 Property Extractor Test Suite");
  console.log("===============================\n");
  
  // Run URL validation tests first
  testUrlValidation();
  
  // Test extraction on provided URLs
  const validRealestate = (TEST_URLS.REALESTATE as string[]).filter(url => !url.startsWith("//"));
  const validDomain = (TEST_URLS.DOMAIN as string[]).filter(url => !url.startsWith("//"));
  const urlsToTest = testUrls.length > 0 ? testUrls : [...validRealestate, ...validDomain];
  
  if (urlsToTest.length === 0) {
    console.log("⚠️ No valid test URLs provided. Add URLs to TEST_URLS or pass them as arguments.");
    console.log("   Example usage:");
    console.log("   await runTests(['https://www.realestate.com.au/property-...']);");
    return;
  }

  for (const url of urlsToTest) {
    await testPropertyExtraction(url);
    
    // Add delay between requests to be respectful
    if (urlsToTest.indexOf(url) < urlsToTest.length - 1) {
      console.log("⏱️ Waiting 3 seconds before next test...");
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log("🎉 Test suite completed!");
}

/**
 * Quick test function for a single URL
 */
export async function quickTest(url: string): Promise<void> {
  await testPropertyExtraction(url);
}

// Export for CLI usage
if (require.main === module) {
  const url = process.argv[2];
  if (url) {
    quickTest(url).catch(console.error);
  } else {
    runTests().catch(console.error);
  }
}
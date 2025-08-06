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
  const allValidUrls = [...TEST_URLS.REALESTATE, ...TEST_URLS.DOMAIN];
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
  
  console.log("\n");
}

/**
 * Test property data extraction
 */
export async function testPropertyExtraction(url: string): Promise<void> {
  console.log(`🏠 Testing property extraction for: ${url}\n`);
  
  if (!isValidPropertyUrl(url)) {
    console.error("❌ Invalid URL - cannot test extraction");
    return;
  }
  
  try {
    console.log("⏳ Starting extraction...");
    const startTime = Date.now();
    
    const data = await extractPropertyData(url);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`✅ Extraction completed in ${duration}s\n`);
    
    // Display extracted data
    console.log("📊 Extracted Data:");
    console.log("==================");
    console.log(`Address: ${data.address}`);
    console.log(`Suburb: ${data.suburb}, ${data.state} ${data.postcode}`);
    console.log(`Price: ${data.priceDisplay}`);
    console.log(`Type: ${data.propertyType}`);
    console.log(`Bedrooms: ${data.bedrooms} | Bathrooms: ${data.bathrooms} | Parking: ${data.parking}`);
    console.log(`Land Size: ${data.landSize ? data.landSize + " sqm" : "Not specified"}`);
    console.log(`Features: ${data.features.length} features found`);
    console.log(`Images: ${data.images.length} images found`);
    
    if (data.agentName) {
      console.log(`Agent: ${data.agentName}${data.agentAgency ? ` (${data.agentAgency})` : ""}`);
    }
    
    // Deal breaker analysis
    console.log("\n⚠️ Deal Breaker Analysis:");
    console.log("========================");
    const dealBreakers = [];
    if (data.hasFloodRisk) dealBreakers.push("Flood risk detected");
    if (data.hasTwoStories) dealBreakers.push("Two-story property");
    if (!data.hasCarParking) dealBreakers.push("No car parking");
    if (!data.hasSolarPanels) dealBreakers.push("No solar panels");
    if (!data.isDogFriendly) dealBreakers.push("Not dog-friendly");
    if (data.isMainRoad) dealBreakers.push("Main road location");
    if (data.hasPowerLines) dealBreakers.push("Overhead power lines");
    
    if (dealBreakers.length > 0) {
      dealBreakers.forEach(issue => console.log(`❌ ${issue}`));
    } else {
      console.log("✅ No obvious deal breakers detected");
    }
    
    // Sample of description and features
    console.log("\n📝 Description Sample:");
    console.log("=====================");
    console.log(data.description.substring(0, 200) + (data.description.length > 200 ? "..." : ""));
    
    console.log("\n🏷️ Features Sample:");
    console.log("==================");
    data.features.slice(0, 10).forEach((feature, i) => {
      console.log(`${i + 1}. ${feature}`);
    });
    if (data.features.length > 10) {
      console.log(`... and ${data.features.length - 10} more features`);
    }
    
    console.log("\n");
    
  } catch (error) {
    console.error(`❌ Extraction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    
    if (error instanceof PropertyExtractionError) {
      console.error(`   Stage: ${error.stage}`);
      console.error(`   URL: ${error.url}`);
    }
    
    console.log("\n");
  }
}

/**
 * Run comprehensive tests
 */
export async function runTests(testUrls: string[] = []): Promise<void> {
  console.log("🚀 Property Extractor Test Suite");
  console.log("================================\n");
  
  // Test URL validation
  testUrlValidation();
  
  // Test extraction on provided URLs
  const urlsToTest = testUrls.length > 0 ? testUrls : [
    ...TEST_URLS.REALESTATE.filter(url => !url.startsWith("//")),
    ...TEST_URLS.DOMAIN.filter(url => !url.startsWith("//")),
  ];
  
  if (urlsToTest.length === 0) {
    console.log("⚠️ No valid test URLs provided. Add URLs to TEST_URLS or pass them as arguments.");
    console.log("   Example usage:");\n    console.log("   await runTests(['https://www.realestate.com.au/property-...']);");\n    return;\n  }\n\n  for (const url of urlsToTest) {\n    await testPropertyExtraction(url);\n    \n    // Add delay between requests to be respectful\n    if (urlsToTest.indexOf(url) < urlsToTest.length - 1) {\n      console.log("⏱️ Waiting 3 seconds before next test...");\n      await new Promise(resolve => setTimeout(resolve, 3000));\n    }\n  }\n  \n  console.log("🎉 Test suite completed!");\n}\n\n/**\n * Quick test function for a single URL\n */\nexport async function quickTest(url: string): Promise<void> {\n  await testPropertyExtraction(url);\n}\n\n// Export for CLI usage\nif (require.main === module) {\n  const url = process.argv[2];\n  if (url) {\n    quickTest(url).catch(console.error);\n  } else {\n    runTests().catch(console.error);\n  }\n}
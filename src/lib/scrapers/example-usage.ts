/**
 * Example usage of the Property Extractor
 * 
 * This demonstrates how to use the comprehensive property scraper
 * for Australian real estate websites.
 */

import { 
  extractPropertyData, 
  isValidPropertyUrl, 
  getWebsiteName, 
  PropertyExtractionError,
  extractPropertyId 
} from "./property-extractor";

// Example URLs (replace with real ones for testing)
const EXAMPLE_URLS = {
  realestate: "https://www.realestate.com.au/property-house-sa-angle+vale-140096478",
  domain: "https://www.domain.com.au/123456-smith-street-smithfield-sa-5114-2019123456",
};

/**
 * Basic property extraction example
 */
export async function basicExtractionExample(url: string) {
  console.log("🏠 Basic Property Extraction Example");
  console.log("===================================\n");
  
  // Step 1: Validate the URL
  if (!isValidPropertyUrl(url)) {
    console.error("❌ Invalid URL. Must be from realestate.com.au or domain.com.au");
    return;
  }
  
  console.log(`✅ Valid ${getWebsiteName(url)} URL`);
  console.log(`📍 Property ID: ${extractPropertyId(url)}`);
  console.log(`⏳ Starting extraction...\n`);
  
  try {
    // Step 2: Extract property data
    const property = await extractPropertyData(url);
    
    // Step 3: Display key information
    console.log("📊 Property Summary:");
    console.log("==================");
    console.log(`Address: ${property.address}`);
    console.log(`Location: ${property.suburb}, ${property.state} ${property.postcode}`);
    console.log(`Price: ${property.priceDisplay}`);
    console.log(`Type: ${property.propertyType}`);
    console.log(`Specs: ${property.bedrooms}BR, ${property.bathrooms}BA, ${property.parking} car`);
    
    if (property.landSize) {
      console.log(`Land: ${property.landSize} sqm`);
    }
    
    console.log("\n🏷️ Key Features:");
    property.features.slice(0, 5).forEach((feature, i) => {
      console.log(`  ${i + 1}. ${feature}`);
    });
    if (property.features.length > 5) {
      console.log(`  ... and ${property.features.length - 5} more`);
    }
    
    // Step 4: Check agent details
    if (property.agentName) {
      console.log("\n👤 Agent Information:");
      console.log(`Name: ${property.agentName}`);
      if (property.agentAgency) console.log(`Agency: ${property.agentAgency}`);
      if (property.agentPhone) console.log(`Phone: ${property.agentPhone}`);
    }
    
    console.log(`\n📷 Images: ${property.images.length} found`);
    
  } catch (error) {
    console.error(`❌ Extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    if (error instanceof PropertyExtractionError) {
      console.error(`   Stage: ${error.stage}`);
      console.error(`   URL: ${error.url}`);
    }
  }
}

/**
 * Main example function
 */
export async function runExamples() {
  console.log("🚀 Property Extractor Examples");
  console.log("==============================\n");
  
  // You would replace these with real URLs for testing
  const testUrls: string[] = [
    // Add real realestate.com.au URLs here
    // "https://www.realestate.com.au/property-house-sa-angle+vale-140096478",
    
    // Add real domain.com.au URLs here  
    // "https://www.domain.com.au/123456-smith-street-smithfield-sa-5114-2019123456",
  ];
  
  if (testUrls.length === 0) {
    console.log("⚠️ No test URLs provided. Update testUrls array with real property URLs to run examples.");
    console.log("\nExample URLs:");
    console.log("- https://www.realestate.com.au/property-house-sa-smithfield-123456789");
    console.log("- https://www.domain.com.au/123456-main-street-adelaide-sa-5000-2019123456");
    return;
  }
  
  const url = testUrls[0];
  if (!url) return;
  
  // Run basic example
  await basicExtractionExample(url);
  
  console.log("\n🎉 Examples completed!");
}

// CLI usage
if (require.main === module) {
  const url = process.argv[2];
  
  if (url) {
    console.log(`Running examples for: ${url}\n`);
    basicExtractionExample(url).catch(console.error);
  } else {
    runExamples().catch(console.error);
  }
}
import puppeteer from "puppeteer";
import { extractPropertyData, isValidPropertyUrl, getWebsiteName, PropertyExtractionError } from "./property-extractor";

// Legacy interface for backward compatibility
export interface ScrapedProperty {
  address: string;
  suburb: string;
  postcode: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  landSize?: number;
  description?: string;
  features: string[];
  images: string[];
  agentName?: string;
  agentPhone?: string;
  listingUrl: string;
}

/**
 * Legacy function for backward compatibility
 * Uses the new comprehensive extractor but returns data in the old format
 */
export async function scrapeRealEstateProperty(url: string): Promise<ScrapedProperty> {
  // Validate URL using new validator
  if (!isValidPropertyUrl(url)) {
    throw new Error("Only realestate.com.au and domain.com.au URLs are supported");
  }

  try {
    const extractedData = await extractPropertyData(url);
    
    // Convert new format to legacy format
    return {
      address: extractedData.address,
      suburb: extractedData.suburb,
      postcode: extractedData.postcode,
      price: extractedData.priceDisplay,
      bedrooms: extractedData.bedrooms,
      bathrooms: extractedData.bathrooms,
      carSpaces: extractedData.parking,
      landSize: extractedData.landSize,
      description: extractedData.description,
      features: extractedData.features,
      images: extractedData.images.map(img => img.url),
      agentName: extractedData.agentName,
      agentPhone: extractedData.agentPhone,
      listingUrl: url,
    };
  } catch (error) {
    if (error instanceof PropertyExtractionError) {
      throw new Error(`Failed to scrape property: ${error.message}`);
    }
    throw new Error(`Failed to scrape property: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export function extractPropertyId(url: string): string {
  // Extract property ID from realestate.com.au URL
  const match = url.match(/\/property-[^-]+-(\d+)/);
  return match?.[1] ?? url;
}

/**
 * Legacy function - now uses the new comprehensive validator
 */
export function validateRealEstateUrl(url: string): boolean {
  return isValidPropertyUrl(url);
}
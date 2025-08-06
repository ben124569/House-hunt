import puppeteer, { Browser, Page } from "puppeteer";
import { PropertyType } from "@prisma/client";

// Rate limiting configuration
const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests
let lastRequestTime = 0;

export interface ExtractedProperty {
  // Basic Info
  url: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  
  // Price
  priceDisplay: string;
  priceMin?: number;
  priceMax?: number;
  
  // Details
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize?: number;
  propertyType: PropertyType;
  
  // Content
  description: string;
  features: string[];
  images: PropertyImage[];
  
  // Agent
  agentName?: string;
  agentAgency?: string;
  agentPhone?: string;
  agentEmail?: string;
  
  // Deal Breakers
  hasFloodRisk?: boolean;
  hasTwoStories?: boolean;
  hasCarParking?: boolean;
  hasSolarPanels?: boolean;
  isDogFriendly?: boolean;
  isMainRoad?: boolean;
  hasPowerLines?: boolean;
  
  // Metadata
  listingId?: string;
  listedDate?: Date;
  daysOnMarket?: number;
  
  // Raw data for analysis
  scrapedData: Record<string, any>;
}

export interface PropertyImage {
  url: string;
  alt?: string;
  type: "photo" | "floorplan" | "map";
  order: number;
}

export class PropertyExtractionError extends Error {
  constructor(
    message: string,
    public readonly url: string,
    public readonly stage: string,
    public override readonly cause?: unknown
  ) {
    super(`${stage}: ${message} (URL: ${url})`);
    this.name = "PropertyExtractionError";
  }
}

/**
 * Comprehensive property data extractor for Australian real estate websites
 */
export async function extractPropertyData(url: string): Promise<ExtractedProperty> {
  // Validate URL format
  const site = detectSite(url);
  if (!site) {
    throw new PropertyExtractionError("Unsupported website", url, "validation");
  }

  // Rate limiting
  await enforceRateLimit();

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await configurePage(page);
    
    // Navigate to property page
    await page.goto(url, { 
      waitUntil: "domcontentloaded", 
      timeout: 30000 
    });

    // Wait for dynamic content to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract data based on site
    let extractedData: ExtractedProperty;
    
    if (site === "realestate") {
      extractedData = await extractRealEstateData(page, url);
    } else if (site === "domain") {
      extractedData = await extractDomainData(page, url);
    } else {
      throw new PropertyExtractionError("Unknown site type", url, "extraction");
    }

    // Validate required fields
    validateExtractedData(extractedData);
    
    return extractedData;

  } catch (error) {
    if (error instanceof PropertyExtractionError) {
      throw error;
    }
    throw new PropertyExtractionError(
      "Extraction failed", 
      url, 
      "browser", 
      error
    );
  } finally {
    await browser.close();
  }
}

async function launchBrowser(): Promise<Browser> {
  return await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
      "--no-first-run",
      "--disable-default-apps"
    ]
  });
}

async function configurePage(page: Page): Promise<void> {
  // Set realistic user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  // Block unnecessary resources for faster loading
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const resourceType = req.resourceType();
    if (["font", "media", "other"].includes(resourceType)) {
      req.abort();
    } else {
      req.continue();
    }
  });
}

function detectSite(url: string): "realestate" | "domain" | null {
  try {
    const parsedUrl = new URL(url);
    
    if (parsedUrl.hostname.includes("realestate.com.au")) {
      return "realestate";
    } else if (parsedUrl.hostname.includes("domain.com.au")) {
      return "domain";
    }
    
    return null;
  } catch {
    return null;
  }
}

async function enforceRateLimit(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    const delay = RATE_LIMIT_DELAY - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  lastRequestTime = Date.now();
}

/**
 * Extract property data from realestate.com.au
 */
async function extractRealEstateData(page: Page, url: string): Promise<ExtractedProperty> {
  try {
    const data = await page.evaluate(() => {
      // Helper function to safely get text content
      const getText = (selector: string): string => {
        const element = document.querySelector(selector);
        return element?.textContent?.trim() || "";
      };

      const getNumber = (selector: string): number => {
        const text = getText(selector);
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      // Extract basic property details
      const address = getText('[data-testid="address-line1"]') || getText('.property-info-address h1');
      const suburb = getText('[data-testid="address-line2"]') || getText('.property-info-address .suburb');
      
      // Price extraction - multiple possible formats
      let priceDisplay = getText('[data-testid="price-display"]') || 
                        getText('.property-price') ||
                        getText('[data-testid="property-price"]');
      
      // Property details
      const bedrooms = getNumber('[data-testid="property-features-text-container"] :contains("Bed")') ||
                      getNumber('.property-features .bed');
      
      const bathrooms = getNumber('[data-testid="property-features-text-container"] :contains("Bath")') ||
                       getNumber('.property-features .bath');
      
      const parking = getNumber('[data-testid="property-features-text-container"] :contains("Car")') ||
                     getNumber('.property-features .car');

      // Land size extraction
      const landSizeText = getText('[data-testid="property-size"] span') ||
                          getText('.property-size-details');
      const landSizeMatch = landSizeText.match(/(\d+(?:,\d+)?)\s*(?:m²|sqm|m2)/i);
      const landSize = landSizeMatch?.[1] ? parseInt(landSizeMatch[1].replace(/,/g, ""), 10) : undefined;

      // Description
      const description = getText('[data-testid="description-text"]') ||
                         getText('.property-description-text') ||
                         getText('.listing-details__description');

      // Features extraction
      const features: string[] = [];
      document.querySelectorAll('[data-testid="property-features-feature"]').forEach(el => {
        const feature = el.textContent?.trim();
        if (feature) features.push(feature);
      });

      // Alternative features selector
      if (features.length === 0) {
        document.querySelectorAll('.property-features-list li, .feature-list li').forEach(el => {
          const feature = el.textContent?.trim();
          if (feature) features.push(feature);
        });
      }

      // Agent information
      const agentName = getText('[data-testid="agent-name"]') ||
                       getText('.agent-card .agent-name') ||
                       getText('.listing-agent-name');
      
      const agentAgency = getText('[data-testid="agent-agency"]') ||
                         getText('.agent-card .agency-name') ||
                         getText('.listing-agency-name');
      
      const agentPhone = getText('[data-testid="agent-phone"]') ||
                        getText('.agent-card .phone-number') ||
                        getText('.agent-contact-phone');

      // Images extraction
      const images: { url: string; alt?: string; type: "photo" | "floorplan" | "map"; order: number }[] = [];
      
      // Property photos
      document.querySelectorAll('[data-testid="gallery-image"] img, .carousel-image img, .property-photos img').forEach((img, index) => {
        const src = (img as HTMLImageElement).src;
        const alt = (img as HTMLImageElement).alt;
        if (src && !src.includes('placeholder')) {
          images.push({
            url: src,
            alt: alt || undefined,
            type: "photo",
            order: index
          });
        }
      });

      // Floorplan images
      document.querySelectorAll('[data-testid="floorplan-image"] img, .floorplan img').forEach((img, index) => {
        const src = (img as HTMLImageElement).src;
        if (src) {
          images.push({
            url: src,
            alt: "Floorplan",
            type: "floorplan",
            order: images.length + index
          });
        }
      });

      // Property type detection
      let propertyType = "HOUSE"; // default
      const typeText = getText('[data-testid="property-type"]') || 
                      getText('.property-type') ||
                      address.toLowerCase();
      
      if (typeText.toLowerCase().includes("apartment") || typeText.toLowerCase().includes("unit")) {
        propertyType = "APARTMENT";
      } else if (typeText.toLowerCase().includes("townhouse")) {
        propertyType = "TOWNHOUSE";
      } else if (typeText.toLowerCase().includes("villa")) {
        propertyType = "VILLA";
      } else if (typeText.toLowerCase().includes("land")) {
        propertyType = "LAND";
      }

      // Deal breaker detection
      const fullText = (description + " " + features.join(" ")).toLowerCase();
      
      const hasSolarPanels = fullText.includes("solar") || fullText.includes("photovoltaic");
      const hasTwoStories = fullText.includes("two stor") || fullText.includes("2 stor") || 
                           fullText.includes("double stor") || fullText.includes("upstairs");
      const hasCarParking = parking > 0 || fullText.includes("garage") || fullText.includes("carport");
      const isDogFriendly = !fullText.includes("no pets") && (fullText.includes("pet") || landSize && landSize > 300);
      
      // Listing metadata
      const listingId = window.location.pathname.match(/\d+/)?.[0];
      
      return {
        address: address || "",
        suburb: suburb || "",
        priceDisplay: priceDisplay || "",
        bedrooms: bedrooms || 0,
        bathrooms: bathrooms || 0,
        parking: parking || 0,
        landSize,
        propertyType,
        description: description || "",
        features,
        images,
        agentName: agentName || undefined,
        agentAgency: agentAgency || undefined,
        agentPhone: agentPhone || undefined,
        hasSolarPanels,
        hasTwoStories,
        hasCarParking,
        isDogFriendly,
        listingId: listingId || undefined,
        rawHtml: document.documentElement.innerHTML
      };
    });

    return transformExtractedData(data, url);

  } catch (error) {
    throw new PropertyExtractionError(
      "Failed to extract RealEstate.com.au data",
      url,
      "realestate-extraction",
      error
    );
  }
}

/**
 * Extract property data from domain.com.au
 */
async function extractDomainData(page: Page, url: string): Promise<ExtractedProperty> {
  try {
    const data = await page.evaluate(() => {
      // Helper functions
      const getText = (selector: string): string => {
        const element = document.querySelector(selector);
        return element?.textContent?.trim() || "";
      };

      const getNumber = (text: string): number => {
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      // Domain.com.au specific selectors
      const address = getText('[data-testid="listing-details__summary-title"]') ||
                     getText('.listing-details__summary-title') ||
                     getText('h1[data-testid="listing-details__summary-title"]');

      const suburb = getText('[data-testid="listing-details__summary-subtitle"]') ||
                    getText('.listing-details__summary-subtitle');

      const priceDisplay = getText('[data-testid="listing-details__summary-price"]') ||
                          getText('.listing-details__summary-price') ||
                          getText('[data-testid="price-display"]');

      // Property features - Domain uses different structure
      const featuresContainer = document.querySelector('[data-testid="listing-summary-strip"]') ||
                               document.querySelector('.listing-summary-strip');
      
      let bedrooms = 0, bathrooms = 0, parking = 0;
      
      if (featuresContainer) {
        const bedroomText = featuresContainer.querySelector('[data-testid="property-features-bed"]')?.textContent || "";
        const bathroomText = featuresContainer.querySelector('[data-testid="property-features-bath"]')?.textContent || "";
        const parkingText = featuresContainer.querySelector('[data-testid="property-features-parking"]')?.textContent || "";
        
        bedrooms = getNumber(bedroomText);
        bathrooms = getNumber(bathroomText);
        parking = getNumber(parkingText);
      }

      // Land size
      const landSizeText = getText('[data-testid="property-size-land"]') ||
                          getText('.property-size-land');
      const landSizeMatch = landSizeText.match(/(\d+(?:,\d+)?)\s*(?:m²|sqm|m2)/i);
      const landSize = landSizeMatch?.[1] ? parseInt(landSizeMatch[1].replace(/,/g, ""), 10) : undefined;

      // Description
      const description = getText('[data-testid="listing-details__description"]') ||
                         getText('.listing-details__description');

      // Features
      const features: string[] = [];
      document.querySelectorAll('[data-testid="listing-details__additional-features-feature"], .listing-details__additional-features li').forEach(el => {
        const feature = el.textContent?.trim();
        if (feature) features.push(feature);
      });

      // Agent details - Domain structure
      const agentName = getText('[data-testid="listing-details__agent-name"]') ||
                       getText('.agent-details__name');
      
      const agentAgency = getText('[data-testid="listing-details__agency-name"]') ||
                         getText('.agent-details__agency');

      const agentPhone = getText('[data-testid="listing-details__agent-phone"]') ||
                        getText('.agent-details__phone');

      // Images
      const images: { url: string; alt?: string; type: "photo" | "floorplan" | "map"; order: number }[] = [];
      
      document.querySelectorAll('[data-testid="media-viewer"] img, .media-gallery img').forEach((img, index) => {
        const src = (img as HTMLImageElement).src;
        const alt = (img as HTMLImageElement).alt;
        if (src && !src.includes('placeholder')) {
          images.push({
            url: src,
            alt: alt || undefined,
            type: "photo",
            order: index
          });
        }
      });

      // Property type
      let propertyType = "HOUSE";
      const typeText = getText('[data-testid="listing-details__summary-type"]') ||
                      address.toLowerCase();
      
      if (typeText.toLowerCase().includes("apartment") || typeText.toLowerCase().includes("unit")) {
        propertyType = "APARTMENT";
      } else if (typeText.toLowerCase().includes("townhouse")) {
        propertyType = "TOWNHOUSE";
      } else if (typeText.toLowerCase().includes("villa")) {
        propertyType = "VILLA";
      }

      // Deal breakers
      const fullText = (description + " " + features.join(" ")).toLowerCase();
      
      const hasSolarPanels = fullText.includes("solar");
      const hasTwoStories = fullText.includes("two stor") || fullText.includes("2 stor");
      const hasCarParking = parking > 0 || fullText.includes("garage");
      const isDogFriendly = !fullText.includes("no pets") && (fullText.includes("pet") || landSize && landSize > 300);

      const listingId = window.location.pathname.match(/\d+/)?.[0];

      return {
        address: address || "",
        suburb: suburb || "",
        priceDisplay: priceDisplay || "",
        bedrooms: bedrooms || 0,
        bathrooms: bathrooms || 0,
        parking: parking || 0,
        landSize,
        propertyType,
        description: description || "",
        features,
        images,
        agentName: agentName || undefined,
        agentAgency: agentAgency || undefined,
        agentPhone: agentPhone || undefined,
        hasSolarPanels,
        hasTwoStories,
        hasCarParking,
        isDogFriendly,
        listingId: listingId || undefined,
        rawHtml: document.documentElement.innerHTML
      };
    });

    return transformExtractedData(data, url);

  } catch (error) {
    throw new PropertyExtractionError(
      "Failed to extract Domain.com.au data",
      url,
      "domain-extraction",
      error
    );
  }
}

function transformExtractedData(rawData: any, url: string): ExtractedProperty {
  // Parse price range
  const priceMatch = rawData.priceDisplay.match(/\$?([0-9,]+)(?:\s*-\s*\$?([0-9,]+))?/);
  let priceMin: number | undefined;
  let priceMax: number | undefined;
  
  if (priceMatch) {
    priceMin = parseInt(priceMatch[1].replace(/,/g, ""), 10);
    if (priceMatch[2]) {
      priceMax = parseInt(priceMatch[2].replace(/,/g, ""), 10);
    } else {
      priceMax = priceMin;
    }
  }

  // Extract suburb, state, postcode from address/suburb field
  const addressParts = (rawData.address + " " + rawData.suburb).split(",");
  const lastPart = addressParts[addressParts.length - 1]?.trim() || "";
  const postcodeMatch = lastPart.match(/(\w+)\s+(\d{4})/);
  
  const state = postcodeMatch?.[1] || "SA";
  const postcode = postcodeMatch?.[2] || "";
  const cleanedSuburb = rawData.suburb.replace(new RegExp(`\\s*${state}\\s*${postcode}\\s*$`, "i"), "").trim();

  return {
    url,
    address: rawData.address,
    suburb: cleanedSuburb || rawData.suburb,
    state,
    postcode,
    priceDisplay: rawData.priceDisplay,
    priceMin,
    priceMax,
    bedrooms: rawData.bedrooms,
    bathrooms: rawData.bathrooms,
    parking: rawData.parking,
    landSize: rawData.landSize,
    propertyType: rawData.propertyType as PropertyType,
    description: rawData.description,
    features: rawData.features,
    images: rawData.images,
    agentName: rawData.agentName,
    agentAgency: rawData.agentAgency,
    agentPhone: rawData.agentPhone,
    agentEmail: undefined, // Not typically available from scraping
    hasFloodRisk: undefined, // Requires separate flood mapping API
    hasTwoStories: rawData.hasTwoStories,
    hasCarParking: rawData.hasCarParking,
    hasSolarPanels: rawData.hasSolarPanels,
    isDogFriendly: rawData.isDogFriendly,
    isMainRoad: undefined, // Requires address analysis
    hasPowerLines: undefined, // Requires map analysis
    listingId: rawData.listingId,
    listedDate: undefined, // Not always available
    daysOnMarket: undefined,
    scrapedData: {
      rawHtml: rawData.rawHtml,
      extractedAt: new Date().toISOString(),
      source: detectSite(url),
      ...rawData
    }
  };
}

function validateExtractedData(data: ExtractedProperty): void {
  const errors: string[] = [];

  if (!data.address.trim()) {
    errors.push("Address is required");
  }
  
  if (!data.suburb.trim()) {
    errors.push("Suburb is required");
  }
  
  if (!data.postcode.trim()) {
    errors.push("Postcode is required");
  }
  
  if (!data.priceDisplay.trim()) {
    errors.push("Price display is required");
  }
  
  if (data.bedrooms < 0) {
    errors.push("Bedrooms must be non-negative");
  }
  
  if (data.bathrooms < 0) {
    errors.push("Bathrooms must be non-negative");
  }

  if (errors.length > 0) {
    throw new PropertyExtractionError(
      `Validation failed: ${errors.join(", ")}`,
      data.url,
      "validation"
    );
  }
}

/**
 * Extract property ID from URL
 */
export function extractPropertyId(url: string): string {
  // RealEstate.com.au pattern
  let match = url.match(/property-[^-]+-(\d+)/);
  if (match?.[1]) return match[1];
  
  // Domain.com.au pattern
  match = url.match(/\/(\d{6,})-/);
  if (match?.[1]) return match[1];
  
  // Generic fallback
  match = url.match(/(\d{6,})/);
  if (match?.[1]) return match[1];
  
  // Use URL as fallback
  return encodeURIComponent(url);
}

/**
 * Validate if URL is from supported Australian real estate website
 */
export function isValidPropertyUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    
    return (
      (hostname.includes("realestate.com.au") && parsedUrl.pathname.includes("/property-")) ||
      (hostname.includes("domain.com.au") && /\/\d{6,}-/.test(parsedUrl.pathname))
    );
  } catch {
    return false;
  }
}

/**
 * Get website name from URL
 */
export function getWebsiteName(url: string): string {
  const site = detectSite(url);
  switch (site) {
    case "realestate":
      return "RealEstate.com.au";
    case "domain":
      return "Domain.com.au";
    default:
      return "Unknown";
  }
}
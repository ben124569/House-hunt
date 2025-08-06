import puppeteer from "puppeteer";

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

export async function scrapeRealEstateProperty(url: string): Promise<ScrapedProperty> {
  // Validate URL
  if (!url.includes("realestate.com.au")) {
    throw new Error("Only realestate.com.au URLs are supported");
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Extract property data
    const propertyData = await page.evaluate(() => {
      // This is a placeholder - actual selectors need to be determined
      // from real realestate.com.au structure
      return {
        address: "Sample Address",
        suburb: "Sample Suburb", 
        postcode: "5000",
        price: "$850,000",
        bedrooms: 3,
        bathrooms: 2,
        carSpaces: 2,
        landSize: 450,
        description: "Sample description",
        features: ["Air Conditioning", "Solar Panels"],
        images: [],
        agentName: "Sample Agent",
        agentPhone: "08 1234 5678",
      };
    });

    return {
      ...propertyData,
      listingUrl: url,
    };
  } catch (error) {
    console.error("Scraping failed:", error);
    throw new Error(`Failed to scrape property: ${error instanceof Error ? error.message : "Unknown error"}`);
  } finally {
    await browser.close();
  }
}

export function extractPropertyId(url: string): string {
  // Extract property ID from realestate.com.au URL
  const match = url.match(/\/property-[^-]+-(\d+)/);
  return match?.[1] ?? url;
}

export function validateRealEstateUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname.includes("realestate.com.au") &&
      parsedUrl.pathname.includes("/property-")
    );
  } catch {
    return false;
  }
}
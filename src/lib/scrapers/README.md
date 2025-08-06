# Property Extractor Documentation

A comprehensive Australian real estate scraper that extracts property data from realestate.com.au and domain.com.au.

## Features

### Supported Websites
- ✅ **realestate.com.au** - Full support with detailed extraction
- ✅ **domain.com.au** - Full support with detailed extraction  
- ❌ Other sites - Not supported (will reject with validation error)

### Extracted Data Points

#### Basic Information
- Full property address
- Suburb, state, postcode
- Property type (house, apartment, townhouse, etc.)
- Listing URL and property ID

#### Pricing
- Display price (as shown on listing)
- Price range (min/max if range provided)
- Price parsing for numerical analysis

#### Property Details  
- Number of bedrooms, bathrooms
- Car parking spaces
- Land size (in square meters)
- Building/floor area (when available)

#### Marketing Content
- Full property description
- Feature list (air conditioning, solar panels, etc.)
- Property images with metadata
- Agent contact information

#### Deal Breaker Detection
Automatically checks for family requirements:
- ❌ Two-story properties (family requires single story)
- ❌ No car parking (needs 2+ spaces)
- ❌ No solar panels
- ❌ Not dog-friendly
- ❌ Flood risk areas
- ❌ Main road locations
- ❌ Overhead power lines

## Usage

### Basic Usage

```typescript
import { extractPropertyData } from "~/lib/scrapers/property-extractor";

const data = await extractPropertyData("https://www.realestate.com.au/property-...");

console.log(data.address); // "123 Smith Street"
console.log(data.bedrooms); // 3
console.log(data.hasSolarPanels); // true/false
```

### URL Validation

```typescript
import { isValidPropertyUrl, getWebsiteName } from "~/lib/scrapers/property-extractor";

const url = "https://www.realestate.com.au/property-house-sa-smithfield-123456789";

if (isValidPropertyUrl(url)) {
  console.log(`Valid ${getWebsiteName(url)} URL`);
  // Proceed with extraction
}
```

### Error Handling

```typescript
import { extractPropertyData, PropertyExtractionError } from "~/lib/scrapers/property-extractor";

try {
  const data = await extractPropertyData(url);
  // Process data
} catch (error) {
  if (error instanceof PropertyExtractionError) {
    console.error(`Extraction failed at stage: ${error.stage}`);
    console.error(`URL: ${error.url}`);
    console.error(`Message: ${error.message}`);
  }
}
```

### TRPC Integration

The scraper is integrated into the TRPC API routes:

```typescript
// Create property from URL
const property = await api.property.create.mutate({
  url: "https://www.realestate.com.au/property-...",
  notes: "Looks promising for family",
});

// Preview without saving  
const preview = await api.property.preview.mutate({
  url: "https://www.domain.com.au/...",
});

// Refresh existing property data
const updated = await api.property.rescrape.mutate({
  id: "property-id",
  forceUpdate: true,
});
```

## Data Structure

### ExtractedProperty Interface

```typescript
interface ExtractedProperty {
  // Basic Info
  url: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  
  // Price
  priceDisplay: string;      // "$750,000" or "$700k-$800k"
  priceMin?: number;         // 700000
  priceMax?: number;         // 800000
  
  // Details  
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize?: number;         // in sqm
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
  
  // Deal Breakers (auto-detected)
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
  
  // Raw scraped data for debugging
  scrapedData: Record<string, any>;
}
```

### PropertyImage Interface

```typescript
interface PropertyImage {
  url: string;
  alt?: string;
  type: "photo" | "floorplan" | "map";
  order: number;
}
```

## Rate Limiting & Best Practices

### Built-in Rate Limiting
- 2 second delay between requests
- Respectful of website resources
- Configurable delay settings

### Browser Configuration
- Headless Chrome with realistic user agent
- Request interception to block unnecessary resources
- Optimized for speed and reliability

### Error Recovery
- Detailed error messages with extraction stage info
- Graceful fallbacks for missing data
- Comprehensive logging for debugging

## Testing

### Test Utility

```typescript
import { runTests, quickTest } from "~/lib/scrapers/test-scraper";

// Test a single URL
await quickTest("https://www.realestate.com.au/property-...");

// Run comprehensive test suite
await runTests([
  "https://www.realestate.com.au/property-...",
  "https://www.domain.com.au/...",
]);
```

### Command Line Testing

```bash
# Test single URL
npx tsx src/lib/scrapers/test-scraper.ts "https://www.realestate.com.au/property-..."

# Run full test suite
npx tsx src/lib/scrapers/test-scraper.ts
```

## Website-Specific Implementation

### RealEstate.com.au Selectors
- Property features: `[data-testid="property-features-text-container"]`
- Price display: `[data-testid="price-display"]`
- Agent info: `[data-testid="agent-name"]`
- Property images: `[data-testid="gallery-image"] img`

### Domain.com.au Selectors  
- Property summary: `[data-testid="listing-details__summary-title"]`
- Features strip: `[data-testid="listing-summary-strip"]`
- Agent details: `[data-testid="listing-details__agent-name"]`
- Media gallery: `[data-testid="media-viewer"] img`

## Integration with House Hunt Platform

### Property Creation Flow
1. URL validation
2. Data extraction with error handling
3. Suburb profile creation/lookup
4. Property record creation in database
5. Deal breaker analysis
6. Activity logging
7. Automatic note creation for issues

### Database Mapping
- Extracted data maps directly to Prisma Property model
- Suburb profiles auto-created/linked
- Images stored as JSON with metadata
- Raw scraping data preserved for debugging

### Family Requirements Integration
- Automatic deal breaker detection
- Warning notes for potential issues
- Status updates based on requirements
- Activity tracking for all actions

## Maintenance & Updates

### Website Changes
When real estate websites update their HTML structure:

1. Update selectors in `extractRealEstateData()` or `extractDomainData()`
2. Test with `test-scraper.ts`
3. Update this documentation
4. Consider version control for selector changes

### Adding New Websites
To support additional Australian real estate sites:

1. Add detection logic to `detectSite()`
2. Implement extraction function (follow existing patterns)
3. Add to `isValidPropertyUrl()` validation
4. Update `getWebsiteName()` mapping
5. Add test URLs to test suite
6. Update documentation

### Performance Monitoring
- Monitor extraction success rates
- Track performance metrics
- Log failed extractions for analysis
- Regular testing against live listings

## Common Issues & Solutions

### Extraction Failures
- **Timeout errors**: Increase timeout in browser config
- **Missing selectors**: Website structure changed, update selectors
- **Rate limiting**: Increase delay between requests

### Data Quality Issues
- **Missing required fields**: Add fallback selectors
- **Incorrect parsing**: Update regex patterns
- **Deal breaker detection**: Refine text analysis logic

### Browser Issues
- **Memory leaks**: Ensure browser.close() in finally blocks
- **Startup failures**: Check Chrome installation and args
- **Request blocking**: Update user agent strings

## Security Considerations

- No personal data is stored unnecessarily
- Respects robots.txt guidelines  
- Implements reasonable rate limiting
- Uses headless browsing for privacy
- Logs scraping activity for compliance

## Legal Compliance

This scraper is designed for legitimate property research purposes:
- Respects website terms of service
- Implements responsible rate limiting
- Does not circumvent access controls
- Used only for family home buying decisions
- No commercial redistribution of scraped data
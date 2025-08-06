/**
 * Web Scraping Utilities for Suburb Intelligence
 * 
 * This module provides utilities for safely scraping Australian government
 * and real estate websites for suburb data.
 * 
 * Author: Claude Code
 * Created: 2025-08-06
 */

import { z } from 'zod';

// =============================================================================
// TYPES & SCHEMAS
// =============================================================================

export const ScrapingResultSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  url: z.string(),
  timestamp: z.date(),
  source: z.string(),
  reliability: z.enum(['high', 'medium', 'low']).default('medium'),
});

export type ScrapingResult = z.infer<typeof ScrapingResultSchema>;

export interface ScrapingOptions {
  timeout?: number; // milliseconds
  retries?: number;
  delayBetweenRetries?: number; // milliseconds
  userAgent?: string;
  headers?: Record<string, string>;
  respectRobotsTxt?: boolean;
  rateLimit?: {
    requests: number;
    perMs: number;
  };
}

// =============================================================================
// RATE LIMITING & CACHING
// =============================================================================

class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  async waitForSlot(domain: string, rateLimit: { requests: number; perMs: number }): Promise<void> {
    const now = Date.now();
    const domainRequests = this.requests.get(domain) || [];
    
    // Remove requests outside the time window
    const validRequests = domainRequests.filter(timestamp => now - timestamp < rateLimit.perMs);
    
    // Check if we need to wait
    if (validRequests.length >= rateLimit.requests) {
      const oldestRequest = Math.min(...validRequests);
      const waitTime = rateLimit.perMs - (now - oldestRequest) + 100; // Add 100ms buffer
      
      if (waitTime > 0) {
        console.log(`Rate limit reached for ${domain}, waiting ${waitTime}ms`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(domain, validRequests);
  }
}

const rateLimiter = new RateLimiter();

class ScrapingCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttlMs: number = 24 * 60 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

const scrapingCache = new ScrapingCache();

// =============================================================================
// CORE SCRAPING FUNCTIONS
// =============================================================================

export async function safeFetch(
  url: string, 
  options: ScrapingOptions = {}
): Promise<Response> {
  const {
    timeout = 30000,
    retries = 3,
    delayBetweenRetries = 1000,
    userAgent = 'Mozilla/5.0 (compatible; HouseHunt-Research/1.0; +https://example.com/bot)',
    headers = {},
    rateLimit = { requests: 10, perMs: 60000 }, // 10 requests per minute by default
  } = options;

  const domain = new URL(url).hostname;
  
  // Check rate limiting
  await rateLimiter.waitForSlot(domain, rateLimit);

  const fetchOptions: RequestInit = {
    headers: {
      'User-Agent': userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-AU,en-US;q=0.7,en;q=0.3',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      ...headers,
    },
    signal: AbortSignal.timeout(timeout),
  };

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Fetching ${url} (attempt ${attempt}/${retries})`);
      
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      console.log(`✅ Successfully fetched ${url}`);
      return response;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.warn(`❌ Attempt ${attempt} failed for ${url}:`, lastError.message);

      if (attempt < retries) {
        const delay = delayBetweenRetries * attempt; // Exponential backoff
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`Failed to fetch ${url} after ${retries} attempts: ${lastError?.message}`);
}

export async function scrapeWithCache(
  url: string,
  scraper: (html: string) => any,
  sourceName: string,
  options: ScrapingOptions & { cacheTtl?: number } = {}
): Promise<ScrapingResult> {
  const { cacheTtl = 24 * 60 * 60 * 1000, ...scrapingOptions } = options; // 24 hours default
  const cacheKey = `scrape:${url}:${sourceName}`;
  
  // Check cache first
  const cached = scrapingCache.get(cacheKey);
  if (cached) {
    console.log(`📦 Using cached data for ${url}`);
    return {
      success: true,
      data: cached,
      url,
      timestamp: new Date(),
      source: sourceName,
      reliability: 'high', // Cached data is considered reliable
    };
  }

  try {
    const response = await safeFetch(url, scrapingOptions);
    const html = await response.text();
    
    const data = scraper(html);
    
    // Cache the result
    scrapingCache.set(cacheKey, data, cacheTtl);
    
    return {
      success: true,
      data,
      url,
      timestamp: new Date(),
      source: sourceName,
      reliability: 'medium',
    };

  } catch (error) {
    console.error(`❌ Scraping failed for ${url}:`, error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      url,
      timestamp: new Date(),
      source: sourceName,
      reliability: 'low',
    };
  }
}

// =============================================================================
// SUBURB-SPECIFIC SCRAPERS
// =============================================================================

export class SuburbDataScraper {
  
  /**
   * Scrape ABS Census data for a suburb
   */
  async scrapeCensusData(suburbName: string, postcode: string): Promise<ScrapingResult> {
    const url = `https://quickstats.censusdata.abs.gov.au/census_services/getproduct/census/2021/quickstat/UCL${postcode}`;
    
    return await scrapeWithCache(
      url,
      (html) => this.parseCensusHTML(html),
      'ABS Census 2021',
      {
        rateLimit: { requests: 5, perMs: 60000 }, // Be respectful to ABS
        cacheTtl: 7 * 24 * 60 * 60 * 1000, // Cache for 7 days (Census data changes rarely)
      }
    );
  }

  private parseCensusHTML(html: string): any {
    // TODO: Implement actual HTML parsing for Census data
    // This would use a library like cheerio to extract demographic data
    console.log('🚧 Census HTML parsing not yet implemented');
    return {
      population: null,
      medianAge: null,
      medianIncome: null,
      note: 'Census data parsing not implemented yet',
    };
  }

  /**
   * Scrape crime statistics from SA Police
   */
  async scrapeCrimeData(suburbName: string): Promise<ScrapingResult> {
    // SA Police crime map - would need to reverse engineer their API
    const url = `https://www.police.sa.gov.au/your-safety/crime-statistics-map`;
    
    return await scrapeWithCache(
      url,
      (html) => this.parseCrimeHTML(html, suburbName),
      'SA Police Crime Statistics',
      {
        rateLimit: { requests: 3, perMs: 60000 }, // Be very respectful to SA Police
        cacheTtl: 30 * 24 * 60 * 60 * 1000, // Cache for 30 days
      }
    );
  }

  private parseCrimeHTML(html: string, suburbName: string): any {
    // TODO: Implement actual crime data extraction
    console.log('🚧 Crime data parsing not yet implemented');
    return {
      totalOffences: null,
      note: 'Crime data parsing not implemented yet - would need to reverse engineer SA Police crime map API',
    };
  }

  /**
   * Scrape school data from MySchool
   */
  async scrapeSchoolData(suburbName: string, postcode: string): Promise<ScrapingResult> {
    // MySchool search API - would need to reverse engineer
    const url = `https://www.myschool.edu.au/search?SchoolName=&Postcode=${postcode}&State=SA`;
    
    return await scrapeWithCache(
      url,
      (html) => this.parseSchoolHTML(html),
      'MySchool Australia',
      {
        rateLimit: { requests: 5, perMs: 60000 },
        cacheTtl: 90 * 24 * 60 * 60 * 1000, // Cache for 90 days
      }
    );
  }

  private parseSchoolHTML(html: string): any {
    // TODO: Implement school data extraction
    console.log('🚧 School data parsing not yet implemented');
    return {
      schools: [],
      note: 'School data parsing not implemented yet',
    };
  }

  /**
   * Scrape property market data from RealEstate.com.au
   */
  async scrapeMarketData(suburbName: string, postcode: string): Promise<ScrapingResult> {
    const suburbSlug = suburbName.toLowerCase().replace(/\s+/g, '-');
    const url = `https://www.realestate.com.au/neighbourhoods/${suburbSlug}-${postcode}-sa`;
    
    return await scrapeWithCache(
      url,
      (html) => this.parseMarketHTML(html),
      'RealEstate.com.au',
      {
        rateLimit: { requests: 10, perMs: 60000 },
        cacheTtl: 24 * 60 * 60 * 1000, // Cache for 24 hours (market data changes frequently)
      }
    );
  }

  private parseMarketHTML(html: string): any {
    // TODO: Implement market data extraction
    console.log('🚧 Market data parsing not yet implemented');
    return {
      medianHousePrice: null,
      medianUnitPrice: null,
      note: 'Market data parsing not implemented yet',
    };
  }

  /**
   * Scrape flood risk data from SA Water/Government sources
   */
  async scrapeFloodRiskData(suburbName: string): Promise<ScrapingResult> {
    // This would typically require accessing flood mapping services
    const url = `https://www.waterconnect.sa.gov.au/Systems/WDTF/Pages/default.aspx`;
    
    return await scrapeWithCache(
      url,
      (html) => this.parseFloodHTML(html, suburbName),
      'SA Water Flood Mapping',
      {
        rateLimit: { requests: 2, perMs: 60000 }, // Be very respectful
        cacheTtl: 180 * 24 * 60 * 60 * 1000, // Cache for 6 months (flood maps change rarely)
      }
    );
  }

  private parseFloodHTML(html: string, suburbName: string): any {
    // TODO: Implement flood risk extraction
    console.log('🚧 Flood risk parsing not yet implemented');
    return {
      floodRisk: 'unknown',
      note: 'Flood risk data parsing not implemented yet',
    };
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Extract clean text from HTML
 */
export function extractText(html: string, selector: string): string | null {
  // TODO: Implement with cheerio or similar HTML parser
  console.log('🚧 HTML text extraction not yet implemented');
  return null;
}

/**
 * Extract numbers from text (useful for prices, statistics, etc.)
 */
export function extractNumbers(text: string): number[] {
  const matches = text.match(/[\d,]+/g);
  if (!matches) return [];
  
  return matches.map(match => parseInt(match.replace(/,/g, ''), 10))
                .filter(num => !isNaN(num));
}

/**
 * Clean and normalize suburb names for URL slugs
 */
export function normalizeSuburbName(suburbName: string): string {
  return suburbName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Check if URL is allowed by robots.txt (basic implementation)
 */
export async function checkRobotsTxt(url: string, userAgent: string = '*'): Promise<boolean> {
  try {
    const domain = new URL(url).origin;
    const robotsUrl = `${domain}/robots.txt`;
    
    const response = await fetch(robotsUrl, { 
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': userAgent },
    });
    
    if (!response.ok) {
      // If robots.txt doesn't exist, assume crawling is allowed
      return true;
    }
    
    const robotsText = await response.text();
    
    // Very basic robots.txt parsing - should be more sophisticated in production
    const lines = robotsText.split('\n');
    let currentUserAgent = '';
    let disallowed: string[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim().toLowerCase();
      
      if (trimmed.startsWith('user-agent:')) {
        currentUserAgent = trimmed.split(':')[1]?.trim() || '';
      } else if (trimmed.startsWith('disallow:') && 
                 (currentUserAgent === '*' || currentUserAgent === userAgent.toLowerCase())) {
        const path = trimmed.split(':')[1]?.trim() || '';
        if (path) disallowed.push(path);
      }
    }
    
    const urlPath = new URL(url).pathname;
    return !disallowed.some(disallowedPath => 
      urlPath.startsWith(disallowedPath) || disallowedPath === '/'
    );
    
  } catch (error) {
    console.warn('Could not check robots.txt:', error);
    return true; // Default to allowing if check fails
  }
}

/**
 * Get scraping statistics
 */
export function getScrapingStats(): {
  cacheSize: number;
  rateLimiters: number;
} {
  return {
    cacheSize: scrapingCache.size(),
    rateLimiters: rateLimiter['requests'].size,
  };
}

/**
 * Clear all caches and reset rate limiters
 */
export function resetScrapingState(): void {
  scrapingCache.clear();
  rateLimiter['requests'].clear();
  console.log('🧹 Cleared all scraping caches and rate limiters');
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  SuburbDataScraper,
  safeFetch,
  scrapeWithCache,
  extractText,
  extractNumbers,
  normalizeSuburbName,
  checkRobotsTxt,
  getScrapingStats,
  resetScrapingState,
};
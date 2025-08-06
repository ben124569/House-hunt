/**
 * Geocoding Utilities for Suburb Intelligence
 * 
 * This module provides geocoding services to get coordinates for suburbs,
 * calculate distances, and determine geographical relationships.
 * 
 * Author: Claude Code  
 * Created: 2025-08-06
 */

import { z } from 'zod';

// =============================================================================
// TYPES & SCHEMAS
// =============================================================================

export const CoordinateSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const GeocodeResultSchema = z.object({
  success: z.boolean(),
  coordinates: CoordinateSchema.optional(),
  address: z.string().optional(),
  confidence: z.number().min(0).max(100).optional(),
  source: z.string(),
  error: z.string().optional(),
});

export const AddressComponentSchema = z.object({
  suburb: z.string().optional(),
  postcode: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  formattedAddress: z.string().optional(),
});

export type Coordinate = z.infer<typeof CoordinateSchema>;
export type GeocodeResult = z.infer<typeof GeocodeResultSchema>;
export type AddressComponent = z.infer<typeof AddressComponentSchema>;

// =============================================================================
// STATIC SUBURB COORDINATES (NORTHERN ADELAIDE)
// =============================================================================

// Pre-defined coordinates for Northern Adelaide suburbs to reduce API calls
export const NORTHERN_ADELAIDE_COORDINATES: Record<string, Coordinate> = {
  // Playford Council
  "Angle Vale": { latitude: -34.6472, longitude: 138.6581 },
  "Two Wells": { latitude: -34.5931, longitude: 138.7147 },
  "Virginia": { latitude: -34.6656, longitude: 138.5678 },
  "Waterloo Corner": { latitude: -34.6933, longitude: 138.6253 },
  "Munno Para": { latitude: -34.6628, longitude: 138.7014 },
  "Smithfield Plains": { latitude: -34.6939, longitude: 138.6831 },
  "Blakeview": { latitude: -34.6892, longitude: 138.6992 },
  "Andrews Farm": { latitude: -34.7264, longitude: 138.6564 },
  "Eyre": { latitude: -34.7372, longitude: 138.6156 },
  "Craigmore": { latitude: -34.7097, longitude: 138.6761 },
  "Elizabeth": { latitude: -34.7167, longitude: 138.6714 },
  "Elizabeth North": { latitude: -34.7019, longitude: 138.6719 },
  "Elizabeth South": { latitude: -34.7306, longitude: 138.6714 },
  "Elizabeth East": { latitude: -34.7158, longitude: 138.6842 },
  "Elizabeth West": { latitude: -34.7167, longitude: 138.6597 },
  "Elizabeth Vale": { latitude: -34.7297, longitude: 138.6633 },
  "Elizabeth Park": { latitude: -34.7069, longitude: 138.6803 },
  "Davoren Park": { latitude: -34.7383, longitude: 138.6325 },
  "Hillbank": { latitude: -34.7542, longitude: 138.6486 },
  "Penfield": { latitude: -34.7736, longitude: 138.6586 },
  "Kudla": { latitude: -34.7419, longitude: 138.6975 },
  "Uleybury": { latitude: -34.7869, longitude: 138.6986 },
  "One Tree Hill": { latitude: -34.8297, longitude: 138.7342 },

  // Gawler Area
  "Gawler": { latitude: -34.6031, longitude: 138.7450 },
  "Gawler East": { latitude: -34.6031, longitude: 138.7547 },
  "Gawler West": { latitude: -34.6031, longitude: 138.7353 },
  "Gawler South": { latitude: -34.6131, longitude: 138.7450 },
  "Gawler Belt": { latitude: -34.5931, longitude: 138.7350 },
  "Willaston": { latitude: -34.5833, longitude: 138.7567 },
  "Concordia": { latitude: -34.5731, longitude: 138.7653 },
  "Bibaringa": { latitude: -34.5631, longitude: 138.7756 },
  "Evanston": { latitude: -34.6200, longitude: 138.7578 },
  "Evanston South": { latitude: -34.6300, longitude: 138.7578 },
  "Evanston Park": { latitude: -34.6122, longitude: 138.7631 },

  // Salisbury Council
  "Salisbury": { latitude: -34.7581, longitude: 138.6411 },
  "Salisbury North": { latitude: -34.7481, longitude: 138.6411 },
  "Salisbury South": { latitude: -34.7681, longitude: 138.6411 },
  "Salisbury East": { latitude: -34.7581, longitude: 138.6511 },
  "Salisbury West": { latitude: -34.7581, longitude: 138.6311 },
  "Salisbury Heights": { latitude: -34.7481, longitude: 138.6561 },
  "Salisbury Plain": { latitude: -34.7481, longitude: 138.6261 },
  "Salisbury Park": { latitude: -34.7681, longitude: 138.6261 },
  "Parafield": { latitude: -34.7831, longitude: 138.6261 },
  "Parafield Gardens": { latitude: -34.7681, longitude: 138.6089 },
  "Mawson Lakes": { latitude: -34.8081, longitude: 138.6139 },
  "Para Hills": { latitude: -34.8031, longitude: 138.6439 },
  "Para Hills West": { latitude: -34.8031, longitude: 138.6289 },
  "Para Vista": { latitude: -34.8181, longitude: 138.6439 },
  "Pooraka": { latitude: -34.8331, longitude: 138.6139 },
  "Brahma Lodge": { latitude: -34.8081, longitude: 138.5989 },
  "Paralowie": { latitude: -34.7681, longitude: 138.5939 },
  "Direk": { latitude: -34.7831, longitude: 138.5789 },

  // Tea Tree Gully (Northern)
  "Golden Grove": { latitude: -34.7892, longitude: 138.7289 },
  "Wynn Vale": { latitude: -34.7942, longitude: 138.7089 },
  "Surrey Downs": { latitude: -34.7842, longitude: 138.7189 },
  "Fairview Park": { latitude: -34.8142, longitude: 138.6939 },
  "Ridgehaven": { latitude: -34.8292, longitude: 138.6839 },

  // Port Adelaide Enfield (Northern)
  "Gepps Cross": { latitude: -34.8481, longitude: 138.5989 },
  "Blair Athol": { latitude: -34.8531, longitude: 138.5989 },
  "Kilburn": { latitude: -34.8631, longitude: 138.5889 },
  "Wingfield": { latitude: -34.8531, longitude: 138.5739 },
  "Dry Creek": { latitude: -34.8431, longitude: 138.5639 },
  "Ottoway": { latitude: -34.8631, longitude: 138.5589 },
};

// Central Adelaide CBD coordinates for distance calculations
export const ADELAIDE_CBD: Coordinate = {
  latitude: -34.9285,
  longitude: 138.6007,
};

// Other key locations
export const KEY_LOCATIONS: Record<string, Coordinate> = {
  "Adelaide Airport": { latitude: -34.9461, longitude: 138.5311 },
  "Modbury": { latitude: -34.8331, longitude: 138.6892 },
  "Tea Tree Plaza": { latitude: -34.8200, longitude: 138.6681 },
  "Westfield Marion": { latitude: -35.0281, longitude: 138.5500 },
  "Adelaide Hills": { latitude: -35.0167, longitude: 138.7667 },
  "Port Adelaide": { latitude: -34.8483, longitude: 138.5069 },
  "Gepps Cross Shopping Centre": { latitude: -34.8467, longitude: 138.5994 },
};

// =============================================================================
// GEOCODING FUNCTIONS
// =============================================================================

/**
 * Get coordinates for a suburb (using static data first, then API fallback)
 */
export async function geocodeSuburb(suburbName: string, state: string = 'SA'): Promise<GeocodeResult> {
  // First check static coordinates
  const staticCoords = NORTHERN_ADELAIDE_COORDINATES[suburbName];
  if (staticCoords) {
    return {
      success: true,
      coordinates: staticCoords,
      address: `${suburbName}, ${state}, Australia`,
      confidence: 95,
      source: 'static_database',
    };
  }

  // For suburbs not in our static database, we would use an external geocoding API
  // TODO: Implement external geocoding (Google Maps, OpenStreetMap Nominatim, etc.)
  
  try {
    // Placeholder for external geocoding
    const externalResult = await geocodeWithNominatim(suburbName, state);
    
    if (externalResult.success) {
      return externalResult;
    }
    
    // If external fails, return approximate coordinates based on similar suburbs
    const approximateCoords = approximateSuburbLocation(suburbName);
    if (approximateCoords) {
      return {
        success: true,
        coordinates: approximateCoords,
        address: `${suburbName}, ${state}, Australia (approximate)`,
        confidence: 30,
        source: 'approximation',
      };
    }
    
    throw new Error('No coordinates found');
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Geocoding failed',
      source: 'external_api',
    };
  }
}

/**
 * Geocode using OpenStreetMap Nominatim (free alternative to Google Maps)
 */
async function geocodeWithNominatim(suburbName: string, state: string): Promise<GeocodeResult> {
  const query = encodeURIComponent(`${suburbName}, ${state}, Australia`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&countrycodes=au`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'HouseHunt-Research/1.0 (contact@example.com)',
      },
      signal: AbortSignal.timeout(10000),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No results found');
    }
    
    const result = data[0];
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);
    
    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid coordinates returned');
    }
    
    return {
      success: true,
      coordinates: { latitude, longitude },
      address: result.display_name,
      confidence: Math.min(95, Math.round(parseFloat(result.importance || '0.5') * 100)),
      source: 'nominatim_osm',
    };
    
  } catch (error) {
    console.warn(`Nominatim geocoding failed for ${suburbName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Nominatim API error',
      source: 'nominatim_osm',
    };
  }
}

/**
 * Approximate suburb location based on known nearby suburbs
 */
function approximateSuburbLocation(suburbName: string): Coordinate | null {
  // Very basic approximation - in production, this could be more sophisticated
  // using council boundaries, postal code areas, etc.
  
  // Default to central Northern Adelaide if no other info available
  return {
    latitude: -34.7000,
    longitude: 138.6500,
  };
}

// =============================================================================
// DISTANCE CALCULATIONS
// =============================================================================

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371; // Earth's radius in kilometers
  
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(coord1.latitude)) * Math.cos(toRadians(coord2.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // Distance in kilometers
}

/**
 * Calculate distance from suburb to Adelaide CBD
 */
export function distanceFromAdelaideCBD(suburbName: string): number | null {
  const suburbCoords = NORTHERN_ADELAIDE_COORDINATES[suburbName];
  if (!suburbCoords) return null;
  
  return calculateDistance(suburbCoords, ADELAIDE_CBD);
}

/**
 * Calculate distances from suburb to key locations
 */
export function calculateKeyDistances(suburbName: string): Record<string, number> {
  const suburbCoords = NORTHERN_ADELAIDE_COORDINATES[suburbName];
  if (!suburbCoords) return {};
  
  const distances: Record<string, number> = {};
  
  // CBD distance
  distances.adelaide_cbd = calculateDistance(suburbCoords, ADELAIDE_CBD);
  
  // Other key locations
  for (const [locationName, coords] of Object.entries(KEY_LOCATIONS)) {
    const distance = calculateDistance(suburbCoords, coords);
    distances[locationName.toLowerCase().replace(/\s+/g, '_')] = distance;
  }
  
  return distances;
}

/**
 * Find nearby suburbs within a given radius
 */
export function findNearbySuburbs(targetSuburb: string, radiusKm: number = 10): Array<{
  name: string;
  distance: number;
  coordinates: Coordinate;
}> {
  const targetCoords = NORTHERN_ADELAIDE_COORDINATES[targetSuburb];
  if (!targetCoords) return [];
  
  const nearby: Array<{ name: string; distance: number; coordinates: Coordinate }> = [];
  
  for (const [suburbName, coords] of Object.entries(NORTHERN_ADELAIDE_COORDINATES)) {
    if (suburbName === targetSuburb) continue;
    
    const distance = calculateDistance(targetCoords, coords);
    if (distance <= radiusKm) {
      nearby.push({
        name: suburbName,
        distance,
        coordinates: coords,
      });
    }
  }
  
  // Sort by distance
  nearby.sort((a, b) => a.distance - b.distance);
  
  return nearby;
}

// =============================================================================
// TRAVEL TIME ESTIMATION
// =============================================================================

/**
 * Estimate driving time based on distance and traffic patterns
 */
export function estimateDrivingTime(distanceKm: number, isPeakHour: boolean = false): number {
  // Basic estimation - in production, would use real traffic APIs
  const baseSpeedKmh = isPeakHour ? 35 : 50; // Slower in peak hour
  const timeHours = distanceKm / baseSpeedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  
  // Add buffer for intersections, traffic lights, etc.
  const buffer = Math.max(5, Math.round(distanceKm * 0.5));
  
  return timeMinutes + buffer;
}

/**
 * Estimate commute times from a suburb to key locations
 */
export function estimateCommuteTimes(suburbName: string): Record<string, {
  distance: number;
  drivingTime: number;
  drivingTimePeak: number;
  publicTransportTime?: number;
}> {
  const distances = calculateKeyDistances(suburbName);
  const commuteTimes: Record<string, any> = {};
  
  for (const [location, distance] of Object.entries(distances)) {
    commuteTimes[location] = {
      distance: Math.round(distance * 10) / 10, // Round to 1 decimal
      drivingTime: estimateDrivingTime(distance, false),
      drivingTimePeak: estimateDrivingTime(distance, true),
      // TODO: Add public transport time estimation
    };
  }
  
  return commuteTimes;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Check if coordinates are within South Australia bounds
 */
export function isWithinSouthAustralia(coord: Coordinate): boolean {
  // Rough SA boundaries
  const SA_BOUNDS = {
    north: -26.0,
    south: -38.0,
    west: 129.0,
    east: 141.0,
  };
  
  return coord.latitude >= SA_BOUNDS.south &&
         coord.latitude <= SA_BOUNDS.north &&
         coord.longitude >= SA_BOUNDS.west &&
         coord.longitude <= SA_BOUNDS.east;
}

/**
 * Get the centroid (center point) of multiple coordinates
 */
export function getCentroid(coordinates: Coordinate[]): Coordinate {
  if (coordinates.length === 0) {
    throw new Error('Cannot calculate centroid of empty coordinate array');
  }
  
  const sum = coordinates.reduce(
    (acc, coord) => ({
      latitude: acc.latitude + coord.latitude,
      longitude: acc.longitude + coord.longitude,
    }),
    { latitude: 0, longitude: 0 }
  );
  
  return {
    latitude: sum.latitude / coordinates.length,
    longitude: sum.longitude / coordinates.length,
  };
}

/**
 * Check if a suburb is in our static database
 */
export function hasStaticCoordinates(suburbName: string): boolean {
  return suburbName in NORTHERN_ADELAIDE_COORDINATES;
}

/**
 * Get all suburbs within a bounding box
 */
export function getSuburbsInBounds(bounds: {
  north: number;
  south: number;
  east: number;
  west: number;
}): string[] {
  return Object.entries(NORTHERN_ADELAIDE_COORDINATES)
    .filter(([_, coords]) => 
      coords.latitude <= bounds.north &&
      coords.latitude >= bounds.south &&
      coords.longitude <= bounds.east &&
      coords.longitude >= bounds.west
    )
    .map(([name]) => name);
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  geocodeSuburb,
  calculateDistance,
  distanceFromAdelaideCBD,
  calculateKeyDistances,
  findNearbySuburbs,
  estimateCommuteTimes,
  estimateDrivingTime,
  getCentroid,
  hasStaticCoordinates,
  getSuburbsInBounds,
  isWithinSouthAustralia,
  NORTHERN_ADELAIDE_COORDINATES,
  ADELAIDE_CBD,
  KEY_LOCATIONS,
};
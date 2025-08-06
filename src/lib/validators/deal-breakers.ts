import { z } from "zod";
import type { Property } from "@prisma/client";

export interface DealBreakerResult {
  passed: boolean;
  violations: DealBreakerViolation[];
  warnings: DealBreakerWarning[];
}

export interface DealBreakerViolation {
  type: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  message: string;
  details?: string;
  autoReject: boolean;
}

export interface DealBreakerWarning {
  type: string;
  message: string;
  details?: string;
}

// Family-specific requirements for Northern Adelaide house hunting
export const FAMILY_REQUIREMENTS = {
  maxBudget: 900000, // Under $900k
  minBathrooms: 2,
  minLivingAreas: 2,
  minCarSpaces: 2,
  requiresSolar: true,
  requiresDogFriendly: true,
  singleStoryOnly: true,
  avoidFloodZones: true,
  avoidHeavyTraffic: true,
  avoidOverheadPowerLines: true,
} as const;

export class DealBreakerValidator {
  static validate(property: Property & { 
    features?: any;
    suburb?: { name: string };
  }): DealBreakerResult {
    const violations: DealBreakerViolation[] = [];
    const warnings: DealBreakerWarning[] = [];

    // Budget check
    const price = property.priceMax ?? property.priceMin ?? 0;
    if (price > FAMILY_REQUIREMENTS.maxBudget) {
      violations.push({
        type: "OVER_BUDGET",
        severity: "HIGH",
        message: `Property is over budget at $${price.toLocaleString()}`,
        details: `Family budget is under $${FAMILY_REQUIREMENTS.maxBudget.toLocaleString()}`,
        autoReject: true,
      });
    }

    // Story check - critical deal breaker
    if (property.features?.stories && property.features.stories > 1) {
      violations.push({
        type: "MULTI_STORY",
        severity: "HIGH", 
        message: "Property is 2-story",
        details: "Family requires single story properties only",
        autoReject: true,
      });
    }

    // Bathroom requirement
    if (property.bathrooms < FAMILY_REQUIREMENTS.minBathrooms) {
      violations.push({
        type: "INSUFFICIENT_BATHROOMS",
        severity: "HIGH",
        message: `Only ${property.bathrooms} bathroom${property.bathrooms === 1 ? '' : 's'}`,
        details: `Family requires minimum ${FAMILY_REQUIREMENTS.minBathrooms} bathrooms`,
        autoReject: true,
      });
    }

    // Living areas (if data available)
    if (property.features?.livingAreas && property.features.livingAreas < FAMILY_REQUIREMENTS.minLivingAreas) {
      violations.push({
        type: "INSUFFICIENT_LIVING_AREAS", 
        severity: "HIGH",
        message: `Only ${property.features.livingAreas} living area${property.features.livingAreas === 1 ? '' : 's'}`,
        details: `Family requires minimum ${FAMILY_REQUIREMENTS.minLivingAreas} living areas`,
        autoReject: true,
      });
    }

    // Car accommodation
    if (property.parking < FAMILY_REQUIREMENTS.minCarSpaces) {
      violations.push({
        type: "INSUFFICIENT_CAR_SPACES",
        severity: "MEDIUM",
        message: `Only ${property.parking} car space${property.parking === 1 ? '' : 's'}`,
        details: `Family requires accommodation for ${FAMILY_REQUIREMENTS.minCarSpaces}+ cars`,
        autoReject: true,
      });
    }

    // Solar panels requirement
    if (FAMILY_REQUIREMENTS.requiresSolar && !property.features?.solarPanels) {
      violations.push({
        type: "NO_SOLAR_PANELS",
        severity: "MEDIUM",
        message: "No solar panels installed",
        details: "Family requires solar panel installation",
        autoReject: true,
      });
    }

    // Flood zone check (especially for Angle Vale and Gawler River areas)
    if (this.isFloodRiskArea(property.address, property.suburb?.name)) {
      violations.push({
        type: "FLOOD_ZONE",
        severity: "HIGH",
        message: "Property is in a flood risk area",
        details: "Family specifically avoids flood zones, especially around Gawler River",
        autoReject: true,
      });
    }

    // Dog-friendly backyard
    if (FAMILY_REQUIREMENTS.requiresDogFriendly && !property.features?.dogFriendly) {
      violations.push({
        type: "NOT_DOG_FRIENDLY",
        severity: "MEDIUM", 
        message: "Backyard may not be suitable for dogs",
        details: "Family requires dog-friendly outdoor space",
        autoReject: false,
      });
    }

    // Traffic concerns
    if (this.isHeavyTrafficRoad(property.address)) {
      violations.push({
        type: "HEAVY_TRAFFIC",
        severity: "MEDIUM",
        message: "Property is on a busy road",
        details: "Family prefers quieter residential streets",
        autoReject: false,
      });
    }

    // Overhead power lines
    if (property.features?.overheadPowerLines) {
      violations.push({
        type: "OVERHEAD_POWER_LINES",
        severity: "LOW",
        message: "Overhead power lines present", 
        details: "Family prefers to avoid overhead power lines",
        autoReject: false,
      });
    }

    // Warnings for borderline cases
    if (price > FAMILY_REQUIREMENTS.maxBudget * 0.95) {
      warnings.push({
        type: "NEAR_BUDGET_LIMIT",
        message: "Property is close to budget limit",
        details: `At ${((price / FAMILY_REQUIREMENTS.maxBudget) * 100).toFixed(1)}% of maximum budget`,
      });
    }

    return {
      passed: violations.filter(v => v.autoReject).length === 0,
      violations,
      warnings,
    };
  }

  private static isFloodRiskArea(address: string, suburb?: string): boolean {
    const floodRiskAreas = [
      "angle vale",
      "virginia", 
      "edinburgh",
      "salisbury",
      "waterloo corner",
    ];

    const addressLower = address.toLowerCase();
    const suburbLower = suburb?.toLowerCase() || "";

    // Check for flood-prone suburbs
    const isFloodRiskSuburb = floodRiskAreas.some(area => 
      suburbLower.includes(area) || addressLower.includes(area)
    );

    // Check for river proximity keywords
    const riverKeywords = [
      "gawler river",
      "little para river", 
      "torrens river",
      "creek",
      "wetlands",
    ];

    const nearWater = riverKeywords.some(keyword =>
      addressLower.includes(keyword) || suburbLower.includes(keyword)
    );

    return isFloodRiskSuburb || nearWater;
  }

  private static isHeavyTrafficRoad(address: string): boolean {
    const busyRoads = [
      "port wakefield road",
      "salisbury highway", 
      "grand junction road",
      "main north road",
      "bridge road",
      "commercial road",
      "gawler bypass",
    ];

    const addressLower = address.toLowerCase();
    return busyRoads.some(road => addressLower.includes(road));
  }

  static generateRecommendation(result: DealBreakerResult): string {
    if (result.passed) {
      if (result.violations.length === 0 && result.warnings.length === 0) {
        return "✅ Perfect match! This property meets all family requirements.";
      } else if (result.warnings.length > 0) {
        return "⚠️ Good match with minor concerns. Review warnings before proceeding.";
      }
    }

    const highViolations = result.violations.filter(v => v.severity === "HIGH").length;
    const autoRejectViolations = result.violations.filter(v => v.autoReject).length;

    if (autoRejectViolations > 0) {
      return "❌ Not recommended. Property has deal-breaking issues that don't meet family requirements.";
    } else if (highViolations > 0) {
      return "⚠️ Proceed with caution. Property has significant concerns but might be workable.";
    } else {
      return "⚠️ Minor concerns only. Property could work with some compromises.";
    }
  }
}

export const dealBreakerValidator = DealBreakerValidator;
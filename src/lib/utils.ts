import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Property validation helpers
export function isWithinBudget(price: number, budget: number = 900000): boolean {
  return price <= budget;
}

export function hasRequiredFeatures(property: {
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  stories?: number;
  solarPanels?: boolean;
}): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  // Must have 2+ living areas (assuming bedrooms as proxy)
  if (!property.bedrooms || property.bedrooms < 2) {
    missing.push("2+ bedrooms/living areas");
  }
  
  // Must have 2+ bathrooms
  if (!property.bathrooms || property.bathrooms < 2) {
    missing.push("2+ bathrooms");
  }
  
  // Must accommodate 2 cars
  if (!property.carSpaces || property.carSpaces < 2) {
    missing.push("2+ car spaces");
  }
  
  // Must be single story
  if (property.stories && property.stories > 1) {
    missing.push("single story only");
  }
  
  // Must have solar panels
  if (!property.solarPanels) {
    missing.push("solar panels");
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
}
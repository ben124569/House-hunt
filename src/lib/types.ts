// Common type definitions for the House Hunt platform

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface PageProps {
  params: Record<string, string>;
  searchParams: SearchParams;
}

// Property related types
export interface PropertyListing {
  id: string;
  address: string;
  suburb: string;
  price: {
    display: string;
    min?: number;
    max?: number;
  };
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize?: number;
  features: string[];
  images: PropertyImage[];
  agent: {
    name: string;
    agency: string;
    phone?: string;
    email?: string;
  };
}

export interface PropertyImage {
  url: string;
  caption?: string;
  type: 'exterior' | 'interior' | 'floorplan';
}

// Deal breaker validation
export interface DealBreakerCheck {
  isFloodZone: boolean;
  isTwoStory: boolean;
  hasCarAccommodation: boolean;
  hasSolarPanels: boolean;
  isDogFriendly: boolean;
  isMainRoad: boolean;
  hasOverheadPowerLines: boolean;
}

// Suburb intelligence
export interface SuburbData {
  name: string;
  state: string;
  postcode: string;
  demographics: {
    population: number;
    medianAge: number;
    medianIncome: number;
  };
  education: {
    schools: School[];
    catchments: CatchmentZone[];
  };
  safety: {
    crimeRates: CrimeStats;
    trend: 'improving' | 'stable' | 'declining';
  };
  market: {
    medianPrice: {
      house: number;
      unit: number;
    };
    growth: number;
    daysOnMarket: number;
  };
  risks: {
    flood: 'low' | 'medium' | 'high';
    bushfire: 'low' | 'medium' | 'high';
  };
}

export interface School {
  name: string;
  type: 'public' | 'private' | 'catholic';
  rating?: number;
  distance: number;
}

export interface CatchmentZone {
  school: string;
  level: 'primary' | 'secondary';
  inZone: boolean;
}

export interface CrimeStats {
  total: number;
  categories: {
    [category: string]: number;
  };
  ratePerThousand: number;
}

// Market analysis
export interface MarketAnalysis {
  estimatedValue: number;
  listingPrice: number;
  overpricing: number; // percentage
  assessment: 'underpriced' | 'fair' | 'overpriced';
  confidence: number; // 0-100
  comparables: ComparableSale[];
}

export interface ComparableSale {
  address: string;
  saleDate: Date;
  salePrice: number;
  bedrooms: number;
  bathrooms: number;
  landSize?: number;
  distance: number; // km from subject property
}

// Citation system
export interface Citation {
  fact: string;
  source: {
    name: string;
    url: string;
    accessDate: Date;
    reliability: 'official' | 'verified' | 'unverified';
  };
  confidence: number; // 0-100
}

// User preferences
export interface UserPreferences {
  timezone: string | null;
  notifications: boolean;
  currency: string;
  theme?: string;
}

// Navigation and UI
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

// Form types
export interface PropertyFormData {
  url: string;
  notes?: string;
}

export interface SuburbSearchFormData {
  name: string;
  state: string;
  postcode?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
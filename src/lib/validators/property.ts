import { z } from "zod";

export const PropertyStatus = z.enum([
  "researching",
  "interested", 
  "viewing",
  "rejected",
  "purchased",
  "archived"
]);

export const PropertyCreateSchema = z.object({
  address: z.string().min(1, "Address is required"),
  suburb: z.string().min(1, "Suburb is required"),
  postcode: z.string().min(4, "Valid postcode required"),
  listingPrice: z.number().positive("Listing price must be positive"),
  listingUrl: z.string().url("Valid listing URL required"),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().positive().optional(),
  carSpaces: z.number().int().nonnegative().optional(),
  landSize: z.number().positive().optional(),
  buildYear: z.number().int().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
});

export const PropertyUpdateSchema = PropertyCreateSchema.partial().extend({
  id: z.string().cuid(),
  status: PropertyStatus.optional(),
  estimatedPrice: z.number().positive().optional(),
  notes: z.string().optional(),
});

export const PropertySearchSchema = z.object({
  suburb: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  minBedrooms: z.number().int().positive().optional(),
  maxBedrooms: z.number().int().positive().optional(),
  status: PropertyStatus.optional(),
  hasImages: z.boolean().optional(),
  sortBy: z.enum(["price", "bedrooms", "updated", "created"]).default("updated"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  limit: z.number().int().positive().max(50).default(10),
  offset: z.number().int().nonnegative().default(0),
});

export type PropertyCreate = z.infer<typeof PropertyCreateSchema>;
export type PropertyUpdate = z.infer<typeof PropertyUpdateSchema>;
export type PropertySearch = z.infer<typeof PropertySearchSchema>;
export type PropertyStatusType = z.infer<typeof PropertyStatus>;
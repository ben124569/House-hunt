import { z } from "zod";

export const RiskLevel = z.enum(["low", "medium", "high"]);

export const SuburbCreateSchema = z.object({
  name: z.string().min(1, "Suburb name is required"),
  postcode: z.string().min(4, "Valid postcode required"),
  state: z.string().min(2, "State is required").default("SA"),
  medianPrice: z.number().positive().optional(),
  crimeRate: RiskLevel.optional(),
  floodRisk: RiskLevel.optional(),
  trafficRisk: RiskLevel.optional(),
  schoolRating: z.number().min(1).max(10).optional(),
  commuteTimeToAdelaide: z.number().positive().optional(), // minutes
  population: z.number().positive().optional(),
  demographics: z.record(z.unknown()).optional(),
  lastUpdated: z.date().default(() => new Date()),
});

export const SuburbUpdateSchema = SuburbCreateSchema.partial().extend({
  id: z.string().cuid(),
});

export const SuburbSearchSchema = z.object({
  name: z.string().optional(),
  postcode: z.string().optional(),
  maxPrice: z.number().positive().optional(),
  maxCrimeRate: RiskLevel.optional(),
  maxFloodRisk: RiskLevel.optional(),
  minSchoolRating: z.number().min(1).max(10).optional(),
  maxCommuteTime: z.number().positive().optional(),
  sortBy: z.enum(["name", "medianPrice", "crimeRate", "schoolRating", "updated"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  limit: z.number().int().positive().max(50).default(20),
  offset: z.number().int().nonnegative().default(0),
});

export type SuburbCreate = z.infer<typeof SuburbCreateSchema>;
export type SuburbUpdate = z.infer<typeof SuburbUpdateSchema>;  
export type SuburbSearch = z.infer<typeof SuburbSearchSchema>;
export type RiskLevelType = z.infer<typeof RiskLevel>;
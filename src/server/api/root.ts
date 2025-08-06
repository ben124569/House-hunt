import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { propertyRouter } from "~/server/api/routers/property";
import { suburbRouter } from "~/server/api/routers/suburb";
import { notesRouter } from "~/server/api/routers/notes";
import { analysisRouter } from "~/server/api/routers/analysis";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  property: propertyRouter,
  suburb: suburbRouter,
  notes: notesRouter,
  analysis: analysisRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
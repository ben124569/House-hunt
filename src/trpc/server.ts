import "server-only";

import { headers } from "next/headers";
import { cache, type ReactNode } from "react";

import { createCaller, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
    session: await getServerAuthSession(),
  });
});

const caller = createCaller(createContext);

export { caller as api };

// Simple HydrateClient component for now
export function HydrateClient({ children }: { children: ReactNode }) {
  return children;
}
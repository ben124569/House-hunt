import { createClient } from "@supabase/supabase-js";
import { env } from "~/env";

// Create Supabase client for real-time features
export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

// Real-time subscription helpers
export function subscribeToPropertyUpdates(
  callback: (payload: any) => void
) {
  return supabase
    .channel("properties")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Property",
      },
      callback
    )
    .subscribe();
}

export function subscribeToNotes(
  propertyId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`property-notes-${propertyId}`)
    .on(
      "postgres_changes", 
      {
        event: "*",
        schema: "public",
        table: "Note",
        filter: `propertyId=eq.${propertyId}`,
      },
      callback
    )
    .subscribe();
}

// Presence for collaborative features
export function joinPropertySession(propertyId: string, user: { id: string; name: string }) {
  const channel = supabase.channel(`property-${propertyId}`, {
    config: {
      presence: {
        key: user.id,
      },
    },
  });

  channel.on("presence", { event: "sync" }, () => {
    const newState = channel.presenceState();
    console.log("Presence sync:", newState);
  });

  channel.on("presence", { event: "join" }, ({ key, newPresences }) => {
    console.log("User joined:", key, newPresences);
  });

  channel.on("presence", { event: "leave" }, ({ key, leftPresences }) => {
    console.log("User left:", key, leftPresences);
  });

  channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      await channel.track({
        user_id: user.id,
        name: user.name,
        online_at: new Date().toISOString(),
      });
    }
  });

  return channel;
}
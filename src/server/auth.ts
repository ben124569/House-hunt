import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";
import { type UserRole } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      preferences: {
        timezone: string | null;
        notifications: boolean;
        currency: string;
      };
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRole;
    preferences: {
      timezone: string | null;
      notifications: boolean;
      currency: string;
    };
    // ...other properties
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 * Configured for family-based property research platform.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      // Check if we're in placeholder mode
      if (env.DATABASE_URL.includes("placeholder")) {
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            role: 'VIEWER' as UserRole,
            preferences: {
              timezone: null,
              notifications: true,
              currency: 'AUD',
            },
          },
        };
      }

      // Fetch complete user data including preferences
      try {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            role: true,
            preferences: true,
            timezone: true,
          },
        });

        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            role: dbUser?.role ?? 'VIEWER',
            preferences: {
              timezone: dbUser?.timezone ?? null,
              notifications: (dbUser?.preferences as any)?.notifications ?? true,
              currency: (dbUser?.preferences as any)?.currency ?? 'AUD',
            },
          },
        };
      } catch (error) {
        console.warn("Database error in session callback:", error);
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            role: 'VIEWER' as UserRole,
            preferences: {
              timezone: null,
              notifications: true,
              currency: 'AUD',
            },
          },
        };
      }
    },
    signIn: async ({ user, account, profile }) => {
      // In placeholder mode, allow Google sign-ins without database calls
      if (env.DATABASE_URL.includes("placeholder") || env.GOOGLE_CLIENT_ID.includes("placeholder")) {
        return account?.provider === 'google';
      }

      // Custom sign-in logic for family access control
      if (account?.provider === 'google') {
        const email = user.email;
        if (!email) return false;

        try {
          // Check if user is already in the system
          const existingUser = await db.user.findUnique({
            where: { email },
          });

          if (existingUser) {
            // Update last active timestamp
            await db.user.update({
              where: { id: existingUser.id },
              data: { lastActive: new Date() },
            });
            return true;
          }

          // For first-time sign-ins, we'll create the user with VIEWER role
          return true;
        } catch (error) {
          console.warn("Database error in signIn callback:", error);
          return true; // Allow sign-in even if database is down
        }
      }
      return false;
    },
  },
  events: {
    createUser: async ({ user }) => {
      // Skip database operations in placeholder mode
      if (env.DATABASE_URL.includes("placeholder")) {
        return;
      }

      // Set up default preferences for new users
      if (user.id) {
        try {
          await db.user.update({
            where: { id: user.id },
            data: {
              role: 'VIEWER', // Default role for new family members
              preferences: {
                notifications: true,
                currency: 'AUD',
                theme: 'light',
              },
              timezone: 'Australia/Adelaide', // Default to SA timezone
            },
          });
        } catch (error) {
          console.warn("Database error in createUser event:", error);
        }
      }
    },
    signIn: async ({ user }) => {
      // Skip database operations in placeholder mode
      if (env.DATABASE_URL.includes("placeholder")) {
        return;
      }

      // Track sign-in activity
      if (user.id) {
        try {
          await db.activity.create({
            data: {
              type: 'USER_SIGNIN',
              action: 'User signed in',
              userId: user.id,
              metadata: {
                timestamp: new Date(),
                userAgent: 'Web Browser',
              },
            },
          });
        } catch (error) {
          console.warn("Database error in signIn event:", error);
        }
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  adapter: env.DATABASE_URL.includes("placeholder") ? undefined : PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: env.DATABASE_URL.includes("placeholder") ? "jwt" : "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
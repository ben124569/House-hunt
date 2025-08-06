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
      // Fetch complete user data including preferences
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
    },
    signIn: async ({ user, account, profile }) => {
      // Custom sign-in logic for family access control
      if (account?.provider === 'google') {
        const email = user.email;
        if (!email) return false;

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
        // Admin can upgrade roles later through the UI
        return true;
      }
      return false;
    },
  },
  events: {
    createUser: async ({ user }) => {
      // Set up default preferences for new users
      if (user.id) {
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
      }
    },
    signIn: async ({ user }) => {
      // Track sign-in activity
      if (user.id) {
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
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  adapter: PrismaAdapter(db) as Adapter,
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
    strategy: "database",
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
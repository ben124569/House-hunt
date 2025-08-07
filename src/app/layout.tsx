import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { getServerSession } from "next-auth/next";

import { TRPCReactProvider } from "~/trpc/react";
import { authOptions } from "~/server/auth";
import { Navigation } from "~/components/shared/navigation";
import { Providers } from "~/components/providers";

export const metadata: Metadata = {
  title: "House Hunt - Northern Adelaide",
  description: "Property tracker for Northern Adelaide",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-gradient-to-br from-slate-50 to-blue-50">
        <TRPCReactProvider>
          <Providers session={session}>
            <div className="min-h-screen">
              <Navigation session={session} />
              
              <main className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-red-100 to-pink-100 rounded-full opacity-60 blur-3xl"></div>
                  <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-60 blur-3xl"></div>
                </div>
                
                <div className="relative z-10">
                  {children}
                </div>
              </main>

            </div>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
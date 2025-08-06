import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "~/trpc/react";
import { authOptions } from "~/server/auth";
import { Navigation } from "~/components/shared/navigation";

export const metadata: Metadata = {
  title: "House Hunt Platform - Family Property Research",
  description: "Evidence-based house hunting platform for Northern Adelaide suburbs. Professional property research with market analysis, deal-breaker detection, and family collaboration.",
  keywords: "Adelaide property, house hunting, Northern suburbs, property research, market analysis, family collaboration",
  authors: [{ name: "House Hunt Platform" }],
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
          <SessionProvider session={session}>
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

              {/* Footer */}
              <footer className="relative z-10 bg-slate-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🏡</span>
                        <span className="font-bold text-lg">House Hunt Platform</span>
                      </div>
                      <p className="text-slate-400 mt-1">Evidence-based property research for Northern Adelaide</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-400">
                      <div className="flex items-center space-x-1">
                        <span>💰</span>
                        <span>Budget: Under $900k</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📍</span>
                        <span>Focus: Northern Adelaide</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>👨‍👩‍👧‍👦</span>
                        <span>Family Collaboration Platform</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-800 text-center text-sm text-slate-400">
                    <p>© 2025 House Hunt Platform. Built for informed property decisions with comprehensive research and family collaboration.</p>
                  </div>
                </div>
              </footer>
            </div>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
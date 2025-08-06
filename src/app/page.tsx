import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { api, HydrateClient } from "~/trpc/server";
import { authOptions } from "~/server/auth";
import { DashboardStats } from "~/components/dashboard/stats";
import { QuickActions } from "~/components/dashboard/quick-actions";
import { RecentActivity } from "~/components/dashboard/recent-activity";
import { RequirementsOverview } from "~/components/dashboard/requirements-overview";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // If not authenticated, show landing page
  if (!session) {
    return (
      <div className="relative overflow-hidden">
        {/* Hero section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200/50">
                <span className="text-2xl">🏡</span>
                <span className="text-lg font-semibold text-gray-900">House Hunt Platform</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Evidence-Based
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
                House Hunting
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Professional property research platform for Northern Adelaide suburbs. 
              Make informed decisions with comprehensive market analysis, deal-breaker detection, 
              and real-time family collaboration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/auth/signin" 
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link 
                href="#features" 
                className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
              >
                Learn More
              </Link>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="text-3xl font-bold text-red-600 mb-2">$900k</div>
                <div className="text-gray-600 font-medium">Maximum Budget</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="text-3xl font-bold text-blue-600 mb-2">Northern</div>
                <div className="text-gray-600 font-medium">Adelaide Focus</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="text-3xl font-bold text-green-600 mb-2">Family</div>
                <div className="text-gray-600 font-medium">Collaboration</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for serious house hunters who want evidence-based decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Analysis", 
                description: "Automatic property analysis, market comparison, and overpricing detection with confidence scores."
              },
              {
                icon: "🚨",
                title: "Deal-Breaker Detection",
                description: "Instant flagging of flood zones, 2-story properties, and other family-specific requirements."
              },
              {
                icon: "📊", 
                title: "Market Intelligence",
                description: "Comprehensive suburb profiles with crime stats, school data, and growth projections."
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Collaboration",
                description: "Real-time notes, @mentions, and collaborative decision-making tools for the whole family."
              },
              {
                icon: "📚",
                title: "Citation System",
                description: "Every fact backed by verifiable sources with confidence scores and data freshness indicators."
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                description: "Designed for overseas family members with responsive design and real-time updates."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Start House Hunting?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join your family on the platform and start making evidence-based property decisions today.
            </p>
            <Link 
              href="/auth/signin"
              className="bg-white text-red-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-block"
            >
              Sign In with Google
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Authenticated dashboard
  // TODO: Fetch real data when database is populated
  // const properties = await api.property.list({ limit: 5 });
  // const stats = await api.property.getStats();

  return (
    <HydrateClient>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user.name || 'Family Member'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your property research
          </p>
        </div>

        <div className="space-y-8">
          <DashboardStats />
          <QuickActions />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RequirementsOverview />
            <RecentActivity />
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
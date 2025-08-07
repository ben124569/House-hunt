import { HydrateClient } from "~/trpc/server";
import { DashboardStats } from "~/components/dashboard/stats";
import { QuickActions } from "~/components/dashboard/quick-actions";
import { RecentActivity } from "~/components/dashboard/recent-activity";

export default async function HomePage() {
  // Direct to dashboard - no authentication needed
  return (
    <HydrateClient>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Properties Dashboard
          </h1>
          <p className="text-gray-600">
            Northern Adelaide Property Tracker
          </p>
        </div>

        <div className="space-y-8">
          <QuickActions />
          <DashboardStats />
          <RecentActivity />
        </div>
      </div>
    </HydrateClient>
  );
}
import { Suspense } from "react";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  return (
    <div className="space-y-8">
      <Suspense fallback={<PropertyDetailSkeleton />}>
        <PropertyDetail id={params.id} />
      </Suspense>
    </div>
  );
}

async function PropertyDetail({ id }: { id: string }) {
  // Placeholder - will be implemented with database
  // const property = await api.property.getById({ id });
  // if (!property) notFound();

  return (
    <div className="space-y-8">
      {/* Property Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Property Details
        </h1>
        <p className="mt-2 text-gray-600">
          Comprehensive research and analysis for property ID: {id}
        </p>
      </div>

      {/* Property Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Property Information
            </h2>
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🏠</div>
              <p>Property details will appear here once connected to database</p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Market Analysis
            </h2>
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📊</div>
              <p>Price analysis and comparable sales will appear here</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                Schedule Inspection
              </button>
              <button className="w-full btn-secondary">
                Add Note
              </button>
              <button className="w-full btn-secondary">
                Share with Family
              </button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Status
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Status:</span>
                <span className="status-researching">Researching</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Added:</span>
                <span className="text-sm text-gray-900">--</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Updated:</span>
                <span className="text-sm text-gray-900">--</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="card">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
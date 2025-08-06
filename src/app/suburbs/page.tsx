import { Suspense } from "react";
import Link from "next/link";

export default function SuburbsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suburbs</h1>
          <p className="mt-2 text-gray-600">
            Research and intelligence for Northern Adelaide suburbs
          </p>
        </div>
        <button className="btn-primary">
          Research Suburb
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<SuburbListSkeleton />}>
          <SuburbList />
        </Suspense>
      </div>
    </div>
  );
}

function SuburbList() {
  // Placeholder component - will be implemented with database
  const popularSuburbs = [
    "Angle Vale",
    "Smithfield", 
    "Elizabeth",
    "Gawler",
    "Two Wells",
    "Virginia",
    "Craigmore",
    "Munno Para"
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Popular Northern Adelaide Suburbs
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {popularSuburbs.map((suburb) => (
            <Link
              key={suburb}
              href={`/suburbs/${encodeURIComponent(suburb)}`}
              className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-center"
            >
              <div className="font-medium text-gray-900">{suburb}</div>
              <div className="text-sm text-gray-500 mt-1">Not researched</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🏘️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No suburb research yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start researching suburbs to build comprehensive profiles
          </p>
          <button className="btn-primary">
            Research Your First Suburb
          </button>
        </div>
      </div>
    </div>
  );
}

function SuburbListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="p-3 border border-gray-200 rounded-lg">
                <div className="h-5 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
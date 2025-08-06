import { Suspense } from "react";

export default function PropertiesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="mt-2 text-gray-600">
            Manage and research potential properties for purchase
          </p>
        </div>
        <button className="btn-primary">
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<PropertyListSkeleton />}>
          <PropertyList />
        </Suspense>
      </div>
    </div>
  );
}

function PropertyList() {
  // Placeholder component - will be implemented with database
  return (
    <div className="card">
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No properties yet
        </h3>
        <p className="text-gray-600 mb-4">
          Get started by adding a property from realestate.com.au
        </p>
        <button className="btn-primary">
          Add Your First Property
        </button>
      </div>
    </div>
  );
}

function PropertyListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card">
          <div className="animate-pulse">
            <div className="flex space-x-4">
              <div className="w-48 h-32 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
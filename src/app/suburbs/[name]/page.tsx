import { Suspense } from "react";
import { notFound } from "next/navigation";

interface SuburbPageProps {
  params: {
    name: string;
  };
}

export default function SuburbPage({ params }: SuburbPageProps) {
  // Decode the suburb name from URL
  const suburbName = decodeURIComponent(params.name);

  return (
    <div className="space-y-8">
      <Suspense fallback={<SuburbDetailSkeleton suburbName={suburbName} />}>
        <SuburbDetail name={suburbName} />
      </Suspense>
    </div>
  );
}

async function SuburbDetail({ name }: { name: string }) {
  // Placeholder - will be implemented with database
  // const suburb = await api.suburb.getByName({ name });
  // if (!suburb) notFound();

  return (
    <div className="space-y-8">
      {/* Suburb Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {name}
        </h1>
        <p className="mt-2 text-gray-600">
          Comprehensive suburb intelligence and market analysis
        </p>
      </div>

      {/* Suburb Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">--</div>
          <div className="text-sm text-gray-600 mt-1">Median Price</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">--</div>
          <div className="text-sm text-gray-600 mt-1">Crime Rate</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">--</div>
          <div className="text-sm text-gray-600 mt-1">School Rating</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-danger-600">--</div>
          <div className="text-sm text-gray-600 mt-1">Flood Risk</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Demographics & Lifestyle
            </h2>
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📊</div>
              <p>Demographic data will appear here once research is complete</p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Schools & Education
            </h2>
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🎓</div>
              <p>School information and ratings will appear here</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Risk Assessment
            </h2>
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">⚠️</div>
              <p>Risk analysis (flood, crime, traffic) will appear here</p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Market Trends
            </h2>
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📈</div>
              <p>Property market trends and analysis will appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Sales
        </h2>
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🏠</div>
          <p>Recent property sales data will appear here</p>
        </div>
      </div>
    </div>
  );
}

function SuburbDetailSkeleton({ suburbName }: { suburbName: string }) {
  return (
    <div className="space-y-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card">
            <div className="animate-pulse text-center">
              <div className="h-8 bg-gray-300 rounded w-12 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
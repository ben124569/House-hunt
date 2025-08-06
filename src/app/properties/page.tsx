import { Suspense } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";
import { PropertyCard } from "~/components/property/property-card";

export default async function PropertiesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties 🏡</h1>
          <p className="mt-2 text-gray-600">
            Manage and research potential properties for purchase in Northern Adelaide
          </p>
        </div>
        {(session.user.role === "ADMIN" || session.user.role === "EDITOR") && (
          <Link
            href="/properties/add"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <span>🏡</span>
            <span>Add Property</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<PropertyListSkeleton />}>
          <PropertyList />
        </Suspense>
      </div>
    </div>
  );
}

async function PropertyList() {
  // TODO: Replace with real data when database is populated
  // const properties = await api.property.list({ limit: 10 });

  const properties: any[] = []; // Placeholder

  if (properties.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-12">
        <div className="text-center">
          <div className="text-6xl mb-6">🏠</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No properties yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Get started by adding a property from realestate.com.au or domain.com.au.
            Our AI agents will automatically analyze the property and provide comprehensive insights.
          </p>
          <Link
            href="/properties/add"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>🏡</span>
            <span>Add Your First Property</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

function PropertyListSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="animate-pulse">
            <div className="flex space-x-6">
              <div className="w-64 h-48 bg-gray-300 rounded-xl"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-300 rounded-lg w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded-lg w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded-lg w-1/3"></div>
                <div className="flex space-x-4 mt-6">
                  <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
                  <div className="h-10 bg-gray-300 rounded-lg w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
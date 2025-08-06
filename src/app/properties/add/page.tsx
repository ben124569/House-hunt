import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "~/server/auth";
import { AddPropertyForm } from "~/components/property/add-property-form";

export default async function AddPropertyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  // Only allow editors and admins to add properties
  if (session.user.role === "VIEWER") {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Property 🏡
        </h1>
        <p className="text-gray-600">
          Research a property from realestate.com.au or domain.com.au by pasting the URL below.
          Our AI agents will automatically extract property details and provide comprehensive analysis.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
        <AddPropertyForm />
      </div>

      {/* Information section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200/50">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center space-x-2">
            <span>🤖</span>
            <span>Automatic Analysis</span>
          </h3>
          <ul className="text-blue-800 text-sm space-y-2">
            <li>• Property details extraction from listing</li>
            <li>• Suburb intelligence and demographic data</li>
            <li>• Market analysis with comparable sales</li>
            <li>• Deal-breaker detection (flood zones, 2-story, etc.)</li>
            <li>• Price assessment and overpricing alerts</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200/50">
          <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center space-x-2">
            <span>✅</span>
            <span>Family Requirements Check</span>
          </h3>
          <ul className="text-green-800 text-sm space-y-2">
            <li>• Budget: Under $900k asking price</li>
            <li>• Single story properties only</li>
            <li>• 2+ bathrooms and living areas</li>
            <li>• Car accommodation for 2+ cars</li>
            <li>• Dog-friendly backyard required</li>
            <li>• Solar panels installation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
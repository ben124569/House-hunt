"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function AddPropertyForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const createProperty = api.property.create.useMutation({
    onSuccess: (property) => {
      router.push(`/properties/${property.id}`);
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate URL
    if (!url.trim()) {
      setError("Please enter a property URL");
      setIsLoading(false);
      return;
    }

    // Check if URL is from supported sites
    const supportedSites = ["realestate.com.au", "domain.com.au"];
    const isSupported = supportedSites.some(site => url.includes(site));
    
    if (!isSupported) {
      setError("Please use a URL from realestate.com.au or domain.com.au");
      setIsLoading(false);
      return;
    }

    try {
      // Create property from URL with web scraping
      await createProperty.mutateAsync({
        url: url.trim(),
      });
    } catch (err) {
      // Error is handled by onError callback
      console.error("Failed to create property:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          Property URL
        </label>
        <div className="relative">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.realestate.com.au/property/..."
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            required
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-2xl">🔗</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Supported sites: realestate.com.au, domain.com.au
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <span className="text-red-600 text-lg">⚠️</span>
          <div>
            <h4 className="text-red-800 font-medium">Error</h4>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing Property...</span>
            </>
          ) : (
            <>
              <span>🏡</span>
              <span>Add Property</span>
            </>
          )}
        </button>
      </div>

      {/* Help text */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
          <span>💡</span>
          <span>How it works</span>
        </h4>
        <ol className="text-sm text-gray-600 space-y-1 ml-6 list-decimal">
          <li>Paste a property URL from realestate.com.au or domain.com.au</li>
          <li>Our AI agents extract all property details automatically</li>
          <li>We check against your family requirements and deal-breakers</li>
          <li>Suburb research and market analysis are performed</li>
          <li>A comprehensive property report is generated for your family</li>
        </ol>
      </div>
    </form>
  );
}
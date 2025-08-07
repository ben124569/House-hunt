export default function CriteriaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Search Criteria
        </h1>
        <p className="text-gray-600">
          Family requirements for property selection
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Budget */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Budget</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <span className="text-gray-700">Maximum: $900,000</span>
            </div>
          </div>

          {/* Must-Have Features */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Must-Have Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Single story only</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">2+ bathrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">2+ living areas</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">2+ car spaces</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Solar panels installed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Dog-friendly backyard</span>
              </div>
            </div>
          </div>

          {/* Deal Breakers */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Deal Breakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span className="text-gray-700">Flood zones (especially Angle Vale)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span className="text-gray-700">2-story properties</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span className="text-gray-700">No car accommodation</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span className="text-gray-700">Non-dog-friendly yards</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span className="text-gray-700">No solar panels</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span className="text-gray-700">Heavy traffic roads</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span className="text-gray-700">Overhead power lines</span>
              </div>
            </div>
          </div>

          {/* Previous Sale */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Previous house sold for:</span> $823,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
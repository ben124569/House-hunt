export default function GawlerSouthPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gawler South</h1>
            <p className="text-gray-600 mt-1">
              Historic suburb • Town of Gawler
            </p>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
            ✓ Researched
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>📍 42km north of Adelaide</span>
          <span>👥 2,500+ residents (2021)</span>
          <span>🏛️ Heritage area</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Median House Price</span>
                <p className="text-lg font-semibold text-gray-900">$550K - $650K</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Population Growth</span>
                <p className="text-lg font-semibold text-gray-900">Steady growth</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Distance to CBD</span>
                <p className="text-lg font-semibold text-gray-900">42km north</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Character</span>
                <p className="text-lg font-semibold text-gray-900">Heritage suburb</p>
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              👨‍👩‍👧‍👦 Demographics Profile
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Historic character:</strong> One of Gawler's oldest areas</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Established community:</strong> Mix of long-term residents and new families</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Heritage homes:</strong> Many character properties from 1850s-1900s</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Stable population:</strong> Approximately 2,500 residents</span>
              </li>
            </ul>
          </div>

          {/* Location & Transport */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location & Access</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-800">🚂 Public Transport</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Walking distance to Gawler Central Station - direct train service to Adelaide CBD 
                  (approximately 50-55 minutes). Regular bus services through town center.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🛣️ Major Roads</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Access via Main North Road and Murray Street. Close to Sturt Highway 
                  for Barossa Valley access.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🏪 Local Amenities</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Walking distance to Gawler town center with shops, cafes, medical services, 
                  and historic attractions. Gawler Hospital nearby.
                </p>
              </div>
            </div>
          </div>

          {/* Schools & Education */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🎓 Schools & Education</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Gawler Primary School:</strong> Historic school established 1867</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Gawler High School:</strong> Within walking/cycling distance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>St Brigid's Catholic School:</strong> Private option nearby</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Immanuel Lutheran School:</strong> Close proximity</span>
              </li>
            </ul>
          </div>

          {/* Concerns */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Important Considerations</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Flood Risk:</strong> Proximity to South Para River - check specific flood mapping for any property</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Heritage Restrictions:</strong> Some properties have heritage overlays affecting renovations</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Older Housing:</strong> Many homes require renovation or maintenance</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Limited New Development:</strong> Established area with minimal new housing</span>
              </li>
            </ul>
          </div>

          {/* Market Analysis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Market Overview</h2>
            <p className="text-gray-700 mb-3">
              Gawler South offers more affordable entry into the Gawler market compared to newer 
              developments. The suburb attracts buyers interested in character homes and those 
              seeking proximity to Gawler's amenities.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Property Types</p>
                <p className="font-semibold">Character homes, cottages</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Typical Block Size</p>
                <p className="font-semibold">600-1000 sqm</p>
              </div>
            </div>
          </div>

          {/* Historical Context */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Suburb History</h2>
            <p className="text-gray-700 mb-3">
              Gawler South is part of the historic Town of Gawler, established by Colonel William Light 
              in 1839. It was South Australia's first country town and retains much of its heritage 
              character with many buildings from the colonial era.
            </p>
            <p className="text-gray-700">
              The area features tree-lined streets, historic churches, and character homes that 
              reflect its 180+ year history. The South Para River runs along the southern boundary, 
              historically providing water for the early settlement.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Facts</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Postcode</dt>
                <dd className="font-medium text-gray-900">5118</dd>
              </div>
              <div>
                <dt className="text-gray-500">LGA</dt>
                <dd className="font-medium text-gray-900">Town of Gawler</dd>
              </div>
              <div>
                <dt className="text-gray-500">Established</dt>
                <dd className="font-medium text-gray-900">1839</dd>
              </div>
              <div>
                <dt className="text-gray-500">Train to CBD</dt>
                <dd className="font-medium text-gray-900">50-55 minutes</dd>
              </div>
            </dl>
          </div>

          {/* Flood Risk Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="font-semibold text-red-900 mb-2">🚨 Flood Risk Zone</h3>
            <p className="text-sm text-red-800">
              Parts of Gawler South are in flood-prone areas due to the South Para River. 
              Always check specific flood mapping and insurance implications before purchasing.
            </p>
            <a 
              href="https://www.gawler.sa.gov.au/services/flooding"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-600 hover:text-red-800 underline mt-2 inline-block"
            >
              View Gawler flood information →
            </a>
          </div>

          {/* Research Sources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📚 Research Sources</h3>
            <div className="space-y-3 text-sm">
              <div>
                <a 
                  href="https://www.gawler.sa.gov.au" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Town of Gawler
                </a>
                <p className="text-gray-500">Council Information</p>
              </div>
              <div>
                <a 
                  href="https://www.abs.gov.au/census/find-census-data/quickstats/2021/SSC41378" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  2021 Census Data
                </a>
                <p className="text-gray-500">Australian Bureau of Statistics</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Heritage Information</p>
                <p className="text-gray-500">SA Heritage Register</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Market Analysis</p>
                <p className="text-gray-500">2024 Property Data</p>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📊 Quick Comparison</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">vs Gawler East</span>
                <span className="font-medium">More central</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Character</span>
                <span className="font-medium">Historic homes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price Range</span>
                <span className="font-medium">$550-650K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Flood Risk</span>
                <span className="font-medium text-orange-600">Check location</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a 
              href="/suburbs" 
              className="block text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to All Suburbs
            </a>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Search Properties in Gawler South
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          This profile is compiled from Town of Gawler resources, ABS Census 2021 data, 
          SA Heritage Register, and current property market analysis.
        </p>
      </div>
    </div>
  );
}
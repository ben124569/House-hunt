export default function AndrewsFarmPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Andrews Farm</h1>
            <p className="text-gray-600 mt-1">
              Established family suburb • City of Playford
            </p>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
            ✓ Researched
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>📍 29km northeast of Adelaide</span>
          <span>👥 8,699 residents (2021)</span>
          <span>📈 Doubled 2006-2016</span>
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
                <p className="text-lg font-semibold text-gray-900">$450K - $550K</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Population Growth</span>
                <p className="text-lg font-semibold text-gray-900">Doubled 2006-2016</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Young Population</span>
                <p className="text-lg font-semibold text-gray-900">46% under 25 years</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Australian Born</span>
                <p className="text-lg font-semibold text-gray-900">79.8%</p>
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
                <span><strong>Young families:</strong> 46% of population under 25 years</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Multicultural:</strong> Significant diverse population</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Growth:</strong> Population doubled between 2006-2016</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Established:</strong> Founded 1991 (formerly Smithfield West)</span>
              </li>
            </ul>
          </div>

          {/* Location & Transport */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location & Access</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-800">🛣️ Major Roads</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Close to Northern Expressway (west boundary), Curtis Road (north), 
                  Stebonheath Road (east), Petherton Road (south)
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🚗 Distance to CBD</h3>
                <p className="text-gray-600 text-sm mt-1">
                  29km northeast of Adelaide CBD
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🏪 Local Amenities</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Established shopping and services within suburb
                </p>
              </div>
            </div>
          </div>

          {/* Concerns */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Considerations</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Crime Statistics:</strong> Crime rank 21/100 nationally (0=no crime, 100=highest)</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Distance:</strong> Further from coast than some alternatives</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Market:</strong> Research current property availability</span>
              </li>
            </ul>
          </div>

          {/* Historical Context */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Suburb History</h2>
            <p className="text-gray-700 mb-3">
              Andrews Farm was established in 1991, originally known as Smithfield West. 
              The suburb was renamed to create its own identity separate from neighboring Smithfield.
            </p>
            <p className="text-gray-700">
              The area has grown rapidly, with population doubling between 2006 and 2016, 
              making it one of the faster-growing suburbs in the City of Playford.
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
                <dd className="font-medium text-gray-900">5114</dd>
              </div>
              <div>
                <dt className="text-gray-500">LGA</dt>
                <dd className="font-medium text-gray-900">City of Playford</dd>
              </div>
              <div>
                <dt className="text-gray-500">Established</dt>
                <dd className="font-medium text-gray-900">1991</dd>
              </div>
              <div>
                <dt className="text-gray-500">Former Name</dt>
                <dd className="font-medium text-gray-900">Smithfield West</dd>
              </div>
            </dl>
          </div>

          {/* Research Sources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📚 Research Sources</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">Andrews Farm Profile</p>
                <p className="text-gray-500">Agent Vault Research</p>
              </div>
              <div>
                <a 
                  href="https://www.abs.gov.au/census/find-census-data/quickstats/2021/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  2021 Census Data
                </a>
                <p className="text-gray-500">Australian Bureau of Statistics</p>
              </div>
              <div>
                <a 
                  href="https://www.playford.sa.gov.au" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  City of Playford
                </a>
                <p className="text-gray-500">Council Information</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Crime Statistics</p>
                <p className="text-gray-500">2024 National Data</p>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📊 Quick Comparison</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">vs Two Wells</span>
                <span className="font-medium">More established</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price Range</span>
                <span className="font-medium">Lower ($450-550K)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Population</span>
                <span className="font-medium">Larger (8,699)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Demographics</span>
                <span className="font-medium">Younger (46% &lt;25)</span>
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
              Search Properties in Andrews Farm
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          This profile is compiled from agent-vault research, ABS Census 2021 data, 
          and City of Playford information.
        </p>
      </div>
    </div>
  );
}
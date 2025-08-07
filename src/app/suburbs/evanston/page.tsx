export default function EvanstonPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Evanston</h1>
            <p className="text-gray-600 mt-1">
              Growing suburban area • Town of Gawler
            </p>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
            ✓ Researched
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>📍 38km north of Adelaide</span>
          <span>👥 4,000+ residents (combined)</span>
          <span>🏘️ Multiple subdivisions</span>
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
                <p className="text-lg font-semibold text-gray-900">$480K - $580K</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Population Growth</span>
                <p className="text-lg font-semibold text-gray-900">+8% (2016-2021)</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Distance to CBD</span>
                <p className="text-lg font-semibold text-gray-900">38km north</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Character</span>
                <p className="text-lg font-semibold text-gray-900">Mixed suburban</p>
              </div>
            </div>
          </div>

          {/* Area Breakdown */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🗺️ Evanston Subdivisions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Evanston</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Original area, established housing, close to Main North Road
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Evanston Park</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Newer development area with modern homes, family-friendly streets
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Evanston Gardens</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Mid-range development, good mix of housing styles, parks and reserves
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Evanston South</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Southern section, closer to Gawler Belt, mix of rural and suburban
                </p>
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              👨‍👩‍👧‍👦 Demographics Profile
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Family area:</strong> Popular with young families and first home buyers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Diverse housing:</strong> Mix of 1970s-2010s developments</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Steady growth:</strong> +8% population increase 2016-2021</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Combined population:</strong> Over 4,000 across all Evanston areas</span>
              </li>
            </ul>
          </div>

          {/* Location & Transport */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location & Access</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-800">🚗 Road Access</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Excellent access via Main North Road (A20). Direct route to Adelaide CBD 
                  via Northern Expressway. Approximately 40-45 minute drive to city.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🚌 Public Transport</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Bus services available to Gawler Central for train connections. 
                  Limited direct public transport - most residents rely on cars.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🏪 Local Amenities</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Local shops in Evanston Gardens. Gawler town center 5-10 minutes for 
                  major shopping, medical, and services. Trinity College nearby.
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
                <span><strong>Trinity College Gawler:</strong> Major private school (Reception-Year 12)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Gawler & District College B-12:</strong> Evanston Campus available</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Evanston Gardens Primary:</strong> Local public school option</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Multiple childcare centers:</strong> Several early learning options</span>
              </li>
            </ul>
          </div>

          {/* Lifestyle & Recreation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🏞️ Lifestyle & Recreation</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Parks & Reserves:</strong> Multiple local parks and playgrounds</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Sporting Facilities:</strong> Local ovals and sports clubs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Barossa Access:</strong> Gateway to Barossa Valley (20 minutes)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Rural Feel:</strong> Larger blocks available in some areas</span>
              </li>
            </ul>
          </div>

          {/* Considerations */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Important Considerations</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Variable Quality:</strong> Housing quality and amenities vary significantly between subdivisions</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Industrial Proximity:</strong> Some areas near industrial zones - check specific location</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Limited Public Transport:</strong> Most areas require car for commuting</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Research Specific Area:</strong> Each Evanston subdivision has different characteristics</span>
              </li>
            </ul>
          </div>

          {/* Market Analysis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Market Overview</h2>
            <p className="text-gray-700 mb-3">
              Evanston offers affordable entry into the northern suburbs market with variety 
              across its subdivisions. Popular with first home buyers and investors due to 
              competitive pricing and proximity to Gawler amenities.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Best Value</p>
                <p className="font-semibold">Evanston/Evanston South</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Family Choice</p>
                <p className="font-semibold">Evanston Park/Gardens</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Typical Block</p>
                <p className="font-semibold">500-700 sqm</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Investment Yield</p>
                <p className="font-semibold">4.5-5.5%</p>
              </div>
            </div>
          </div>

          {/* Development History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Development Timeline</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="font-semibold mr-2">1970s-80s:</span>
                <span>Original Evanston established as residential area</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold mr-2">1990s:</span>
                <span>Evanston Gardens developed with modern suburban planning</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold mr-2">2000s:</span>
                <span>Evanston Park created as premium family subdivision</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold mr-2">2010s:</span>
                <span>Continued infill development and infrastructure improvements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Facts</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Postcodes</dt>
                <dd className="font-medium text-gray-900">5116 (most areas)</dd>
              </div>
              <div>
                <dt className="text-gray-500">LGA</dt>
                <dd className="font-medium text-gray-900">Town of Gawler</dd>
              </div>
              <div>
                <dt className="text-gray-500">Established</dt>
                <dd className="font-medium text-gray-900">1970s onwards</dd>
              </div>
              <div>
                <dt className="text-gray-500">Drive to CBD</dt>
                <dd className="font-medium text-gray-900">40-45 minutes</dd>
              </div>
            </dl>
          </div>

          {/* Area Selection Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">📍 Choosing Your Area</h3>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium text-gray-900">Budget Option</p>
                <p className="text-gray-600">Evanston/Evanston South</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Family Focus</p>
                <p className="text-gray-600">Evanston Park</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Balanced Choice</p>
                <p className="text-gray-600">Evanston Gardens</p>
              </div>
            </div>
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
                  href="https://www.trinitygawler.sa.edu.au" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Trinity College
                </a>
                <p className="text-gray-500">Major Local School</p>
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
                <span className="text-gray-600">vs Munno Para</span>
                <span className="font-medium">Less train access</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">vs Gawler East</span>
                <span className="font-medium">More affordable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price Range</span>
                <span className="font-medium">$480-580K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best For</span>
                <span className="font-medium">First homes</span>
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
              Search Properties in Evanston
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          This profile is compiled from Town of Gawler resources, ABS Census 2021 data, 
          local school information, and current property market analysis.
        </p>
      </div>
    </div>
  );
}
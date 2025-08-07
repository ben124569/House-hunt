export default function TwoWellsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Two Wells</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive suburb analysis • Northern growth corridor
            </p>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
            ✓ Fully Researched
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>📍 41km north of Adelaide</span>
          <span>👥 3,636 residents (2021)</span>
          <span>📈 +26.7% growth (2016-2021)</span>
        </div>
      </div>

      {/* Strategic Recommendation Box */}
      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-green-900 mb-2">
          Strategic Recommendation: BUY/INVESTIGATE
        </h2>
        <p className="text-green-800">
          <strong>Confidence Level: High (8.5/10)</strong>
        </p>
        <p className="text-green-700 mt-2">
          Compelling growth opportunity with infrastructure catalyst. Property sits at intersection 
          of rapid demographic growth, major infrastructure investment ($150M town centre), and 
          strategic regional positioning.
        </p>
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
                <p className="text-lg font-semibold text-gray-900">$810K - $1.07M</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Median Household Income</span>
                <p className="text-lg font-semibold text-gray-900">$1,932/week</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Family Households</span>
                <p className="text-lg font-semibold text-gray-900">47% couples with children</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Home Ownership</span>
                <p className="text-lg font-semibold text-gray-900">87% ownership rate</p>
              </div>
            </div>
          </div>

          {/* Major Development */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🏗️ $150M Two Wells Town Centre Development
            </h2>
            <p className="text-gray-700 mb-4">
              Transformational infrastructure investment by Leyton Property bringing major amenities:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Full-line supermarket (eliminating Gawler shopping dependency)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Two-storey medical facility addressing healthcare gap</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>6,000+ sqm specialty retail</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Community services hub</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <a 
                href="https://twowellstowncentre.com.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Town Centre Development Website →
              </a>
            </div>
          </div>

          {/* Growth Factors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Growth Drivers</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-800">🏘️ 43,800 New Homes Planned</h3>
                <p className="text-gray-600 text-sm mt-1">
                  SA Government EFPA land release for Two Wells-Roseworthy region
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🚗 Transport Infrastructure</h3>
                <p className="text-gray-600 text-sm mt-1">
                  On Old Port Wakefield Road. Railway line is freight-only (no passenger service)
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">🏫 Education</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Two Wells Primary School established, secondary options in planning
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">👮 Safety Investment</h3>
                <p className="text-gray-600 text-sm mt-1">
                  SA Police boosting presence in region
                </p>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Risk Considerations</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Current amenity limitations:</strong> Limited shopping, reliance on Gawler</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Development timeline risk:</strong> Town centre completion dates critical</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Construction quality:</strong> Verify build standards for newer properties</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Market timing:</strong> Need to align with infrastructure milestones</span>
              </li>
            </ul>
          </div>

          {/* Historical Context */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Historical Context</h2>
            <p className="text-gray-700 mb-3">
              <strong>Aboriginal Name:</strong> Murlayaki (Kaurna language)
            </p>
            <p className="text-gray-700 mb-3">
              Two Wells was named after two natural water wells discovered in the 1850s. 
              The town developed as an agricultural service centre and railway stop.
            </p>
            <p className="text-gray-700">
              The historic wells are preserved as monuments, with one visible from Old Port 
              Wakefield Road near the Uniting Church.
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
                <dd className="font-medium text-gray-900">5501</dd>
              </div>
              <div>
                <dt className="text-gray-500">LGA</dt>
                <dd className="font-medium text-gray-900">Adelaide Plains Council</dd>
              </div>
              <div>
                <dt className="text-gray-500">State Electorate</dt>
                <dd className="font-medium text-gray-900">Taylor</dd>
              </div>
              <div>
                <dt className="text-gray-500">Federal Division</dt>
                <dd className="font-medium text-gray-900">Grey</dd>
              </div>
            </dl>
          </div>

          {/* Research Sources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📚 Research Sources</h3>
            <div className="space-y-3 text-sm">
              <div>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Strategic Analysis Report
                </a>
                <p className="text-gray-500">Aug 2025 • Agent Vault</p>
              </div>
              <div>
                <a 
                  href="https://www.abs.gov.au/census/find-census-data/quickstats/2021/SSC42399" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ABS 2021 Census Data
                </a>
                <p className="text-gray-500">Australian Bureau of Statistics</p>
              </div>
              <div>
                <a 
                  href="https://www.apc.sa.gov.au" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Adelaide Plains Council
                </a>
                <p className="text-gray-500">Growth Planning Strategy</p>
              </div>
              <div>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  SA Gov EFPA Land Release
                </a>
                <p className="text-gray-500">43,800 homes plan</p>
              </div>
              <div>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Market Analysis Report
                </a>
                <p className="text-gray-500">Development Landscape</p>
              </div>
            </div>
          </div>

          {/* Property Example */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📊 Recent Analysis</h3>
            <div className="text-sm">
              <p className="font-medium text-gray-900 mb-2">3 Jasmine Drive, Two Wells</p>
              <div className="space-y-2 text-gray-600">
                <p>• 2021 built: $189,500</p>
                <p>• 2025 estimate: $810K-$1.07M</p>
                <p>• Growth: 250-350%</p>
                <p>• 4 bed, 2 bath, 900m² block</p>
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
              Search Properties in Two Wells
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          This analysis is based on comprehensive research from your agent-vault, including 
          strategic reports, government data, and market analysis conducted in August 2025.
        </p>
      </div>
    </div>
  );
}
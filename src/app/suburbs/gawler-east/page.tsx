export default function GawlerEastPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gawler East</h1>
            <p className="text-gray-600 mt-1">
              Expanding suburb • Close to Gawler town centre
            </p>
          </div>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
            Partial Research
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>📍 40km north of Adelaide</span>
          <span>📈 Rapid expansion</span>
          <span>💰 $600K-$750K median</span>
        </div>
      </div>

      {/* Limited Data Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          📊 Limited Research Available
        </h2>
        <p className="text-gray-700">
          Preliminary research only. Further investigation recommended before making decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Available Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Median House Price</span>
                <p className="text-lg font-semibold text-gray-900">$600K - $750K</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Distance from CBD</span>
                <p className="text-lg font-semibold text-gray-900">40km north</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Growth Status</span>
                <p className="text-lg font-semibold text-gray-900">Rapid expansion</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Town Access</span>
                <p className="text-lg font-semibold text-gray-900">Close to Gawler centre</p>
              </div>
            </div>
          </div>

          {/* Known Highlights */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">✓ Known Advantages</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Close proximity to Gawler town centre amenities</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Established schools nearby</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Good transport links to Adelaide</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Growing area with new developments</span>
              </li>
            </ul>
          </div>

          {/* Considerations */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Considerations</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span>Higher prices than outer suburbs ($600K-$750K range)</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span>May be approaching upper budget limit</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span>Competition from other buyers due to location</span>
              </li>
            </ul>
          </div>

          {/* Research Needed */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 Further Research Needed</h2>
            <p className="text-gray-700 mb-3">
              To make an informed decision about Gawler East, research the following:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">□</span>
                <span>Current population and demographic data</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">□</span>
                <span>Crime statistics and safety ratings</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">□</span>
                <span>Specific school catchment zones</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">□</span>
                <span>Development plans and future infrastructure</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">□</span>
                <span>Flood risk assessment (check if near Gawler River)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">□</span>
                <span>Public transport options and frequency</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Available Facts</h3>
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
                <dt className="text-gray-500">Region</dt>
                <dd className="font-medium text-gray-900">Outer North</dd>
              </div>
              <div>
                <dt className="text-gray-500">Research Status</dt>
                <dd className="font-medium text-yellow-600">Incomplete</dd>
              </div>
            </dl>
          </div>

          {/* Comparison */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📊 Quick Comparison</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">vs Two Wells</span>
                <span className="font-medium">More expensive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">vs Andrews Farm</span>
                <span className="font-medium">Better location</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amenities</span>
                <span className="font-medium">Better access</span>
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
                <p className="text-gray-500">Council information</p>
              </div>
              <div>
                <a 
                  href="https://www.realestate.com.au/neighbourhoods/gawler-east-5118-sa" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Market Data
                </a>
                <p className="text-gray-500">Current listings</p>
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
            <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Research This Suburb
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
        <p>
          Limited research available. Conduct thorough investigation before making property decisions.
        </p>
      </div>
    </div>
  );
}
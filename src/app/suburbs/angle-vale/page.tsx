export default function AngleValePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Angle Vale</h1>
            <p className="text-gray-600 mt-1">
              Rural lifestyle area • Northern Adelaide
            </p>
          </div>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
            ⚠️ CHECK LOCATION
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>📍 35km north of Adelaide</span>
          <span>👥 Small rural population</span>
          <span>⚠️ Flood zone area</span>
        </div>
      </div>

      {/* Updated Warning Box */}
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <span className="text-3xl mr-4">⚠️</span>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-yellow-900 mb-2">
              IMPORTANT: Variable Flood Risk by Location
            </h2>
            <p className="text-yellow-800 font-semibold mb-3">
              Not all of Angle Vale is in the flood zone - risk varies significantly by specific location.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-3 rounded border border-red-200">
                <h3 className="font-bold text-red-900 mb-2">❌ High Risk Areas</h3>
                <ul className="space-y-1 text-sm text-red-700">
                  <li>• Properties near Gawler River (within 500m)</li>
                  <li>• Heaslip Road area (historic bridge)</li>
                  <li>• Central low-lying areas (below 35m elevation)</li>
                  <li>• Areas flooded in 2016 event</li>
                </ul>
              </div>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h3 className="font-bold text-green-900 mb-2">✓ Potentially Safer Areas</h3>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Eastern higher ground (37m+ elevation)</li>
                  <li>• Northern areas toward Two Wells</li>
                  <li>• Max Fatchen Drive area</li>
                  <li>• Properties unaffected in 2016</li>
                </ul>
              </div>
            </div>
          </div>
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
                <p className="text-lg font-semibold text-gray-900">$650K - $800K</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Population</span>
                <p className="text-lg font-semibold text-gray-900">Small rural</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Growth Rate</span>
                <p className="text-lg font-semibold text-gray-900">Moderate</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Property Type</span>
                <p className="text-lg font-semibold text-gray-900">Rural lifestyle blocks</p>
              </div>
            </div>
          </div>

          {/* How to Check Specific Properties */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🔍 How to Check if a Specific Property is Safe
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">1. SA WaterConnect Flood Map</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Official government flood awareness mapping tool
                </p>
                <a 
                  href="https://www.waterconnect.sa.gov.au/Systems/FAM/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Check WaterConnect Flood Map →
                </a>
                <p className="text-gray-600 text-xs mt-1">
                  Note: "No study data" doesn't mean no risk
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">2. Check Property Details</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• <strong>Elevation:</strong> Look for 37m+ above sea level</li>
                  <li>• <strong>Distance:</strong> Should be 500m+ from Gawler River</li>
                  <li>• <strong>2016 Flood:</strong> Ask if property was affected</li>
                  <li>• <strong>Insurance:</strong> Get multiple quotes to gauge risk</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">3. Recent Sales Confidence</h3>
                <p className="text-gray-700 text-sm">
                  Max Fatchen Drive saw a $1.03M sale recently, suggesting some areas 
                  have buyer confidence despite suburb reputation.
                </p>
              </div>
            </div>
          </div>

          {/* Updated Flood Risk Details */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📊 2016 Flood Event Facts
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>Date:</strong> September 28, 2016<br/>
                <strong>Impact:</strong> 80 homes flooded region-wide<br/>
                <strong>Damage:</strong> $51+ million in agricultural losses<br/>
                <strong>Angle Vale:</strong> Some areas affected, others unaffected
              </p>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Historic Bridge Collapse</h3>
                <p className="text-gray-700 text-sm">
                  The historic Angle Vale Bridge on Heaslip Road collapsed in 2023 due to 
                  flooding, indicating ongoing risk in that specific area.
                </p>
              </div>
            </div>
          </div>

          {/* Other Concerns */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Considerations</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Limited infrastructure:</strong> Rural area with fewer amenities</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Distance to services:</strong> Further from schools, shops, medical</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Public transport:</strong> Limited or no public transport options</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Internet/utilities:</strong> May have limited service options</span>
              </li>
            </ul>
          </div>

          {/* Positive Aspects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Positive Aspects</h2>
            <p className="text-gray-600 mb-3">
              While Angle Vale doesn't meet family requirements due to flood risk, 
              it does offer:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Rural lifestyle with larger blocks</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Lower density, quieter living</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Country atmosphere close to Adelaide</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Space for horses and rural activities</span>
              </li>
            </ul>
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
                <dd className="font-medium text-gray-900">5117</dd>
              </div>
              <div>
                <dt className="text-gray-500">LGA</dt>
                <dd className="font-medium text-gray-900">Adelaide Plains Council</dd>
              </div>
              <div>
                <dt className="text-gray-500">Risk Status</dt>
                <dd className="font-bold text-red-600">HIGH FLOOD RISK</dd>
              </div>
              <div>
                <dt className="text-gray-500">Recommendation</dt>
                <dd className="font-bold text-red-600">DO NOT BUY</dd>
              </div>
            </dl>
          </div>

          {/* Alternative Suburbs */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">✅ Consider Instead</h3>
            <div className="space-y-3 text-sm">
              <div>
                <a href="/suburbs/two-wells" className="text-blue-600 hover:text-blue-800 font-medium">
                  Two Wells
                </a>
                <p className="text-gray-600">Growth corridor, no flood risk</p>
              </div>
              <div>
                <a href="/suburbs/andrews-farm" className="text-blue-600 hover:text-blue-800 font-medium">
                  Andrews Farm
                </a>
                <p className="text-gray-600">Established, affordable</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Munno Para</p>
                <p className="text-gray-600">Similar distance, safer</p>
              </div>
            </div>
          </div>

          {/* Research Sources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📚 Key Resources</h3>
            <div className="space-y-3 text-sm">
              <div>
                <a 
                  href="https://www.apc.sa.gov.au/flood-information" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Adelaide Plains Flood Maps
                </a>
                <p className="text-gray-500">Official flood risk data</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Insurance Council</p>
                <p className="text-gray-500">Flood insurance guidance</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Gawler River History</p>
                <p className="text-gray-500">Historical flood events</p>
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
            <button 
              disabled
              className="w-full bg-red-100 text-red-400 px-4 py-2 rounded-lg cursor-not-allowed"
            >
              ❌ Not Recommended
            </button>
          </div>
        </div>
      </div>

      {/* Footer Warning */}
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-800 font-semibold">
          ⚠️ This suburb does not meet family requirements due to flood zone designation
        </p>
      </div>
    </div>
  );
}
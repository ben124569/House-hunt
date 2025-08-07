export default function MunnoParaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">✅</div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">STRONG OPTION</h3>
              <p className="mt-1 text-sm text-green-700">
                Affordable established suburb with excellent transport links
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">Munno Para</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-600">Median House Price:</dt>
                <dd className="font-medium">$500,000 - $600,000</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Distance to CBD:</dt>
                <dd className="font-medium">34km north</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Population:</dt>
                <dd className="font-medium">~4,500</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Crime Rate:</dt>
                <dd className="font-medium text-yellow-600">Medium</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Flood Risk:</dt>
                <dd className="font-medium text-green-600">Very Low</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Family Suitability</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Affordable family homes under $700k</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Excellent train connectivity</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Good block sizes (500-700m²)</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Close to Munno Para Shopping City</span>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-500 mr-2">⚠</span>
                <span>Mixed housing quality (inspect carefully)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">🚂 Transport Excellence</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Public Transport</h3>
              <ul className="space-y-1 text-sm">
                <li>• Munno Para Station on-site</li>
                <li>• 45-50 min to Adelaide CBD</li>
                <li>• Park & Ride facilities</li>
                <li>• Multiple bus routes</li>
                <li>• Future electrification planned</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Road Network</h3>
              <ul className="space-y-1 text-sm">
                <li>• Main North Road access</li>
                <li>• Northern Expressway nearby</li>
                <li>• 30-35 min drive to CBD</li>
                <li>• Curtis Road shopping precinct</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold">Primary Schools</h3>
                <ul className="text-sm space-y-1 mt-1">
                  <li>• Munno Para Primary School</li>
                  <li>• Swallowcliffe School (P-7)</li>
                  <li>• Blakeview Primary (2km)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Secondary Schools</h3>
                <ul className="text-sm space-y-1 mt-1">
                  <li>• Mark Oliphant College (3km)</li>
                  <li>• Craigmore High School (3km)</li>
                  <li>• Trinity College Blakeview (5km)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Shopping & Amenities</h2>
            <div className="space-y-3">
              <ul className="text-sm space-y-1">
                <li>• Munno Para Shopping City (Coles, Woolworths)</li>
                <li>• Playford Alive Town Centre (2km)</li>
                <li>• Elizabeth City Centre (5km)</li>
                <li>• Medical centres and pharmacies</li>
                <li>• Multiple parks and reserves</li>
                <li>• Aquadome Recreation Centre (3km)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">⚠️ Important Considerations</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Higher crime rate than Gawler East/Two Wells (check specific streets)</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Some areas have social housing concentration</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Varied property conditions - thorough inspections essential</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Check specific street reputation before buying</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">💰 Value Opportunities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Best Streets/Areas</h3>
              <ul className="space-y-1 text-sm">
                <li>• Eastern side near Blakeview</li>
                <li>• Newer developments off Adams Road</li>
                <li>• Properties backing onto reserves</li>
                <li>• Cul-de-sacs off main roads</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Investment Potential</h3>
              <ul className="space-y-1 text-sm">
                <li>• Strong rental demand</li>
                <li>• 5-6% rental yields</li>
                <li>• Below median pricing</li>
                <li>• Infrastructure improvements coming</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-400 pl-4">
              <p className="font-medium">4 Bedroom, 2 Bath, 600m²</p>
              <p className="text-sm text-gray-600">Sold: $585,000 (Nov 2024)</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <p className="font-medium">3 Bedroom, 1 Bath, 550m²</p>
              <p className="text-sm text-gray-600">Sold: $510,000 (Oct 2024)</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <p className="font-medium">4 Bedroom, 2 Bath, Solar</p>
              <p className="text-sm text-gray-600">Sold: $625,000 (Sep 2024)</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Research Sources:</strong> SA Crime Statistics, CoreLogic, Domain.com.au,
            City of Playford Planning Portal, Adelaide Metro
          </p>
        </div>
      </div>
    </div>
  );
}
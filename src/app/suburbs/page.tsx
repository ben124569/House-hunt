export default function SuburbsPage() {
  const suburbs = [
    {
      name: "Two Wells",
      status: "researched",
      keyStats: {
        population: "3,636 (2021)",
        growth: "+26.7% (2016-2021)",
        medianPrice: "$810K-$1.07M",
        distance: "41km north of Adelaide",
      },
      highlights: [
        "$150M Town Centre Development underway",
        "43,800 new homes planned in region",
        "New medical centre and supermarket coming",
        "Strong family demographics (47% couples with children)",
      ],
      concerns: [
        "Limited current amenities",
        "Reliance on Gawler for shopping",
        "No passenger train service (freight only)",
        "Development timeline risks",
      ],
    },
    {
      name: "Munno Para",
      status: "researched",
      keyStats: {
        population: "4,719 (2021)",
        growth: "+26.4% (2016-2021)",
        medianPrice: "$590K",
        distance: "26 miles from Adelaide",
      },
      highlights: [
        "Excellent train connection (46 min to CBD)",
        "Exceptional growth 20.47% annually",
        "$33M+ infrastructure investment",
        "More affordable than Angle Vale",
      ],
      concerns: [
        "Higher crime rates than average",
        "Limited local amenities",
        "Moderate flood risk (Gawler catchment)",
        "Rapid growth straining services",
      ],
    },
    {
      name: "Gawler East",
      status: "researched",
      keyStats: {
        population: "5,689 (2021)",
        growth: "+12.7% (2011-2016)",
        medianPrice: "$521K",
        distance: "40-44km from Adelaide",
      },
      highlights: [
        "Gateway to Barossa Valley",
        "Train service to CBD (55 min)",
        "10,000 new homes planned (Concordia)",
        "Established schools and shopping",
      ],
      concerns: [
        "⚠️ HIGH FLOOD RISK - Gawler River convergence",
        "2016 major flood event area",
        "Longer commute to CBD",
        "Aging demographics (median 46)",
      ],
    },
    {
      name: "Smithfield",
      status: "researched",
      keyStats: {
        population: "Data pending",
        growth: "+2.3% annually",
        medianPrice: "$536K",
        distance: "42 min train to CBD",
      },
      highlights: [
        "Strong growth 19.1% annually",
        "Direct train connection",
        "Fast sales (17 days on market)",
        "Good rental yields 4.8%",
      ],
      concerns: [
        "⚠️ FLOOD RISK - Gawler River catchment",
        "High unemployment 11.9%",
        "Industrial noise concerns",
        "Limited local services",
      ],
    },
    {
      name: "Andrews Farm",
      status: "researched",
      keyStats: {
        population: "8,699 (2021)",
        growth: "Doubled 2006-2016",
        medianPrice: "$450K-$550K",
        distance: "29km northeast of Adelaide",
      },
      highlights: [
        "Younger demographic (46% under 25)",
        "Near Northern Expressway",
        "Established since 1991",
        "Part of City of Playford",
      ],
      concerns: [
        "Crime rank: 21/100 nationally",
        "Further from coast",
      ],
    },
    {
      name: "Angle Vale",
      status: "partial",
      keyStats: {
        population: "Small rural",
        growth: "Moderate",
        medianPrice: "$695K",
        distance: "35km north of Adelaide",
      },
      highlights: [
        "Rural lifestyle blocks",
        "Some areas on higher ground (37m+)",
        "Eastern areas potentially safer",
        "Recent $1.03M sale shows confidence",
      ],
      concerns: [
        "⚠️ VARIABLE FLOOD RISK - check specific location",
        "Properties near river are high risk",
        "Heaslip Road area had bridge collapse",
        "Must verify elevation and 2016 impact",
      ],
    },
    {
      name: "Gawler South",
      status: "researched",
      keyStats: {
        population: "2,500+ (2021)",
        growth: "Steady",
        medianPrice: "$550K-$650K",
        distance: "42km north of Adelaide",
      },
      highlights: [
        "Historic area with heritage character",
        "Walking distance to Gawler town center",
        "Close to Gawler train station",
        "Established schools and services nearby",
      ],
      concerns: [
        "⚠️ FLOOD RISK - South Para River proximity",
        "Older housing stock may need renovation",
        "Limited new development opportunities",
        "Check specific flood mapping for location",
      ],
    },
    {
      name: "Evanston",
      status: "researched",
      keyStats: {
        population: "Combined 4,000+ (all areas)",
        growth: "+8% (2016-2021)",
        medianPrice: "$480K-$580K",
        distance: "38km north of Adelaide",
      },
      highlights: [
        "Multiple areas (Park, Gardens, South)",
        "Good access via Main North Road",
        "Mix of established and newer homes",
        "Trinity College Gawler nearby",
      ],
      concerns: [
        "Varies significantly by specific area",
        "Some industrial zones nearby",
        "Check transport options by location",
        "Research specific Evanston subdivision",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Suburb Research
        </h1>
        <p className="text-gray-600">
          Northern Adelaide suburbs analysis - updated with AI agent research
        </p>
      </div>

      {/* Flood Risk Warning */}
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">🚨</span>
          <div>
            <h2 className="font-bold text-red-900 mb-1">Critical Flood Risk Areas</h2>
            <p className="text-red-800 text-sm">
              <strong>Gawler East, Smithfield, and Angle Vale</strong> all have significant flood risks 
              from the Gawler River. These suburbs experienced major flooding in 2016. 
              Check flood maps and insurance implications before considering any properties in these areas.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {suburbs.map((suburb) => (
          <a
            key={suburb.name}
            href={`/suburbs/${suburb.name.toLowerCase().replace(' ', '-')}`}
            className={`bg-white rounded-lg shadow-sm border ${
              suburb.status === "warning" || 
              (suburb.concerns && suburb.concerns.some(c => c.includes("HIGH FLOOD RISK")))
                ? "border-red-300 bg-red-50"
                : "border-gray-200"
            } p-6 block hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {suburb.name}
                </h2>
                <div className="flex items-center mt-1">
                  {suburb.status === "researched" && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      ✓ Fully Researched
                    </span>
                  )}
                  {suburb.status === "partial" && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Partial Data
                    </span>
                  )}
                  {suburb.status === "warning" && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-semibold">
                      ⚠️ Deal Breaker
                    </span>
                  )}
                  {suburb.concerns && suburb.concerns.some(c => c.includes("HIGH FLOOD RISK")) && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-semibold ml-2">
                      ⚠️ Flood Risk
                    </span>
                  )}
                </div>
              </div>
              <span className="text-2xl">📍</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div>
                <span className="text-gray-500">Population:</span>
                <div className="font-medium text-gray-900">
                  {suburb.keyStats.population}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Growth:</span>
                <div className="font-medium text-gray-900">
                  {suburb.keyStats.growth}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Median Price:</span>
                <div className="font-medium text-gray-900">
                  {suburb.keyStats.medianPrice}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Distance:</span>
                <div className="font-medium text-gray-900">
                  {suburb.keyStats.distance}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Highlights
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {suburb.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-1">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {suburb.concerns.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Concerns
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {suburb.concerns.map((concern, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start ${
                          concern.includes("FLOOD") ? "text-red-600 font-semibold" : ""
                        }`}
                      >
                        <span className="text-red-500 mr-1">•</span>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* Summary Recommendations */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            ✅ Best Options (No Flood Risk)
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Two Wells</strong> - Growth potential, major development, no flood risk
              <p className="text-gray-600">Price: $810K-$1.07M | Growth: Strong</p>
            </div>
            <div>
              <strong>Munno Para</strong> - Affordable, great train access, moderate flood risk only
              <p className="text-gray-600">Price: $590K | Growth: 20.47% annually</p>
            </div>
            <div>
              <strong>Andrews Farm</strong> - Established, affordable, no flood concerns
              <p className="text-gray-600">Price: $450-550K | Young families area</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            ⚠️ Requires Careful Assessment
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Angle Vale</strong> - Variable flood risk by location
              <p className="text-gray-600">Eastern/higher areas may be safe - check specific address</p>
            </div>
            <div>
              <strong>Gawler East</strong> - River convergence zone, 2016 flood area
              <p className="text-gray-600">Despite good amenities, flood risk too high</p>
            </div>
            <div>
              <strong>Smithfield</strong> - Gawler catchment, employment concerns
              <p className="text-gray-600">Flood risk + high unemployment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Research Sources
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          Updated August 7, 2025 using AI agent research combining:
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• ABS 2021 Census data</li>
          <li>• SA Police crime statistics</li>
          <li>• Current property market data (CoreLogic/PropertyValue)</li>
          <li>• Adelaide Plains Council & City of Playford plans</li>
          <li>• SA Government flood mapping & mitigation reports</li>
          <li>• Adelaide Metro transport schedules</li>
          <li>• Agent-vault comprehensive analysis reports</li>
        </ul>
      </div>
    </div>
  );
}
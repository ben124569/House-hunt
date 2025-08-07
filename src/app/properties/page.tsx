import Link from "next/link";

export default function PropertiesPage() {
  // Example properties based on research
  const properties = [
    {
      id: "1",
      address: "3 Jasmine Drive, Two Wells",
      suburb: "Two Wells",
      price: "$810,000 - $890,000",
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 2,
      landSize: "900m²",
      status: "interested",
      image: "🏡",
      highlights: [
        "2021 built modern home",
        "Solar panels installed",
        "Large 900m² block",
        "Close to future town centre"
      ],
      concerns: [
        "No current shopping nearby",
        "Relies on car transport"
      ],
      dealBreakers: [],
      notes: "Strong growth potential with town centre development"
    },
    {
      id: "2",
      address: "45 Example Street, Munno Para",
      suburb: "Munno Para",
      price: "$550,000 - $590,000",
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      landSize: "450m²",
      status: "researching",
      image: "🏠",
      highlights: [
        "Near train station",
        "Affordable price point",
        "Modern kitchen renovation",
        "Established neighborhood"
      ],
      concerns: [
        "Higher crime area",
        "Smaller block size"
      ],
      dealBreakers: [],
      notes: "Good starter option with train access"
    },
    {
      id: "3",
      address: "12 Heritage Lane, Andrews Farm",
      suburb: "Andrews Farm",
      price: "$480,000 - $520,000",
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 2,
      landSize: "600m²",
      status: "interested",
      image: "🏘️",
      highlights: [
        "Family-friendly area",
        "Near schools",
        "Well under budget",
        "Established gardens"
      ],
      concerns: [
        "Needs some updates",
        "No solar panels"
      ],
      dealBreakers: [],
      notes: "Great value in established suburb"
    },
    {
      id: "4",
      address: "78 River View Road, Angle Vale",
      suburb: "Angle Vale",
      price: "$720,000 - $780,000",
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 3,
      landSize: "2000m²",
      status: "rejected",
      image: "🚫",
      highlights: [
        "Large rural block",
        "Room for horses",
        "Triple garage"
      ],
      concerns: [
        "Near Gawler River (200m)",
        "Limited amenities"
      ],
      dealBreakers: [
        "HIGH FLOOD RISK - Too close to river",
        "Insurance issues likely"
      ],
      notes: "Beautiful property but flood risk is a deal breaker"
    },
    {
      id: "5",
      address: "23 Hilltop Drive, Angle Vale",
      suburb: "Angle Vale",
      price: "$695,000 - $750,000",
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 2,
      landSize: "1500m²",
      status: "researching",
      image: "🔍",
      highlights: [
        "Eastern higher ground (38m elevation)",
        "Solar panels installed",
        "Not affected in 2016 floods",
        "Large workshop"
      ],
      concerns: [
        "Need to verify flood maps",
        "Rural location"
      ],
      dealBreakers: [],
      notes: "Potentially safe area of Angle Vale - needs flood verification"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="mt-1 text-gray-600">
            Tracking potential properties in Northern Adelaide
          </p>
        </div>
        <Link
          href="/properties/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Property
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button className="pb-2 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">
          All ({properties.length})
        </button>
        <button className="pb-2 px-1 text-gray-600 hover:text-gray-900">
          Interested ({properties.filter(p => p.status === "interested").length})
        </button>
        <button className="pb-2 px-1 text-gray-600 hover:text-gray-900">
          Researching ({properties.filter(p => p.status === "researching").length})
        </button>
        <button className="pb-2 px-1 text-gray-600 hover:text-gray-900">
          Rejected ({properties.filter(p => p.status === "rejected").length})
        </button>
      </div>

      {/* Property Cards */}
      <div className="space-y-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className={`bg-white rounded-lg shadow-sm border ${
              property.status === "rejected" 
                ? "border-red-200 bg-red-50" 
                : "border-gray-200"
            } p-6`}
          >
            <div className="flex gap-6">
              {/* Property Image/Icon */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-5xl">
                  {property.image}
                </div>
              </div>

              {/* Property Details */}
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {property.address}
                    </h3>
                    <p className="text-lg font-bold text-blue-600 mb-2">
                      {property.price}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>🛏️ {property.bedrooms} beds</span>
                      <span>🚿 {property.bathrooms} baths</span>
                      <span>🚗 {property.carSpaces} cars</span>
                      <span>📐 {property.landSize}</span>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div>
                    {property.status === "interested" && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Interested
                      </span>
                    )}
                    {property.status === "researching" && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Researching
                      </span>
                    )}
                    {property.status === "rejected" && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights and Concerns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 text-sm">Highlights</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2 text-sm">Concerns</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.concerns.map((concern, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-yellow-500 mr-1">!</span>
                          {concern}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Deal Breakers */}
                {property.dealBreakers.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                    <h4 className="font-medium text-red-900 mb-1 text-sm">Deal Breakers</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {property.dealBreakers.map((breaker, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-1">✗</span>
                          {breaker}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes */}
                {property.notes && (
                  <div className="bg-gray-50 rounded p-3 text-sm text-gray-600">
                    <strong>Notes:</strong> {property.notes}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4">
                  <a
                    href={`/suburbs/${property.suburb.toLowerCase().replace(' ', '-')}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View {property.suburb} Research →
                  </a>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Edit Property
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Research Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Properties:</span>
            <p className="text-xl font-bold text-gray-900">{properties.length}</p>
          </div>
          <div>
            <span className="text-gray-600">Average Price:</span>
            <p className="text-xl font-bold text-gray-900">~$650K</p>
          </div>
          <div>
            <span className="text-gray-600">Best Value:</span>
            <p className="text-xl font-bold text-gray-900">Andrews Farm</p>
          </div>
          <div>
            <span className="text-gray-600">Top Pick:</span>
            <p className="text-xl font-bold text-gray-900">Two Wells</p>
          </div>
        </div>
      </div>
    </div>
  );
}
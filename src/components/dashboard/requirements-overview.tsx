"use client";

export function RequirementsOverview() {
  const requirements = {
    budget: {
      title: "Budget",
      value: "Under $900k",
      icon: "💰",
      status: "active",
      description: "Maximum asking price"
    },
    location: {
      title: "Location Focus",
      value: "Northern Adelaide",
      icon: "📍", 
      status: "active",
      description: "Suburbs in northern Adelaide region"
    },
    livingAreas: {
      title: "Living Areas",
      value: "2+ Areas",
      icon: "🏠",
      status: "active", 
      description: "Minimum 2 separate living spaces"
    },
    bathrooms: {
      title: "Bathrooms", 
      value: "2+ Bathrooms",
      icon: "🛁",
      status: "active",
      description: "Minimum 2 bathrooms required"
    }
  };

  const dealBreakers = [
    {
      title: "2-Story Properties",
      icon: "🚫",
      description: "Single story only - no stairs",
      severity: "high"
    },
    {
      title: "Flood Zones", 
      icon: "🌊",
      description: "Especially around Gawler River areas",
      severity: "high"
    },
    {
      title: "No Car Space",
      icon: "🚗", 
      description: "Must accommodate 2 cars minimum",
      severity: "medium"
    },
    {
      title: "No Solar Panels",
      icon: "☀️",
      description: "Solar installation required",
      severity: "medium"
    },
    {
      title: "Non-Dog-Friendly",
      icon: "🐕",
      description: "Backyard suitable for dogs", 
      severity: "medium"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Family Requirements</h2>
        <p className="text-gray-600 text-sm">
          These criteria guide our property research and automatic filtering
        </p>
      </div>

      {/* Must-Have Requirements */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <span>✅</span>
          <span>Must-Have Features</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(requirements).map((req, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-lg">{req.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-green-800 text-sm">{req.title}</div>
                <div className="font-bold text-green-900">{req.value}</div>
                <div className="text-xs text-green-700 opacity-80">{req.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Breakers */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <span>⛔</span>
          <span>Deal Breakers</span>
        </h3>
        <div className="space-y-2">
          {dealBreakers.map((breaker, index) => (
            <div key={index} className={`flex items-center space-x-3 p-3 border rounded-lg ${getSeverityColor(breaker.severity)}`}>
              <span className="text-lg">{breaker.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{breaker.title}</div>
                <div className="text-xs opacity-80">{breaker.description}</div>
              </div>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                {breaker.severity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-green-500">●</span>
            <span>All filters active and monitoring new properties</span>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-2 py-1 rounded transition-colors">
            Edit Requirements
          </button>
        </div>
      </div>
    </div>
  );
}
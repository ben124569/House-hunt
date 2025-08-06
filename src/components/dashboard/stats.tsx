"use client";

export function DashboardStats() {
  // TODO: Replace with real data from tRPC when available
  const stats = {
    totalProperties: 0,
    activeProperties: 0,
    avgPriceEstimate: 0,
    propertiesViewed: 0,
  };

  const statCards = [
    {
      title: "Properties Researched",
      value: stats.totalProperties,
      icon: "🏠",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: null, // "+2 this week"
    },
    {
      title: "Currently Interested",
      value: stats.activeProperties,
      icon: "❤️",
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: null,
    },
    {
      title: "Average Price Range",
      value: stats.avgPriceEstimate ? `$${Math.round(stats.avgPriceEstimate / 1000)}k` : "N/A",
      icon: "💰",
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: null, // "Within budget"
    },
    {
      title: "Properties Viewed",
      value: stats.propertiesViewed,
      icon: "👁️",
      color: "text-purple-600", 
      bgColor: "bg-purple-50",
      change: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              {stat.change && (
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              )}
            </div>
            <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl text-2xl`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
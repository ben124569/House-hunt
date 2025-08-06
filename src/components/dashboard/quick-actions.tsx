"use client";

import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      title: "Add New Property",
      description: "Research a property from realestate.com.au URL",
      icon: "🏡",
      href: "/" as any,
      color: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      featured: true,
    },
    {
      title: "Browse Properties",
      description: "View all researched properties and their status",
      icon: "📋",
      href: "/" as any,
      color: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
      featured: false,
    },
    {
      title: "Suburb Research",
      description: "Explore suburb profiles and market data",
      icon: "📍",
      href: "/" as any,
      color: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
      featured: false,
    },
    {
      title: "Family Notes",
      description: "Collaborate with family members on decisions",
      icon: "💬",
      href: "/" as any,
      color: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
      featured: false,
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600">
          Start researching properties or collaborate with your family
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`${action.color} ${
              action.featured ? "md:col-span-2" : ""
            } text-white p-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group`}
          >
            <div className="flex flex-col h-full">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {action.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{action.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed flex-1">
                {action.description}
              </p>
              <div className="mt-4 flex items-center text-white/80 text-sm">
                <span>Get started</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Help section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <span className="text-lg">💡</span>
          <div>
            <span className="font-medium">New to the platform?</span>
            <span className="ml-1">Start by adding a property URL or exploring our suburb research.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      title: "Add Property",
      description: "Add a new property to track",
      icon: "🏡",
      href: "/properties/add" as any,
      color: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    {
      title: "View Properties",
      description: "See all tracked properties",
      icon: "📋",
      href: "/properties" as any,
      color: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      title: "Suburbs",
      description: "Browse suburb information",
      icon: "📍",
      href: "/suburbs" as any,
      color: "bg-purple-500 hover:bg-purple-600 text-white",
    },
    {
      title: "Criteria",
      description: "View search requirements",
      icon: "✓",
      href: "/criteria" as any,
      color: "bg-orange-500 hover:bg-orange-600 text-white",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`${action.color} p-4 rounded-lg transition-colors shadow-sm hover:shadow-md`}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <h3 className="font-medium mb-1">{action.title}</h3>
            <p className="text-sm opacity-90">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
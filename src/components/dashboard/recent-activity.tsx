"use client";

import Link from "next/link";

export function RecentActivity() {
  // TODO: Replace with real data from tRPC when available
  const activities: any[] = [
    // Placeholder data structure - will be replaced with real activity feed
  ];

  const placeholderActivities = [
    {
      id: "1",
      type: "PROPERTY_ADDED" as const,
      action: "Property added to research list",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      metadata: {
        propertyAddress: "45 Smith St, Smithfield",
        listingPrice: "$850,000"
      },
      user: { name: "Ben", role: "ADMIN" }
    },
    {
      id: "2", 
      type: "NOTE_CREATED" as const,
      action: "Family note added",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      metadata: {
        noteContent: "Great location but concerned about flood risk...",
        propertyAddress: "45 Smith St, Smithfield"
      },
      user: { name: "Mum", role: "EDITOR" }
    },
    {
      id: "3",
      type: "ANALYSIS_UPDATED" as const, 
      action: "Market analysis completed",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      metadata: {
        propertyAddress: "32 Johnson Ave, Angle Vale",
        estimatedValue: "$780,000",
        confidence: 85
      },
      user: { name: "System", role: "ADMIN" }
    }
  ];

  const displayActivities = activities.length > 0 ? activities : placeholderActivities;

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "PROPERTY_ADDED":
        return "🏡";
      case "NOTE_CREATED":
        return "💬";
      case "ANALYSIS_UPDATED":
        return "📊";
      case "USER_SIGNIN":
        return "👋";
      case "PROPERTY_STATUS_UPDATED":
        return "🔄";
      default:
        return "📝";
    }
  };

  const getUserColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "text-red-600 bg-red-50";
      case "EDITOR":
        return "text-blue-600 bg-blue-50";
      case "VIEWER":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <p className="text-gray-600 text-sm">Latest updates from your family</p>
        </div>
        <Link 
          href={"/" as any}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
        >
          <span>View all</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {displayActivities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
          <p className="text-gray-600 text-sm">
            Start by adding a property or creating a family note
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50/50 rounded-lg transition-colors">
              <div className="text-xl flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getUserColor(activity.user.role)}`}>
                    {activity.user.name}
                  </span>
                </div>
                
                {activity.metadata && (
                  <div className="text-sm text-gray-600 mb-1">
                    {activity.type === "PROPERTY_ADDED" && (
                      <span>
                        <strong>{activity.metadata.propertyAddress}</strong> - {activity.metadata.listingPrice}
                      </span>
                    )}
                    {activity.type === "NOTE_CREATED" && (
                      <span>
                        "{activity.metadata.noteContent}" on <strong>{activity.metadata.propertyAddress}</strong>
                      </span>
                    )}
                    {activity.type === "ANALYSIS_UPDATED" && (
                      <span>
                        <strong>{activity.metadata.propertyAddress}</strong> - Estimated at {activity.metadata.estimatedValue} ({activity.metadata.confidence}% confidence)
                      </span>
                    )}
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activities.length === 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic">
            This shows placeholder data. Real activity will appear once you start using the platform.
          </p>
        </div>
      )}
    </div>
  );
}
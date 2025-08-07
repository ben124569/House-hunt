"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Session } from "next-auth";

interface NavigationProps {
  session: Session | null;
}

const navigation = [
  { name: "Dashboard", href: "/" as any, icon: "🏠" },
  { name: "Properties", href: "/properties" as any, icon: "🏡" },
  { name: "Criteria", href: "/criteria" as any, icon: "📋" },
  { name: "Suburbs", href: "/suburbs" as any, icon: "📍" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navigation({ session }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="relative z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and primary nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="text-2xl group-hover:scale-110 transition-transform duration-200">🏡</div>
              <div>
                <div className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  House Hunt
                </div>
                <div className="text-xs text-gray-500 -mt-1">Northern Adelaide</div>
              </div>
            </Link>

            {/* Primary navigation - always visible */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isActive
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent",
                      "px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center space-x-2"
                    )}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side - simplified */}
          <div className="text-sm text-gray-600">
            Family Property Tracker
          </div>
        </div>
      </div>

      {/* Mobile navigation - always visible */}
      <div className="md:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-sm">
        <div className="px-4 py-2">
          <div className="flex space-x-1 overflow-x-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { type Session } from "next-auth";

interface NavigationProps {
  session: Session | null;
}

const navigation = [
  { name: "Dashboard", href: "/" as any, icon: "🏠" },
  { name: "Properties", href: "/" as any, icon: "🏡" },
  { name: "Suburbs", href: "/" as any, icon: "📍" },
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
                <div className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                  House Hunt
                </div>
                <div className="text-xs text-gray-500 -mt-1">Northern Adelaide</div>
              </div>
            </Link>

            {/* Primary navigation */}
            {session && (
              <div className="hidden md:flex items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        isActive
                          ? "bg-red-50 text-red-600 border-red-200"
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
            )}
          </div>

          {/* Right side - User menu or sign in */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                {/* Family status indicator */}
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-blue-600">👨‍👩‍👧‍👦</span>
                  <span className="font-medium">{session.user.role}</span>
                  {session.user.role === "ADMIN" && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                      Admin
                    </span>
                  )}
                </div>

                {/* User menu dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {session.user.name || "User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {session.user.email}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={"/" as any}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "flex items-center space-x-2 px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              <span>⚙️</span>
                              <span>Settings</span>
                            </Link>
                          )}
                        </Menu.Item>
                        {session.user.role === "ADMIN" && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={"/" as any}
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "flex items-center space-x-2 px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <span>👑</span>
                                <span>Admin Panel</span>
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              <span>🚪</span>
                              <span>Sign out</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-sm text-gray-600">
                  Family property research platform
                </div>
                <button
                  onClick={() => signIn()}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {session && (
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
                        ? "bg-red-50 text-red-600"
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
      )}
    </nav>
  );
}
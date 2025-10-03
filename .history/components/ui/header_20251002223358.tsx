'use client';

import Link from "next/link";
import Logo from "./logo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  role: string;
  name: string;
  isAuthenticated: boolean;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMobileMenuOpen(false);
    router.push('/');
  };

  const isGuest = !user;
  const isUser = user?.role === 'user';
  const isOrganizer = user?.role === 'organizer';

  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
          {/* Site branding */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation Links - Clean minimal design */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Events
            </Link>
            {isOrganizer && (
              <>
                <Link
                  href="/create-event"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Create
                </Link>
                <Link
                  href="/organizer"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </>
            )}
            {isUser && (
              <>
                <Link
                  href="/transactions"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Tickets
                </Link>
                <Link
                  href="/reviews"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Reviews
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isGuest ? (
              /* Guest actions */
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                >
                  Get started
                </Link>
              </>
            ) : (
              /* Authenticated user actions */
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden lg:block">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    {isOrganizer && (
                      <div className="text-xs text-blue-600">Organizer</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              
              {/* User-only navigation */}
              {isUser && (
                <>
                  <Link
                    href="/transactions"
                    className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Tickets
                  </Link>
                  <Link
                    href="/reviews"
                    className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Reviews
                  </Link>
                </>
              )}

              {/* Organizer-only navigation */}
              {isOrganizer && (
                <>
                  <Link
                    href="/create-event"
                    className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                  <Link
                    href="/organizer"
                    className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {/* Mobile auth actions */}
              {isGuest ? (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/signin"
                    className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full text-center px-4 py-3 text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get started
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      {isOrganizer && <div className="text-sm text-blue-600">Organizer</div>}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-lg font-medium text-gray-500 hover:text-gray-700 transition-colors py-2"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

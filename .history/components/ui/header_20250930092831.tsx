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
    router.push('/');
  };

  const isGuest = !user;
  const isUser = user?.role === 'user';
  const isOrganizer = user?.role === 'organizer';

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Events
            </Link>
            
            {/* User-only navigation */}
            {isUser && (
              <>
                <Link
                  href="/transactions"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  My Tickets
                </Link>
                <Link
                  href="/reviews"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
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
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Create Event
                </Link>
                <Link
                  href="/organizer"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex flex-1 items-center justify-end gap-3">
            {isGuest ? (
              /* Guest actions */
              <>
                <Link
                  href="/signin"
                  className="btn-sm bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="btn-sm bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-900"
                >
                  Register
                </Link>
              </>
            ) : (
              /* Authenticated user actions */
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{user.name}</span>
                  {isOrganizer && <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Organizer</span>}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

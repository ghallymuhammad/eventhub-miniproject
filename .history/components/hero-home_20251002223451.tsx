'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  email: string;
  role: string;
  name: string;
  isAuthenticated: boolean;
}

export default function HeroHome() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Hero Headline */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-none mb-6 tracking-tight">
                Create
                <span className="block font-extralight text-gray-600">experiences</span>
                <span className="block font-medium">that matter</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-500 max-w-3xl mx-auto leading-relaxed">
                The simplest way to discover extraordinary events or create your own
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for events..."
                  className="w-full h-16 px-6 pl-16 text-lg bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/5 focus:border-gray-300 transition-all duration-200 placeholder:text-gray-400"
                />
                <svg
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
                  Search
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!user ? (
                /* Guest CTAs */
                <>
                  <a
                    href="#featured-events"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Explore Events
                  </a>
                  <Link
                    href="/signin"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    Sign in to get started
                  </Link>
                </>
              ) : user.role === 'user' ? (
                /* User CTAs */
                <>
                  <a
                    href="#featured-events"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Discover Events
                  </a>
                  <Link
                    href="/transactions"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    My Tickets
                  </Link>
                </>
              ) : (
                /* Organizer CTAs */
                <>
                  <Link
                    href="/create-event"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Create Event
                  </Link>
                  <Link
                    href="/organizer"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
            
            {/* Scroll indicator */}
            <div className="mt-16">
              <a
                href="#featured-events"
                className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="featured-events" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most popular and trending events happening near you
            </p>
          </div>

          {/* Event Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Event Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-red-400 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Music
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Rock Concert 2025</h3>
                  <p className="text-sm opacity-90">Jakarta, Indonesia</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">Oct 15, 2025</span>
                  </div>
                  <div className="text-blue-600 font-bold text-lg">Rp 250.000</div>
                </div>
                {!user ? (
                  <Link
                    href="/signin"
                    className="block w-full bg-gray-400 text-white py-3 rounded-xl font-semibold text-center hover:bg-gray-500 transition-colors"
                  >
                    Sign In to Book
                  </Link>
                ) : user.role === 'user' ? (
                  <Link
                    href="/checkout"
                    className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors"
                  >
                    Get Tickets
                  </Link>
                ) : (
                  <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed" disabled>
                    Organizer View Only
                  </button>
                )}
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Workshop
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Tech Workshop</h3>
                  <p className="text-sm opacity-90">Bandung, Indonesia</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">Oct 20, 2025</span>
                  </div>
                  <div className="text-green-600 font-bold text-lg">FREE</div>
                </div>
                {!user ? (
                  <Link
                    href="/signin"
                    className="block w-full bg-gray-400 text-white py-3 rounded-xl font-semibold text-center hover:bg-gray-500 transition-colors"
                  >
                    Sign In to Register
                  </Link>
                ) : user.role === 'user' ? (
                  <Link
                    href="/checkout"
                    className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors"
                  >
                    Register Now
                  </Link>
                ) : (
                  <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed" disabled>
                    Organizer View Only
                  </button>
                )}
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-indigo-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Arts
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Art Exhibition</h3>
                  <p className="text-sm opacity-90">Yogyakarta, Indonesia</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">Nov 5, 2025</span>
                  </div>
                  <div className="text-blue-600 font-bold text-lg">Rp 75.000</div>
                </div>
                {!user ? (
                  <Link
                    href="/signin"
                    className="block w-full bg-gray-400 text-white py-3 rounded-xl font-semibold text-center hover:bg-gray-500 transition-colors"
                  >
                    Sign In to Book
                  </Link>
                ) : user.role === 'user' ? (
                  <Link
                    href="/checkout"
                    className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors"
                  >
                    Get Tickets
                  </Link>
                ) : (
                  <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed" disabled>
                    Organizer View Only
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center">
            <a
              href="#all-events"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              View All Events
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find events that match your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Category Items */}
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="font-semibold text-gray-900">Music</h3>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="font-semibold text-gray-900">Business</h3>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900">Arts</h3>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚽</span>
              </div>
              <h3 className="font-semibold text-gray-900">Sports</h3>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍕</span>
              </div>
              <h3 className="font-semibold text-gray-900">Food</h3>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="font-semibold text-gray-900">Theater</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Events Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5K+</div>
              <div className="text-blue-100">Event Organizers</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Discover & Create
                <span className="text-blue-600 block">Amazing Events</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Find exciting events around you or create your own. From concerts to workshops, 
                make every moment memorable with our platform.
              </p>
              
              {/* Search Bar */}
              <div className="relative mb-8">
                <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search events, artists, or venues..."
                      className="w-full px-4 py-4 pl-12 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
                    Search
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {!user ? (
                  /* Guest CTAs */
                  <>
                    <a
                      href="#featured-events"
                      className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Explore Events
                    </a>
                    <Link
                      href="/signin"
                      className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200"
                    >
                      Sign In to Book
                    </Link>
                  </>
                ) : user.role === 'user' ? (
                  /* User CTAs */
                  <>
                    <a
                      href="#featured-events"
                      className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Book Events
                    </a>
                    <Link
                      href="/transactions"
                      className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200"
                    >
                      My Tickets
                    </Link>
                  </>
                ) : (
                  /* Organizer CTAs */
                  <>
                    <Link
                      href="/create-event"
                      className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Create Event
                    </Link>
                    <Link
                      href="/organizer"
                      className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl mb-4 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🎵</div>
                    <div className="text-xl font-bold">Live Event Preview</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Summer Music Festival</h3>
                    <span className="text-blue-600 font-semibold">$45</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Central Park, New York
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Dec 15, 2025 - 8:00 PM
                  </div>
                </div>
              </div>
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
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Get Tickets
                </button>
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
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
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
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Get Tickets
                </button>
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

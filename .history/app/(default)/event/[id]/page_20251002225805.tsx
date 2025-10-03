'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface User {
  email: string;
  role: string;
  name: string;
  isAuthenticated: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  image: string;
  organizer: string;
  capacity: number;
  soldTickets: number;
  termsAndConditions: string[];
  highlights: string[];
}

// Mock event data - in a real app, this would come from an API
const mockEvents: { [key: string]: Event } = {
  "rock-concert-2025": {
    id: "rock-concert-2025",
    title: "Rock Concert 2025",
    description: "An electrifying night of rock music featuring top bands",
    fullDescription: "Experience the ultimate rock concert of 2025! Join us for an unforgettable night featuring the biggest names in rock music. This spectacular event promises high-energy performances, incredible stage production, and an atmosphere that will leave you wanting more. Don't miss this once-in-a-lifetime opportunity to witness music history in the making.",
    date: "October 15, 2025",
    time: "8:00 PM",
    location: "Jakarta Convention Center, Jakarta, Indonesia",
    price: "$45",
    category: "Music",
    image: "/images/rock-concert-banner.jpg",
    organizer: "Rock Events Indonesia",
    capacity: 5000,
    soldTickets: 3200,
    highlights: [
      "Premium sound system and lighting",
      "Special guest performances",
      "Exclusive merchandise available",
      "Food and beverage vendors on-site",
      "VIP packages available"
    ],
    termsAndConditions: [
      "Entry is subject to valid ticket presentation",
      "Age restriction: 16+ (ID required for verification)",
      "No outside food or beverages allowed",
      "No professional cameras or recording devices",
      "Event organizers reserve the right to refuse entry",
      "No refunds unless event is cancelled",
      "Tickets are non-transferable",
      "By attending, you consent to being photographed/filmed",
      "Security screening may be conducted at entry",
      "Event schedule may change without prior notice"
    ]
  },
  "tech-workshop": {
    id: "tech-workshop",
    title: "Tech Workshop 2025",
    description: "Learn cutting-edge technologies from industry experts",
    fullDescription: "Dive deep into the latest technologies shaping our future. This comprehensive workshop covers AI, machine learning, web development, and emerging tech trends. Led by industry veterans with years of experience in top tech companies. Perfect for developers, students, and tech enthusiasts looking to upgrade their skills.",
    date: "October 20, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Bandung Institute of Technology, Bandung, Indonesia",
    price: "Free",
    category: "Workshop",
    image: "/images/tech-workshop-banner.jpg",
    organizer: "Tech Community Bandung",
    capacity: 200,
    soldTickets: 150,
    highlights: [
      "Hands-on coding sessions",
      "Industry expert speakers",
      "Networking opportunities",
      "Free lunch and refreshments",
      "Certificate of completion",
      "Access to exclusive resources"
    ],
    termsAndConditions: [
      "Registration required (free of charge)",
      "Bring your own laptop for hands-on sessions",
      "Basic programming knowledge recommended",
      "Certificate issued upon 80% attendance",
      "Photography may occur during the event",
      "Workshop materials will be shared digitally",
      "Punctuality is expected for all sessions",
      "No commercial solicitation allowed",
      "Organizers not liable for personal belongings",
      "Event content is copyrighted material"
    ]
  },
  "art-exhibition": {
    id: "art-exhibition",
    title: "Modern Art Exhibition",
    description: "Contemporary artworks from renowned local and international artists",
    fullDescription: "Immerse yourself in the world of contemporary art featuring works from both established and emerging artists. This curated exhibition showcases diverse artistic expressions including paintings, sculptures, digital art, and interactive installations. A perfect opportunity to explore modern artistic movements and connect with the creative community.",
    date: "November 5, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "Jogja National Museum, Yogyakarta, Indonesia",
    price: "$15",
    category: "Arts",
    image: "/images/art-exhibition-banner.jpg",
    organizer: "Yogyakarta Arts Foundation",
    capacity: 1000,
    soldTickets: 400,
    highlights: [
      "50+ contemporary artworks",
      "Interactive art installations",
      "Artist meet and greet sessions",
      "Guided tours available",
      "Art workshop for children",
      "Museum gift shop with exclusive items"
    ],
    termsAndConditions: [
      "Valid ticket required for entry",
      "Photography allowed in designated areas only",
      "No touching of artworks unless specified",
      "Children under 12 must be accompanied by adults",
      "Bags may be subject to inspection",
      "No food or drinks near artwork displays",
      "Comfortable walking shoes recommended",
      "Audio guides available for rent",
      "Group discounts available for 10+ people",
      "Special accessibility arrangements available upon request"
    ]
  }
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'terms'>('details');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get event data (in a real app, this would be an API call)
    if (eventId && mockEvents[eventId]) {
      setEvent(mockEvents[eventId]);
    }
  }, [eventId]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to Events
          </Link>
        </div>
      </div>
    );
  }

  const isGuest = !user;
  const isUser = user?.role === 'user';
  const soldPercentage = (event.soldTickets / event.capacity) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[60vh] bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-6 z-10">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </Link>
        </div>

        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {event.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {event.date} at {event.time}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex space-x-8 border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-4 text-lg font-medium border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Event Details
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`pb-4 text-lg font-medium border-b-2 transition-colors ${
                  activeTab === 'terms'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Terms & Conditions
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'details' ? (
              <div className="space-y-8">
                {/* About This Event */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Event</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {event.fullDescription}
                  </p>
                </div>

                {/* Event Highlights */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Highlights</h3>
                  <ul className="space-y-3">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Organizer Info */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Organized by</h3>
                  <p className="text-gray-700 text-lg">{event.organizer}</p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Terms & Conditions</h2>
                <div className="space-y-4">
                  {event.termsAndConditions.map((term, index) => (
                    <div key={index} className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-gray-200 text-gray-600 text-sm font-medium rounded-full flex-shrink-0 mr-4 mt-0.5 text-center leading-6">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed">{term}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price & Booking Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {event.price}
                  </div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Tickets sold</span>
                    <span>{event.soldTickets} / {event.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${soldPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Booking Button */}
                {isGuest ? (
                  <div className="space-y-3">
                    <Link
                      href="/signin"
                      className="block w-full py-4 text-center text-white bg-black rounded-full hover:bg-gray-800 transition-colors font-medium"
                    >
                      Sign in to Book Tickets
                    </Link>
                    <p className="text-xs text-gray-500 text-center">
                      Create an account to purchase tickets
                    </p>
                  </div>
                ) : isUser ? (
                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      className="block w-full py-4 text-center text-white bg-black rounded-full hover:bg-gray-800 transition-colors font-medium"
                    >
                      Book Tickets Now
                    </Link>
                    <p className="text-xs text-gray-500 text-center">
                      Secure booking with instant confirmation
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <button 
                      disabled 
                      className="w-full py-4 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed font-medium"
                    >
                      Organizer View Only
                    </button>
                  </div>
                )}
              </div>

              {/* Event Details Card */}
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Date & Time</div>
                    <div className="text-gray-900 font-medium">
                      {event.date}<br />
                      {event.time}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Location</div>
                    <div className="text-gray-900 font-medium">{event.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Category</div>
                    <div className="text-gray-900 font-medium">{event.category}</div>
                  </div>
                </div>
              </div>

              {/* Share Event */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Event</h3>
                <div className="flex space-x-3">
                  <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
                    Facebook
                  </button>
                  <button className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium">
                    Twitter
                  </button>
                  <button className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

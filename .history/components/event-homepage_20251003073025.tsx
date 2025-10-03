'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Countdown from "./Countdown";

interface User {
  email: string;
  role: string;
  name: string;
  isAuthenticated: boolean;
}

interface Event {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  datetime: string; // Full datetime for countdown
  price: string;
  priceValue: number;
  image: string;
  featured: boolean;
  organizer: string;
}

function EventHomepage() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 12;

  // Format price in IDR
  const formatIDR = (amount: number) => {
    if (amount === 0) return 'Free';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Get gradient for category
  const getCategoryGradient = (category: string) => {
    const gradients: { [key: string]: string } = {
      'Music': 'from-red-400 to-pink-500',
      'Technology': 'from-green-400 to-blue-500',
      'Arts': 'from-purple-400 to-indigo-500',
      'Sports': 'from-yellow-400 to-orange-500',
      'Food': 'from-pink-400 to-red-500',
      'Business': 'from-blue-400 to-purple-500',
      'Theater': 'from-indigo-400 to-purple-500'
    };
    return gradients[category] || 'from-gray-400 to-gray-500';
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('page', currentPage.toString());
      params.append('limit', eventsPerPage.toString());

      const response = await fetch(`/api/events?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Transform API data to match component interface
          const transformedEvents = data.data.events.map((event: any) => ({
            id: event.id,
            title: event.title,
            category: event.category,
            location: event.location,
            date: new Date(event.date).toLocaleDateString(),
            datetime: event.date,
            price: formatIDR(event.ticketTypes?.[0]?.price || 0),
            priceValue: event.ticketTypes?.[0]?.price || 0,
            image: getCategoryGradient(event.category),
            featured: false, // Could be determined by some criteria
            organizer: event.organizer.name
          }));
          
          if (currentPage === 1) {
            setAllEvents(transformedEvents);
          } else {
            // Append to existing events for load more
            setAllEvents(prev => [...prev, ...transformedEvents]);
          }
          setTotalPages(data.data.pagination.pages);
        }
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // Fallback to mock data if API fails
      setAllEvents(getMockEvents());
    } finally {
      setLoading(false);
    }
  };

  // Fallback mock data
  const getMockEvents = (): Event[] => [
    {
      id: '1',
      title: 'Rock Concert 2025',
      category: 'Music',
      location: 'Jakarta',
      date: 'Oct 15, 2025',
      datetime: '2025-10-15T19:00:00',
      price: 'Rp 250.000',
      priceValue: 250000,
      image: 'from-red-400 to-pink-500',
      featured: true,
      organizer: 'Jakarta Music Hall'
    },
    {
      id: '2',
      title: 'Tech Workshop: AI Fundamentals',
      category: 'Workshop',
      location: 'Bandung',
      date: 'Oct 20, 2025',
      datetime: '2025-10-20T09:00:00',
      price: 'FREE',
      priceValue: 0,
      image: 'from-green-400 to-blue-500',
      featured: true,
      organizer: 'TechHub Bandung'
    }
  ];

  const categories = ['all', 'Music', 'Workshop', 'Arts', 'Food', 'Business', 'Sports', 'Theater'];
  const locations = ['all', 'Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya'];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, [searchQuery, selectedCategory, currentPage]);

  // Filter and sort events
  useEffect(() => {
    let events = [...allEvents];
    
    // Filter by location
    if (selectedLocation !== 'all') {
      events = events.filter(event => 
        event.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Sort events
    events.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.priceValue - b.priceValue;
        case 'price-high':
          return b.priceValue - a.priceValue;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
      }
    });

    setFilteredEvents(events);
  }, [allEvents, selectedLocation, sortBy]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on search
      fetchEvents();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Music': '🎵',
      'Workshop': '💼',
      'Arts': '🎨',
      'Food': '🍕',
      'Business': '💼',
      'Sports': '⚽',
      'Theater': '🎭'
    };
    return icons[category] || '📅';
  };

  return (
    <>
      {/* Hero Section with Search */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="animated-bg"></div>
          <div className="floating-particles">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="particle" style={{ 
                animationDelay: `${i * 1.5}s`,
                left: `${(i * 7) % 100}%`
              }}></div>
            ))}
          </div>
          <div className="floating-shapes">
            <div className="shape shape-circle" style={{width: '40px', height: '40px', top: '10%', left: '5%', animationDelay: '0s'}}></div>
            <div className="shape shape-square" style={{width: '30px', height: '30px', top: '20%', left: '90%', animationDelay: '2s'}}></div>
            <div className="shape shape-circle" style={{width: '25px', height: '25px', top: '80%', left: '10%', animationDelay: '4s'}}></div>
            <div className="shape shape-triangle" style={{top: '70%', left: '85%', animationDelay: '6s'}}></div>
            <div className="shape shape-circle" style={{width: '35px', height: '35px', top: '60%', left: '95%', animationDelay: '8s'}}></div>
            <div className="shape shape-square" style={{width: '20px', height: '20px', top: '30%', left: '3%', animationDelay: '10s'}}></div>
          </div>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Discover Amazing
              <span className="text-yellow-300 block">Events Near You</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
              From concerts and workshops to exhibitions and festivals - find and book events that match your interests.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8 max-w-6xl mx-auto glow-effect">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search events, categories, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
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

            {/* Filter Categories */}
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? '🔥 All Events' : `${getCategoryIcon(category)} ${category}`}
                </button>
              ))}
            </div>

            {/* Location and Sort Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the component will be added next */}
    </>
  );
}

export default EventHomepage;

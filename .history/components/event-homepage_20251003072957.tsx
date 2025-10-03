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
    <div>
      <h1>Event Homepage</h1>
      <p>Building the full component...</p>
    </div>
  );
}

export default EventHomepage;

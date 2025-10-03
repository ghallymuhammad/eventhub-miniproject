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

  return (
    <div>
      <h1>Event Homepage</h1>
      <p>Building the full component...</p>
    </div>
  );
}

export default EventHomepage;

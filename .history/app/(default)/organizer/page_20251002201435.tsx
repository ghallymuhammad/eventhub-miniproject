'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

function OrganizerDashboardPage() {
  const organizer = {
    name: "Music Events Indonesia",
    totalEvents: 25,
    totalRevenue: 2500000000, // IDR
    totalTicketsSold: 15000,
    averageRating: 4.6,
    totalReviews: 156
  };

  const events = [
    {
      id: 1,
      name: "Rock Concert 2025",
      date: "2025-10-15",
      status: "active",
      ticketsSold: 1250,
      totalTickets: 2500,
      revenue: 312500000,
      pendingTransactions: 23,
      reviews: 45,
      rating: 4.8
    },
    {
      id: 2,
      name: "Jazz Night Premium",
      date: "2025-11-20",
      status: "active", 
      ticketsSold: 890,
      totalTickets: 1000,
      revenue: 445000000,
      pendingTransactions: 5,
      reviews: 67,
      rating: 4.5
    },
    {
      id: 3,
      name: "Classical Music Festival",
      date: "2025-09-05",
      status: "completed",
      ticketsSold: 800,
      totalTickets: 800,
      revenue: 200000000,
      pendingTransactions: 0,
      reviews: 44,
      rating: 4.7
    }
  ];

  const pendingTransactions = [
    {
      id: "TXN-001",
      customerName: "Ahmad Rahman",
      eventName: "Rock Concert 2025",
      amount: 250000,
      paymentProof: "proof_001.jpg",
      submittedAt: "2025-09-30 14:30",
      expiresAt: "2025-10-03 14:30"
    },
    {
      id: "TXN-002", 
      customerName: "Sari Dewi",
      eventName: "Jazz Night Premium",
      amount: 500000,
      paymentProof: "proof_002.jpg",
      submittedAt: "2025-09-30 10:15",
      expiresAt: "2025-10-03 10:15"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const config = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      completed: { color: 'bg-blue-100 text-blue-800', text: 'Completed' },
      draft: { color: 'bg-gray-100 text-gray-800', text: 'Draft' }
    };
    
    const statusConfig = config[status as keyof typeof config];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        {statusConfig.text}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {organizer.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-semibold text-gray-900">{organizer.totalEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(organizer.totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
                <p className="text-2xl font-semibold text-gray-900">{organizer.totalTicketsSold.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-semibold text-gray-900">{organizer.averageRating}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Events & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
                <a
                  href="/create-event"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Event
                </a>
              </div>
              
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.name}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Tickets Sold</p>
                        <p className="font-medium">{event.ticketsSold} / {event.totalTickets}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(event.ticketsSold / event.totalTickets) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-medium text-green-600">{formatCurrency(event.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rating & Reviews</p>
                        <div className="flex items-center">
                          {renderStars(Math.floor(event.rating))}
                          <span className="ml-1 text-sm font-medium">{event.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({event.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    {event.pendingTransactions > 0 && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                        <span className="text-yellow-800 font-medium">
                          {event.pendingTransactions} transactions pending approval
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Transactions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Payment Confirmations</h2>
              
              <div className="space-y-4">
                {pendingTransactions.map((transaction) => (
                  <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{transaction.eventName}</h3>
                        <p className="text-sm text-gray-600">Customer: {transaction.customerName}</p>
                        <p className="text-sm text-gray-600">Transaction ID: {transaction.id}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-lg text-gray-900">{formatCurrency(transaction.amount)}</div>
                        <div className="text-sm text-gray-500">Submitted: {transaction.submittedAt}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-red-600">
                        Expires: {transaction.expiresAt}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                          Reject
                        </button>
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                          Approve
                        </button>
                        <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                          View Proof
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/create-event"
                  className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Event
                </a>
                <button className="block w-full text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View All Transactions
                </button>
                <button className="block w-full text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Analytics Report
                </button>
                <button className="block w-full text-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Manage Promotions
                </button>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Ahmad Rahman</span>
                    {renderStars(5)}
                  </div>
                  <p className="text-sm text-gray-600">"Amazing concert! Great organization."</p>
                  <p className="text-xs text-gray-500 mt-1">Rock Concert 2025</p>
                </div>
                
                <div className="border-b border-gray-200 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Sari Dewi</span>
                    {renderStars(4)}
                  </div>
                  <p className="text-sm text-gray-600">"Great music, venue could be better."</p>
                  <p className="text-xs text-gray-500 mt-1">Jazz Night Premium</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Budi Santoso</span>
                    {renderStars(5)}
                  </div>
                  <p className="text-sm text-gray-600">"Exceeded expectations!"</p>
                  <p className="text-xs text-gray-500 mt-1">Classical Music Festival</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a href="/reviews" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Reviews →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProtectedOrganizerDashboard() {
  return (
    <ProtectedRoute allowedRoles={['organizer']}>
      <OrganizerDashboardPage />
    </ProtectedRoute>
  );
}

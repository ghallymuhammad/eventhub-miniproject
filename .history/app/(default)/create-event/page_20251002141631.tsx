'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface TicketType {
  id: string;
  name: string;
  price: number;
  seats: number;
  description?: string;
}

interface Voucher {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  validFrom: string;
  validUntil: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  eventSpecific: boolean;
  minPurchase?: number;
}

interface ReferralVoucher {
  id: string;
  code: string;
  discountValue: number;
  validDays: number;
  isActive: boolean;
}

function CreateEventPage() {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '', 
    location: '',
    category: '',
    isFree: true,
    ticketPrice: 0,
    availableSeats: 100,
    ticketTypes: [
      { name: 'General', price: 0, seats: 100 }
    ] as TicketType[],
    promotions: [] as Promotion[]
  });

  const [newPromotion, setNewPromotion] = useState({
    code: '',
    discount: 0,
    validFrom: '',
    validUntil: '',
    maxUses: 0
  });

  const categories = [
    'Music & Concerts',
    'Business & Tech', 
    'Arts & Culture',
    'Sports & Fitness',
    'Food & Drink',
    'Theater & Entertainment'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addTicketType = () => {
    setEventData(prev => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: '', price: 0, seats: 0 }]
    }));
  };

  const updateTicketType = (index: number, field: string, value: string | number) => {
    setEventData(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((ticket, i) => 
        i === index ? { ...ticket, [field]: value } : ticket
      )
    }));
  };

  const removeTicketType = (index: number) => {
    setEventData(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((_, i) => i !== index)
    }));
  };

  const addPromotion = () => {
    if (newPromotion.code && newPromotion.discount > 0) {
      setEventData(prev => ({
        ...prev,
        promotions: [...prev.promotions, { ...newPromotion, id: Date.now() }]
      }));
      setNewPromotion({ code: '', discount: 0, validFrom: '', validUntil: '', maxUses: 0 });
    }
  };

  const removePromotion = (index: number) => {
    setEventData(prev => ({
      ...prev,
      promotions: prev.promotions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event Data:', eventData);
    // Here you would typically send the data to your API
    alert('Event created successfully!');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-2">Fill in the details to create your event and start selling tickets</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name *</label>
                <input
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your event in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={eventData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Event venue or location"
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Date & Time</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={eventData.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={eventData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Tickets */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing & Tickets</h2>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={eventData.isFree}
                  onChange={handleInputChange}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">This is a free event</span>
              </label>
            </div>

            {/* Ticket Types */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Ticket Types</h3>
                <button
                  type="button"
                  onClick={addTicketType}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Ticket Type
                </button>
              </div>

              {eventData.ticketTypes.map((ticket, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Name</label>
                      <input
                        type="text"
                        value={ticket.name}
                        onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. General, VIP"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (IDR)</label>
                      <input
                        type="number"
                        value={ticket.price}
                        onChange={(e) => updateTicketType(index, 'price', parseInt(e.target.value) || 0)}
                        disabled={eventData.isFree}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
                      <input
                        type="number"
                        value={ticket.seats}
                        onChange={(e) => updateTicketType(index, 'seats', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="100"
                      />
                    </div>

                    <div className="flex items-end">
                      {eventData.ticketTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTicketType(index)}
                          className="w-full px-3 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {!eventData.isFree && ticket.price > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      Price: {formatCurrency(ticket.price)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Promotions */}
          {!eventData.isFree && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Promotions & Vouchers</h2>
              
              {/* Add New Promotion */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Create Voucher</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voucher Code</label>
                    <input
                      type="text"
                      value={newPromotion.code}
                      onChange={(e) => setNewPromotion(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="EARLY25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (IDR)</label>
                    <input
                      type="number"
                      value={newPromotion.discount}
                      onChange={(e) => setNewPromotion(prev => ({ ...prev, discount: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Uses</label>
                    <input
                      type="number"
                      value={newPromotion.maxUses}
                      onChange={(e) => setNewPromotion(prev => ({ ...prev, maxUses: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                    <input
                      type="date"
                      value={newPromotion.validFrom}
                      onChange={(e) => setNewPromotion(prev => ({ ...prev, validFrom: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                    <input
                      type="date"
                      value={newPromotion.validUntil}
                      onChange={(e) => setNewPromotion(prev => ({ ...prev, validUntil: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addPromotion}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Voucher
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing Promotions */}
              {eventData.promotions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">Active Vouchers</h3>
                  {eventData.promotions.map((promo: any, index) => (
                    <div key={promo.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{promo.code}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-green-600">{formatCurrency(promo.discount)} off</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{promo.validFrom} to {promo.validUntil}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePromotion(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProtectedCreateEvent() {
  return (
    <ProtectedRoute allowedRoles={['organizer']}>
      <CreateEventPage />
    </ProtectedRoute>
  );
}

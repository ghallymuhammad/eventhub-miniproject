'use client';import { useState } from 'react';import ProtectedRoute from '@/components/ProtectedRoute';interface TicketType {  id: string;  name: string;  price: number;  seats: number;  description?: string;}interface Voucher {  id: string;  code: string;  discountType: 'percentage' | 'fixed';  discountValue: number;  validFrom: string;  validUntil: string;  maxUses: number;  currentUses: number;  isActive: boolean;  eventSpecific: boolean;  minPurchase?: number;}interface ReferralVoucher {  id: string;  code: string;  discountValue: number;  validDays: number;  isActive: boolean;}function CreateEventPage() {  const [currentStep, setCurrentStep] = useState(1);  const [eventData, setEventData] = useState({    name: '',    description: '',    startDate: '',    endDate: '',    startTime: '',    endTime: '',     location: '',    category: '',    image: '',    isFree: true,    totalSeats: 100,    ticketTypes: [      {         id: '1',         name: 'General Admission',         price: 0,         seats: 100,        description: 'Standard entry to the event'      }    ] as TicketType[],    vouchers: [] as Voucher[],    referralVoucher: null as ReferralVoucher | null  });  const [newVoucher, setNewVoucher] = useState({    code: '',    discountType: 'percentage' as 'percentage' | 'fixed',    discountValue: 0,    validFrom: '',    validUntil: '',    maxUses: 100,    minPurchase: 0  });  const [newReferralVoucher, setNewReferralVoucher] = useState({    code: '',    discountValue: 10,    validDays: 30  });  const [showVoucherForm, setShowVoucherForm] = useState(false);  const [showReferralForm, setShowReferralForm] = useState(false);  const [errors, setErrors] = useState<Record<string, string>>({});  const categories = [    'Music & Concerts',    'Business & Technology',    'Arts & Culture',     'Sports & Fitness',    'Food & Drink',    'Education & Learning',    'Health & Wellness',    'Fashion & Beauty',    'Travel & Adventure',    'Entertainment',    'Community & Social',    'Other'  ];  const steps = [    { id: 1, name: 'Event Details', description: 'Basic information about your event' },    { id: 2, name: 'Tickets & Pricing', description: 'Set up ticket types and pricing' },    { id: 3, name: 'Promotions', description: 'Create vouchers and promotions' },    { id: 4, name: 'Review & Publish', description: 'Review and publish your event' }  ];  const validateStep = (step: number): boolean => {    const newErrors: Record<string, string> = {};    if (step === 1) {      if (!eventData.name.trim()) newErrors.name = 'Event name is required';      if (!eventData.description.trim()) newErrors.description = 'Event description is required';      if (!eventData.startDate) newErrors.startDate = 'Start date is required';      if (!eventData.startTime) newErrors.startTime = 'Start time is required';      if (!eventData.location.trim()) newErrors.location = 'Location is required';      if (!eventData.category) newErrors.category = 'Category is required';            // Validate dates      if (eventData.startDate && eventData.endDate) {        const start = new Date(`${eventData.startDate}T${eventData.startTime}`);        const end = new Date(`${eventData.endDate}T${eventData.endTime}`);        if (end <= start) {          newErrors.endDate = 'End date must be after start date';        }      }    }    if (step === 2) {      if (!eventData.isFree) {        const hasValidTickets = eventData.ticketTypes.some(ticket =>           ticket.name.trim() && ticket.price >= 0 && ticket.seats > 0        );        if (!hasValidTickets) {          newErrors.tickets = 'At least one valid ticket type is required for paid events';        }      }    }    setErrors(newErrors);    return Object.keys(newErrors).length === 0;  };  const handleInputChange = (field: string, value: any) => {    setEventData(prev => ({      ...prev,      [field]: value    }));        // Clear error when user starts typing    if (errors[field]) {      setErrors(prev => ({ ...prev, [field]: '' }));    }  };  const handleTicketTypeChange = (index: number, field: string, value: any) => {    const updatedTicketTypes = [...eventData.ticketTypes];    updatedTicketTypes[index] = {      ...updatedTicketTypes[index],      [field]: value    };    setEventData(prev => ({ ...prev, ticketTypes: updatedTicketTypes }));  };  const addTicketType = () => {    const newTicket: TicketType = {      id: Date.now().toString(),      name: `Ticket ${eventData.ticketTypes.length + 1}`,      price: 0,      seats: 50,      description: ''    };    setEventData(prev => ({      ...prev,      ticketTypes: [...prev.ticketTypes, newTicket]    }));  };  const removeTicketType = (index: number) => {    if (eventData.ticketTypes.length > 1) {      setEventData(prev => ({        ...prev,        ticketTypes: prev.ticketTypes.filter((_, i) => i !== index)      }));    }  };  const addVoucher = () => {    if (!newVoucher.code.trim()) return;    const voucher: Voucher = {      id: Date.now().toString(),      code: newVoucher.code,      discountType: newVoucher.discountType,      discountValue: newVoucher.discountValue,      validFrom: newVoucher.validFrom,      validUntil: newVoucher.validUntil,      maxUses: newVoucher.maxUses,      currentUses: 0,      isActive: true,      eventSpecific: true,      minPurchase: newVoucher.minPurchase    };    setEventData(prev => ({      ...prev,      vouchers: [...prev.vouchers, voucher]    }));    // Reset form    setNewVoucher({      code: '',      discountType: 'percentage',      discountValue: 0,      validFrom: '',      validUntil: '',      maxUses: 100,      minPurchase: 0    });    setShowVoucherForm(false);  };  const removeVoucher = (index: number) => {    setEventData(prev => ({      ...prev,      vouchers: prev.vouchers.filter((_, i) => i !== index)    }));  };  const addReferralVoucher = () => {    if (!newReferralVoucher.code.trim()) return;    const referralVoucher: ReferralVoucher = {      id: Date.now().toString(),      code: newReferralVoucher.code,      discountValue: newReferralVoucher.discountValue,      validDays: newReferralVoucher.validDays,      isActive: true    };    setEventData(prev => ({ ...prev, referralVoucher }));    // Reset form    setNewReferralVoucher({      code: '',      discountValue: 10,      validDays: 30    });    setShowReferralForm(false);  };  const removeReferralVoucher = () => {    setEventData(prev => ({ ...prev, referralVoucher: null }));  };  const nextStep = () => {    if (validateStep(currentStep)) {      setCurrentStep(prev => Math.min(prev + 1, steps.length));    }  };  const prevStep = () => {    setCurrentStep(prev => Math.max(prev - 1, 1));  };  const handleSubmit = () => {    if (validateStep(currentStep)) {      // Calculate total seats      const totalSeats = eventData.ticketTypes.reduce((sum, ticket) => sum + ticket.seats, 0);            const finalEventData = {        ...eventData,        totalSeats,        createdAt: new Date().toISOString(),        status: 'draft'      };      console.log('Creating event:', finalEventData);            // Here you would typically send the data to your backend      // For now, we'll just show a success message      alert('Event created successfully! (This is a demo - no backend integration yet)');            // Reset form      setEventData({        name: '',        description: '',        startDate: '',        endDate: '',        startTime: '',        endTime: '',         location: '',        category: '',        image: '',        isFree: true,        totalSeats: 100,        ticketTypes: [          {             id: '1',             name: 'General Admission',             price: 0,             seats: 100,            description: 'Standard entry to the event'          }        ],        vouchers: [],        referralVoucher: null      });      setCurrentStep(1);    }  };  const formatPrice = (price: number) => {    return new Intl.NumberFormat('id-ID', {      style: 'currency',      currency: 'IDR',      minimumFractionDigits: 0    }).format(price);  };  const renderStepIndicator = () => (    <div className="mb-8">      <nav aria-label="Progress">        <ol className="flex items-center">          {steps.map((step, index) => (            <li key={step.id} className={`${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>              <div className="flex items-center">                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${                  currentStep > step.id                    ? 'bg-blue-600 border-blue-600'                    : currentStep === step.id                    ? 'border-blue-600 bg-white'                    : 'border-gray-300 bg-white'                }`}>                  {currentStep > step.id ? (                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />                    </svg>                  ) : (                    <span className={`text-sm font-medium ${                      currentStep === step.id ? 'text-blue-600' : 'text-gray-500'                    }`}>                      {step.id}                    </span>                  )}                </div>                <div className="ml-4 min-w-0 flex-1">                  <p className={`text-sm font-medium ${                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'                  }`}>                    {step.name}                  </p>                  <p className="text-sm text-gray-500">{step.description}</p>                </div>              </div>              {index !== steps.length - 1 && (                <div className="absolute top-5 right-0 hidden h-0.5 w-full bg-gray-200 sm:block" aria-hidden="true">                  <div className={`h-0.5 bg-blue-600 transition-all duration-300 ${                    currentStep > step.id ? 'w-full' : 'w-0'                  }`} />                </div>              )}            </li>          ))}        </ol>      </nav>    </div>  );  const renderStep1 = () => (    <div className="space-y-6">      <div>        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">          <div className="md:col-span-2">            <label className="block text-sm font-medium text-gray-700 mb-2">              Event Name *            </label>            <input              type="text"              value={eventData.name}              onChange={(e) => handleInputChange('name', e.target.value)}              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${                errors.name ? 'border-red-500' : 'border-gray-300'              }`}              placeholder="Enter your event name"            />            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}          </div>          <div className="md:col-span-2">            <label className="block text-sm font-medium text-gray-700 mb-2">              Description *            </label>            <textarea              value={eventData.description}              onChange={(e) => handleInputChange('description', e.target.value)}              rows={4}              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${                errors.description ? 'border-red-500' : 'border-gray-300'              }`}              placeholder="Describe your event..."            />            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}          </div>          <div>            <label className="block text-sm font-medium text-gray-700 mb-2">              Category *            </label>            <select              value={eventData.category}              onChange={(e) => handleInputChange('category', e.target.value)}              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${                errors.category ? 'border-red-500' : 'border-gray-300'              }`}            >              <option value="">Select a category</option>              {categories.map(cat => (                <option key={cat} value={cat}>{cat}</option>              ))}            </select>            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}          </div>          <div>            <label className="block text-sm font-medium text-gray-700 mb-2">              Location *            </label>            <input              type="text"              value={eventData.location}              onChange={(e) => handleInputChange('location', e.target.value)}              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${                errors.location ? 'border-red-500' : 'border-gray-300'              }`}              placeholder="Event location"            />            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}          </div>          <div>            <label className="block text-sm font-medium text-gray-700 mb-2">              Start Date *            </label>            <input              type="date"              value={eventData.startDate}              onChange={(e) => handleInputChange('startDate', e.target.value)}              min={new Date().toISOString().split('T')[0]}              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${                errors.startDate ? 'border-red-500' : 'border-gray-300'              }`}            />            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}          </div>          <div>            <label className="block text-sm font-medium text-gray-700 mb-2">              Start Time *            </label>            <input              type="time"              value={eventData.startTime}              onChange={(e) => handleInputChange('startTime', e.target.value)}              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${                errors.startTime ? 'border-red-500' : 'border-gray-300'              }`}            />            {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}          </div>          <div>            <label className="block text-sm font-medium text-gray-700 mb-2">              End Date            </label>            <input              type="date"              value={eventData.endDate}              onChange={(e) => handleInputChange('endDate', e.target.value)}              min={eventData.startDate || new Date().toISOString().split('T')[0]}              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${                errors.endDate ? 'border-red-500' : 'border-gray-300'              }`}            />            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}          </div>          <div>            <label className="block text-sm font-medium text-gray-700 mb-2">              End Time            </label>            <input              type="time"              value={eventData.endTime}              onChange={(e) => handleInputChange('endTime', e.target.value)}              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"            />          </div>          <div className="md:col-span-2">            <label className="block text-sm font-medium text-gray-700 mb-2">              Event Image URL            </label>            <input              type="url"              value={eventData.image}              onChange={(e) => handleInputChange('image', e.target.value)}              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"              placeholder="https://example.com/image.jpg"            />          </div>        </div>      </div>    </div>  );  const renderStep2 = () => (    <div className="space-y-6">      <div>        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tickets & Pricing</h2>                <div className="mb-6">          <div className="flex items-center space-x-4">            <label className="flex items-center">              <input                type="radio"                checked={eventData.isFree}                onChange={() => {                  handleInputChange('isFree', true);                  // Reset ticket types to free                  setEventData(prev => ({                    ...prev,                    ticketTypes: prev.ticketTypes.map(ticket => ({ ...ticket, price: 0 }))                  }));                }}                className="mr-2"              />              <span className="text-sm font-medium text-gray-700">Free Event</span>            </label>            <label className="flex items-center">              <input                type="radio"                checked={!eventData.isFree}                onChange={() => handleInputChange('isFree', false)}                className="mr-2"              />              <span className="text-sm font-medium text-gray-700">Paid Event</span>            </label>          </div>        </div>        <div className="space-y-4">          <div className="flex items-center justify-between">            <h3 className="text-lg font-semibold text-gray-900">Ticket Types</h3>            <button              onClick={addTicketType}              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"            >              Add Ticket Type            </button>          </div>          {errors.tickets && <p className="text-sm text-red-600">{errors.tickets}</p>}          {eventData.ticketTypes.map((ticket, index) => (            <div key={ticket.id} className="p-6 border border-gray-200 rounded-lg space-y-4">              <div className="flex items-center justify-between">                <h4 className="font-medium text-gray-900">Ticket Type {index + 1}</h4>                {eventData.ticketTypes.length > 1 && (                  <button                    onClick={() => removeTicketType(index)}                    className="text-red-600 hover:text-red-800"                  >                    Remove                  </button>                )}              </div>              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">                <div>                  <label className="block text-sm font-medium text-gray-700 mb-2">                    Ticket Name                  </label>                  <input                    type="text"                    value={ticket.name}                    onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)}                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"                    placeholder="e.g., VIP, Regular"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (IDR)
                  </label>
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(e) => handleTicketTypeChange(index, 'price', parseInt(e.target.value) || 0)}
                    disabled={eventData.isFree}
                    min="0"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="0"
                  />
                  {ticket.price > 0 && (
                    <p className="mt-1 text-sm text-gray-600">{formatPrice(ticket.price)}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Seats
                  </label>
                  <input
                    type="number"
                    value={ticket.seats}
                    onChange={(e) => handleTicketTypeChange(index, 'seats', parseInt(e.target.value) || 0)}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={ticket.description || ''}
                  onChange={(e) => handleTicketTypeChange(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what this ticket includes..."
                />
              </div>
            </div>
          ))}

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Total Seats:</strong> {eventData.ticketTypes.reduce((sum, ticket) => sum + ticket.seats, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Promotions & Vouchers</h2>
        
        {/* Event Vouchers */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Event Vouchers</h3>
              <p className="text-sm text-gray-600">Create discount vouchers for this event</p>
            </div>
            <button
              onClick={() => setShowVoucherForm(!showVoucherForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {showVoucherForm ? 'Cancel' : 'Add Voucher'}
            </button>
          </div>

          {showVoucherForm && (
            <div className="p-6 border border-gray-200 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voucher Code
                  </label>
                  <input
                    type="text"
                    value={newVoucher.code}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., SAVE20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type
                  </label>
                  <select
                    value={newVoucher.discountType}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, discountType: e.target.value as 'percentage' | 'fixed' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (IDR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    value={newVoucher.discountValue}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, discountValue: parseInt(e.target.value) || 0 }))}
                    min="0"
                    max={newVoucher.discountType === 'percentage' ? 100 : undefined}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={newVoucher.discountType === 'percentage' ? '20' : '50000'}
                  />
                  <p className="mt-1 text-sm text-gray-600">
                    {newVoucher.discountType === 'percentage' 
                      ? `${newVoucher.discountValue}% discount` 
                      : `${formatPrice(newVoucher.discountValue)} discount`
                    }
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Uses
                  </label>
                  <input
                    type="number"
                    value={newVoucher.maxUses}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, maxUses: parseInt(e.target.value) || 0 }))}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid From
                  </label>
                  <input
                    type="datetime-local"
                    value={newVoucher.validFrom}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, validFrom: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Until
                  </label>
                  <input
                    type="datetime-local"
                    value={newVoucher.validUntil}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, validUntil: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Purchase (IDR)
                  </label>
                  <input
                    type="number"
                    value={newVoucher.minPurchase}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, minPurchase: parseInt(e.target.value) || 0 }))}
                    min="0"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                  {newVoucher.minPurchase > 0 && (
                    <p className="mt-1 text-sm text-gray-600">Minimum purchase: {formatPrice(newVoucher.minPurchase)}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowVoucherForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addVoucher}
                  disabled={!newVoucher.code.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  Add Voucher
                </button>
              </div>
            </div>
          )}

          {/* Voucher List */}
          {eventData.vouchers.length > 0 && (
            <div className="space-y-3">
              {eventData.vouchers.map((voucher, index) => (
                <div key={voucher.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-green-600">{voucher.code}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {voucher.discountType === 'percentage' 
                            ? `${voucher.discountValue}% OFF` 
                            : `${formatPrice(voucher.discountValue)} OFF`
                          }
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Valid: {new Date(voucher.validFrom).toLocaleDateString()} - {new Date(voucher.validUntil).toLocaleDateString()} | 
                        Max uses: {voucher.maxUses}
                        {voucher.minPurchase > 0 && ` | Min purchase: ${formatPrice(voucher.minPurchase)}`}
                      </div>
                    </div>
                    <button
                      onClick={() => removeVoucher(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Referral Voucher */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Referral Voucher</h3>
              <p className="text-sm text-gray-600">Create a voucher for new user registrations via referrals</p>
            </div>
            {!eventData.referralVoucher && (
              <button
                onClick={() => setShowReferralForm(!showReferralForm)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {showReferralForm ? 'Cancel' : 'Add Referral Voucher'}
              </button>
            )}
          </div>

          {showReferralForm && (
            <div className="p-6 border border-gray-200 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voucher Code
                  </label>
                  <input
                    type="text"
                    value={newReferralVoucher.code}
                    onChange={(e) => setNewReferralVoucher(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., REFER10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={newReferralVoucher.discountValue}
                    onChange={(e) => setNewReferralVoucher(prev => ({ ...prev, discountValue: parseInt(e.target.value) || 0 }))}
                    min="1"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Days
                  </label>
                  <input
                    type="number"
                    value={newReferralVoucher.validDays}
                    onChange={(e) => setNewReferralVoucher(prev => ({ ...prev, validDays: parseInt(e.target.value) || 0 }))}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowReferralForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addReferralVoucher}
                  disabled={!newReferralVoucher.code.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
                >
                  Add Referral Voucher
                </button>
              </div>
            </div>
          )}

          {/* Referral Voucher Display */}
          {eventData.referralVoucher && (
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-purple-600">{eventData.referralVoucher.code}</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {eventData.referralVoucher.discountValue}% OFF for New Users
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Valid for {eventData.referralVoucher.validDays} days after new user registration via referral link
                  </div>
                </div>
                <button
                  onClick={removeReferralVoucher}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const totalSeats = eventData.ticketTypes.reduce((sum, ticket) => sum + ticket.seats, 0);
    const hasValidTickets = eventData.ticketTypes.every(ticket => 
      ticket.name.trim() && ticket.seats > 0 && (eventData.isFree || ticket.price >= 0)
    );

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Publish</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            {/* Event Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Event Name</p>
                  <p className="font-medium">{eventData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium">{eventData.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{eventData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-medium">
                    {new Date(`${eventData.startDate}T${eventData.startTime}`).toLocaleString()}
                    {eventData.endDate && ` - ${new Date(`${eventData.endDate}T${eventData.endTime}`).toLocaleString()}`}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium">{eventData.description}</p>
                </div>
              </div>
            </div>

            {/* Tickets Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tickets</h3>
              <div className="space-y-2">
                {eventData.ticketTypes.map((ticket, index) => (
                  <div key={ticket.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      {ticket.description && <p className="text-sm text-gray-600">{ticket.description}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {eventData.isFree || ticket.price === 0 ? 'Free' : formatPrice(ticket.price)}
                      </p>
                      <p className="text-sm text-gray-600">{ticket.seats} seats</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Total Seats:</strong> {totalSeats}
                  </p>
                </div>
              </div>
            </div>

            {/* Promotions Summary */}
            {(eventData.vouchers.length > 0 || eventData.referralVoucher) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Promotions</h3>
                
                {eventData.vouchers.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Event Vouchers:</p>
                    <div className="space-y-1">
                      {eventData.vouchers.map(voucher => (
                        <div key={voucher.id} className="text-sm">
                          <span className="font-mono font-bold text-green-600">{voucher.code}</span> - 
                          <span className="ml-1">
                            {voucher.discountType === 'percentage' 
                              ? `${voucher.discountValue}% OFF` 
                              : `${formatPrice(voucher.discountValue)} OFF`
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {eventData.referralVoucher && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Referral Voucher:</p>
                    <div className="text-sm">
                      <span className="font-mono font-bold text-purple-600">{eventData.referralVoucher.code}</span> - 
                      <span className="ml-1">{eventData.referralVoucher.discountValue}% OFF for new users</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Validation Messages */}
            {!hasValidTickets && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  ⚠️ Please ensure all ticket types have valid names and seat counts.
                </p>
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                📝 Once you publish this event, it will be visible to users and they can start booking tickets.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute allowedRoles={['organizer']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
              <p className="text-gray-600 mt-2">Set up your event with tickets, promotions, and more</p>
            </div>

            {renderStepIndicator()}

            <div className="min-h-96">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex space-x-3">
                {currentStep < steps.length ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Publish Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default CreateEventPage;

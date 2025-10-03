export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ORGANIZER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  image?: string;
  capacity: number;
  organizerId: string;
  organizer?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description?: string;
  quantity: number;
  sold: number;
  eventId: string;
}

export interface Transaction {
  id: string;
  userId: string;
  eventId: string;
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  paymentMethod?: string;
  paymentReference?: string;
  pointsUsed?: number;
  voucherCode?: string;
  discountAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: string;
  ticketCode: string;
  userId: string;
  transactionId: string;
  ticketTypeId: string;
  status: 'ACTIVE' | 'USED' | 'CANCELLED';
  usedAt?: Date;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  eventId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

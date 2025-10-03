export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ORGANIZER' | 'ADMIN';
  profilePicture?: string;
  phoneNumber?: string;
  referralCode: string;
  referredBy?: string;
  pointsBalance: number;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date;
}

export interface Point {
  id: string;
  userId: string;
  amount: number;
  type: 'REFERRAL_BONUS' | 'EVENT_REWARD' | 'PURCHASE_CASHBACK' | 'EXPIRY_DEDUCTION';
  description?: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  type: 'REFERRAL_REWARD' | 'ORGANIZER_VOUCHER' | 'SYSTEM_PROMOTION';
  organizerId?: string;
  eventId?: string;
  userId?: string;
  expiresAt: Date;
  createdAt: Date;
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

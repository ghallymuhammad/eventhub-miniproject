# EventHub - Event Management Platform

## 📚 Beginner's Guide to Understanding and Modifying the Project

### 🎯 **Project Overview**

EventHub is a modern, full-stack event management platform built with Next.js, TypeScript, and Prisma. It allows users to discover and purchase event tickets, while organizers can create and manage events, handle transactions, and track analytics.

---

## 🚀 **Quick Start Guide**

### **1. Prerequisites**
```bash
# Required software:
- Node.js 18+ 
- PostgreSQL 14+
- Git
```

### **2. Installation**
```bash
# Clone the repository
git clone https://github.com/ghallymuhammad/eventhub-miniproject.git
cd eventhub-miniproject

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Return to root directory
cd ..
```

### **3. Environment Setup**
```bash
# Frontend environment (.env in frontend/)
NEXT_PUBLIC_API_URL="http://localhost:5000/api"

# Backend environment (.env in backend/)
DATABASE_URL="postgresql://username:password@localhost:5432/eventhub"
JWT_SECRET="your-jwt-secret-here"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000"
PORT=5000
```

### **4. Database Setup**
```bash
# Initialize database (run from backend directory)
cd backend
npx prisma migrate dev --name init

# Seed with sample data
npm run db:seed
```

### **5. Start Development**
```bash
# Terminal 1: Start Express backend
cd backend
npm run dev
# Backend available at: http://localhost:5000

# Terminal 2: Start Next.js frontend
cd frontend
npm run dev
# Frontend available at: http://localhost:3000
```

### **6. Test the Application**
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

### **🔧 Current Status (Express Migration)**
- ✅ **Frontend**: Next.js app ready for Express backend integration
- ✅ **Components**: All UI components working, API calls need updating
- 🚧 **Backend Migration**: Migrating from Next.js API routes to Express.js
- ⚠️ **Database**: Requires PostgreSQL setup and Prisma configuration
- 🚧 **Authentication**: Migrating from NextAuth to JWT-based auth
- 📋 **API Documentation**: Swagger/OpenAPI integration for Express routes

---

## 🏗️ **Project Architecture**

### **Tech Stack**
- **Frontend**: Next.js 15.1.6 with React 19, TypeScript 5.7.3, Tailwind CSS
- **Backend**: Express.js 4.x with TypeScript, CORS enabled for Next.js frontend
- **Database**: PostgreSQL with Prisma ORM 6.16.3
- **Authentication**: JWT tokens with bcryptjs for password hashing
- **API Documentation**: Swagger/OpenAPI for Express routes
- **Testing**: Jest with React Testing Library (frontend) + Supertest (backend API)
- **UI Components**: Headless UI 2.2.0, Heroicons 2.2.0
- **Validation**: Zod 4.1.11 for both frontend and backend
- **Notifications**: React Hot Toast (frontend)
- **Development**: Turbopack (frontend) + nodemon (backend)

### **Folder Structure**
```
eventhub-miniproject/
├── frontend/                     # Next.js Frontend Application
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Authentication pages (grouped layout)
│   │   │   ├── layout.tsx       # Auth-specific layout
│   │   │   ├── signin/page.tsx  # Login page
│   │   │   ├── signup/page.tsx  # Registration page
│   │   │   └── reset-password/page.tsx
│   │   ├── (default)/           # Main application pages
│   │   │   ├── layout.tsx       # Main app layout
│   │   │   ├── page.tsx         # Homepage (imports EventHomepage)
│   │   │   ├── events/          # Event-related pages
│   │   │   │   ├── [id]/page.tsx    # Event details page
│   │   │   │   └── page.tsx         # Events listing
│   │   │   ├── checkout/page.tsx    # Ticket checkout
│   │   │   ├── create-event/page.tsx # Event creation
│   │   │   ├── organizer/page.tsx   # Organizer dashboard
│   │   │   ├── payment/page.tsx     # Payment processing
│   │   │   ├── payment-proof/page.tsx # Upload payment proof
│   │   │   ├── transactions/page.tsx # Transaction history
│   │   │   └── reviews/page.tsx     # Reviews management
│   │   ├── css/                 # Global styles
│   │   │   ├── style.css        # Main stylesheet
│   │   │   └── additional-styles/   # Component-specific styles
│   │   └── layout.tsx           # Root application layout
│   ├── components/              # Reusable UI Components (same as before)
│   └── lib/                     # Frontend utilities
│       ├── api.ts               # API client for Express backend
│       └── auth.ts              # Frontend auth utilities
├── backend/                     # Express.js Backend Application
│   ├── src/
│   │   ├── controllers/         # Express route controllers
│   │   │   ├── authController.ts    # Authentication endpoints
│   │   │   ├── eventController.ts   # Event CRUD operations
│   │   │   ├── transactionController.ts # Transaction management
│   │   │   └── userController.ts    # User management
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.ts          # JWT authentication middleware
│   │   │   ├── cors.ts          # CORS configuration
│   │   │   ├── validation.ts    # Request validation with Zod
│   │   │   └── errorHandler.ts  # Global error handling
│   │   ├── routes/              # Express route definitions
│   │   │   ├── auth.ts          # POST /auth/login, /auth/register
│   │   │   ├── events.ts        # GET/POST/PUT/DELETE /events
│   │   │   ├── transactions.ts  # Transaction endpoints
│   │   │   └── index.ts         # Route aggregation
│   │   ├── services/            # Business logic layer (same structure)
│   │   │   ├── eventService.ts  # Event business rules
│   │   │   ├── transactionService.ts # Transaction processing
│   │   │   ├── authService.ts   # Authentication logic
│   │   │   └── userService.ts   # User operations
│   │   ├── lib/                 # Backend utilities
│   │   │   ├── prisma.ts        # Prisma client setup
│   │   │   ├── jwt.ts           # JWT token utilities
│   │   │   └── utils.ts         # Helper functions
│   │   └── types/               # TypeScript type definitions
│   │       ├── api.ts           # API request/response types
│   │       ├── auth.ts          # Authentication types
│   │       └── database.ts      # Database model types
│   ├── app.ts                   # Express app configuration
│   ├── server.ts                # Server startup file
│   ├── package.json             # Backend dependencies and scripts
│   ├── tsconfig.json            # Backend TypeScript configuration
│   ├── jest.config.js           # Backend testing configuration
│   └── .env                     # Backend environment variables
├── shared/                      # Shared code between frontend and backend
│   ├── types/                   # Shared TypeScript type definitions
│   │   ├── api.ts               # API request/response types
│   │   ├── auth.ts              # Authentication types
│   │   └── database.ts          # Database model types
│   └── utils/                   # Shared utility functions
├── prisma/                      # Database Management (shared)
│   ├── schema.prisma           # Database schema definition
│   ├── migrations/             # Database migration files
│   └── seed.ts                 # Database seeding script
├── docs/                       # Documentation
│   ├── USER_FLOW.md           # User flow documentation
│   └── API.md                 # Express API documentation
├── database/                   # Database Documentation
│   └── eventhub-schema.dbml   # Database schema visualization
└── Configuration Files
    ├── package.json           # Root package.json for scripts
    ├── docker-compose.yml     # Docker setup for PostgreSQL
    └── README.md              # Project overview and setup
```

---

## 🎨 **Component Architecture**

### **Key Components (Recently Fixed)**

#### **1. EventHomepage Component** ✅ **FIXED**
- **File**: `components/event-homepage.tsx` 
- **Purpose**: Main homepage displaying events with search, filtering, and pagination
- **Recent Fix**: Resolved JSX parsing error caused by duplicate export declarations
- **Features**:
  - Debounced search functionality (500ms delay)
  - Category-based filtering with icons
  - Location and price sorting
  - Responsive event grid layout
  - Animated background with particles
  - Loading states and error handling
  - Integration with `/api/events` endpoint

#### **2. Layout Components**
- **Root Layout** (`app/layout.tsx`): Global app wrapper
- **Auth Layout** (`app/(auth)/layout.tsx`): Authentication pages wrapper
- **Default Layout** (`app/(default)/layout.tsx`): Main app pages wrapper
- **Header Component** (`components/ui/header.tsx`): Navigation with user state
- **Footer Component** (`components/ui/footer.tsx`): Site footer

#### **3. Feature Components**
- **Countdown** (`components/Countdown.tsx`): Event countdown timer
- **TicketSelector** (`components/TicketSelector.tsx`): Ticket purchase interface
- **ProtectedRoute** (`components/ProtectedRoute.tsx`): Route authentication wrapper
- **UserRoleIndicator** (`components/UserRoleIndicator.tsx`): User role display

### **Express.js API Structure**
```
Backend Server (http://localhost:5000/api)
├── /auth                   # Authentication endpoints
│   ├── POST /auth/register             # User registration
│   ├── POST /auth/login                # User login
│   ├── POST /auth/logout               # User logout
│   ├── GET  /auth/me                   # Get current user
│   └── POST /auth/refresh              # Refresh JWT token
├── /events                 # Event management
│   ├── GET    /events                  # List events (with search, pagination)
│   ├── POST   /events                  # Create event (organizer only)
│   ├── GET    /events/:id              # Get event details
│   ├── PUT    /events/:id              # Update event (organizer only)
│   ├── DELETE /events/:id              # Delete event (organizer only)
│   └── GET    /events/:id/attendees    # Get event attendees
├── /transactions           # Transaction management
│   ├── GET    /transactions            # List user transactions
│   ├── POST   /transactions            # Create transaction
│   ├── GET    /transactions/:id        # Get transaction details
│   ├── PATCH  /transactions/:id        # Update transaction status
│   ├── POST   /transactions/:id/payment-proof # Upload payment proof
│   └── POST   /transactions/cleanup    # Auto-expire transactions (cron job)
├── /users                  # User management
│   ├── GET    /users/profile           # Get user profile
│   ├── PUT    /users/profile           # Update user profile
│   ├── GET    /users/points            # Get user points
│   └── GET    /users/coupons           # Get user coupons
└── /organizer              # Organizer-specific endpoints
    ├── GET    /organizer/stats         # Dashboard statistics
    ├── GET    /organizer/events        # Organizer's events
    └── GET    /organizer/transactions  # Organizer's transactions

Frontend (http://localhost:3000) communicates with Backend via HTTP/REST
```

---

## 👥 **User Roles and Permissions**

### **1. Regular User (USER)**
- **Can do:**
  - Register and login
  - Browse and search events
  - Purchase tickets
  - Use points and coupons
  - Leave reviews
  - Manage profile
  - Refer other users

### **2. Event Organizer (ORGANIZER)**
- **Can do everything a USER can, plus:**
  - Create, edit, and delete events
  - Manage event ticket types
  - View event analytics
  - Approve/reject transactions
  - View attendee lists
  - Create organizer-specific coupons

### **3. Admin (ADMIN)**
- **Future role for:**
  - System-wide management
  - User management
  - Global settings

---

## 🔄 **Complete User Flows**

### **1. User Registration Flow**
```mermaid
flowchart TD
    A[User visits signup] --> B[Fill registration form]
    B --> C{Has referral code?}
    C -->|Yes| D[Apply referral bonus]
    C -->|No| E[Standard registration]
    D --> F[Create account + Generate referral code]
    E --> F
    F --> G[Award welcome points]
    G --> H[Create welcome coupon]
    H --> I[Redirect to profile]
```

**Files involved:**
- `app/(auth)/signup/page.tsx` - Registration form
- `app/api/auth/signup/route.ts` - Registration API
- `src/services/userService.ts` - User creation logic

### **2. Event Discovery & Purchase Flow**
```mermaid
flowchart TD
    A[Browse events on homepage] --> B[Use search/filter]
    B --> C[View event details]
    C --> D[Click 'Get Ticket']
    D --> E[Checkout page]
    E --> F[Select quantity]
    F --> G[Apply coupon/points]
    G --> H[Enter payment info]
    H --> I[Submit transaction]
    I --> J[Status: PENDING]
    J --> K[Wait for organizer approval]
    K --> L[CONFIRMED → Receive tickets]
    K --> M[REJECTED → Refund points/coupons]
```

**Files involved:**
- `app/(default)/page.tsx` - Homepage with events
- `app/(default)/checkout/page.tsx` - Checkout process
- `app/api/events/route.ts` - Event listing API
- `src/services/eventService.ts` - Event business logic

### **3. Organizer Dashboard Flow**
```mermaid
flowchart TD
    A[Login as organizer] --> B[Access dashboard]
    B --> C{Select tab}
    C -->|Overview| D[View statistics & recent transactions]
    C -->|Events| E[Manage events - CRUD operations]
    C -->|Transactions| F[Approve/reject payments]
    F --> G[Transaction approval]
    G --> H[Award purchase points]
    G --> I[Send notification email]
    E --> J[Create/edit events]
    J --> K[Set ticket types & pricing]
```

**Files involved:**
- `app/(default)/organizer/page.tsx` - Dashboard interface
- `app/api/organizer/stats/route.ts` - Statistics API
- `app/api/organizer/transactions/route.ts` - Transaction management

---

## 💾 **Database Schema Explained**

### **Core Models**

#### **User Model**
```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String
  role            Role      @default(USER)
  
  // Referral system
  referralCode    String    @unique @default(cuid())
  referredBy      String?
  referrals       User[]    @relation("UserReferrals")
  
  // Relations to other models
  organizedEvents Event[]
  transactions    Transaction[]
  points          Point[]
  // ... more relations
}
```

**Key concepts:**
- Each user has a unique referral code
- Self-referencing relationship for referral system
- Role-based access control

#### **Event Model**
```prisma
model Event {
  id              String   @id @default(cuid())
  title           String
  date            DateTime
  location        String
  price           Float?
  capacity        Int
  
  // Foreign key to organizer
  organizerId     String
  organizer       User     @relation("EventOrganizer", fields: [organizerId], references: [id])
  
  // Related models
  ticketTypes     TicketType[]
  transactions    Transaction[]
}
```

#### **Transaction Model**
```prisma
model Transaction {
  id                String            @id @default(cuid())
  userId            String
  eventId           String
  totalAmount       Float
  pointsUsed        Int               @default(0)
  status            TransactionStatus @default(PENDING)
  couponId          String?
  
  // Relations
  user              User              @relation(fields: [userId], references: [id])
  event             Event             @relation(fields: [eventId], references: [id])
  coupon            Coupon?           @relation(fields: [couponId], references: [id])
}
```

### **Enums for Status Management**
```prisma
enum TransactionStatus {
  PENDING      // Waiting for organizer approval
  COMPLETED    // Successfully processed
  REJECTED     // Declined by organizer
  CANCELLED    // Cancelled by user
}

enum Role {
  USER         // Regular user
  ORGANIZER    // Event organizer
  ADMIN        // System administrator
}
```

---

## 🎯 **Key Features Deep Dive**

### **1. Referral System**
**How it works:**
1. Every user gets a unique referral code
2. New users can enter a referral code during signup
3. Both referrer and referee get rewards (points + coupons)

**Code location:**
```typescript
// In src/services/userService.ts
static async registerUser(userData, referralCode?) {
  // Create user with transaction for atomicity
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({...});
    
    if (referralCode) {
      // Find referrer and award bonuses
      const referrer = await tx.user.findUnique({...});
      // Award points and coupons to both users
    }
  });
}
```

### **2. Points System**
**How it works:**
1. Users earn points from referrals, events, purchases
2. Points have expiration dates (1 year)
3. Points can be used as currency for discounts
4. Expired points are automatically marked as used

**Code location:**
```typescript
// In src/services/pointsService.ts
static async addPoints(tx, userId, amount, description, eventId?) {
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  
  return await tx.points.create({
    data: { userId, amount, description, expiresAt }
  });
}
```

### **3. Coupon System**
**Types of coupons:**
- **System coupons**: Created by admins for all users
- **Organizer coupons**: Event-specific discounts
- **Referral rewards**: Automatic coupons for new users

**Code location:**
```typescript
// In src/services/couponService.ts
static async validateCoupon(code, userId, eventId?) {
  const coupon = await prisma.coupon.findFirst({
    where: { 
      code, 
      isActive: true,
      expiresAt: { gt: new Date() },
      // Additional validation logic
    }
  });
  
  return { isValid: !!coupon, coupon, error: null };
}
```

### **4. Transaction Management**
**Transaction lifecycle:**
1. **PENDING**: User submits payment, awaiting approval
2. **CONFIRMED**: Organizer approves, tickets issued, points awarded
3. **REJECTED**: Organizer rejects, refunds processed atomically

**Code location:**
```typescript
// In app/api/organizer/transactions/[id]/route.ts
export async function PATCH(request, { params }) {
  await prisma.$transaction(async (tx) => {
    // Update transaction status
    const transaction = await tx.transaction.update({...});
    
    if (status === 'REJECTED') {
      // Refund points and coupons
      // Restore event seats
    } else if (status === 'CONFIRMED') {
      // Award purchase points (2% of amount)
    }
  });
}
```

---

## 🛠️ **How to Modify and Extend**

### **1. Adding a New Feature**

#### **Example: Adding Event Categories**

**Step 1: Update Database Schema**
```prisma
// In prisma/schema.prisma
model EventCategory {
  id          String  @id @default(cuid())
  name        String  @unique
  description String?
  icon        String?
  createdAt   DateTime @default(now())
  
  events      Event[]
}

model Event {
  // ...existing fields
  categoryId  String
  category    EventCategory @relation(fields: [categoryId], references: [id])
}
```

**Step 2: Create Migration**
```bash
npx prisma migrate dev --name add-event-categories
```

**Step 3: Update Service Layer**
```typescript
// In src/services/eventService.ts
export class EventService {
  static async getEventsByCategory(categoryId: string) {
    return await prisma.event.findMany({
      where: { categoryId },
      include: { category: true }
    });
  }
}
```

**Step 4: Update API Routes**
```typescript
// In app/api/categories/route.ts
export async function GET() {
  const categories = await prisma.eventCategory.findMany();
  return NextResponse.json(categories);
}
```

**Step 5: Update Frontend**
```typescript
// In components/CategoryFilter.tsx
const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);
  
  return (
    <select onChange={handleCategoryChange}>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  );
};
```

### **2. Modifying Existing Features**

#### **Example: Changing Point Expiry from 1 year to 6 months**

**File:** `src/services/pointsService.ts`
```typescript
// Change this line:
expiresAt.setFullYear(expiresAt.getFullYear() + 1);

// To this:
expiresAt.setMonth(expiresAt.getMonth() + 6);
```

#### **Example: Adding Email Notifications**

**Step 1: Install email service**
```bash
pnpm add nodemailer @types/nodemailer
```

**Step 2: Create email service**
```typescript
// In src/services/emailService.ts
import nodemailer from 'nodemailer';

export class EmailService {
  static async sendTransactionConfirmation(user, transaction) {
    const transporter = nodemailer.createTransporter({...});
    
    await transporter.sendMail({
      to: user.email,
      subject: 'Transaction Confirmed',
      html: `Your transaction ${transaction.id} has been confirmed!`
    });
  }
}
```

**Step 3: Integrate into transaction flow**
```typescript
// In app/api/organizer/transactions/[id]/route.ts
if (status === 'CONFIRMED') {
  // ...existing code
  await EmailService.sendTransactionConfirmation(transaction.user, transaction);
}
```

---

## 🧪 **Testing Guide**

### **Running Tests**
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage
```

### **Writing New Tests**

#### **Service Test Example**
```typescript
// In __tests__/eventService.test.ts
import { EventService } from '../src/services/eventService';
import { prisma } from '../src/lib/prisma';

// Mock Prisma
jest.mock('../src/lib/prisma');

describe('EventService', () => {
  it('should create event with correct data', async () => {
    const mockEvent = { id: '1', title: 'Test Event' };
    prisma.event.create.mockResolvedValue(mockEvent);
    
    const result = await EventService.createEvent('organizer1', {
      title: 'Test Event',
      date: new Date(),
      location: 'Test Location'
    });
    
    expect(result).toEqual(mockEvent);
  });
});
```

#### **API Route Test Example**
```typescript
// In __tests__/api/events.test.ts
import { GET } from '../app/api/events/route';

describe('/api/events', () => {
  it('should return events list', async () => {
    const request = new Request('http://localhost/api/events');
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data.events)).toBe(true);
  });
});
```

---

## 🗄️ **Database Management**

### **Common Prisma Commands**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database (careful!)
npx prisma migrate reset

# Seed database with sample data
pnpm db:seed

# Open Prisma Studio (database GUI)
npx prisma studio
```

### **Sample Data**
The project includes seed data with:
- **3 users**: 1 organizer, 2 regular users
- **3 events**: Different categories and dates
- **Sample transactions**: Various statuses
- **Points and coupons**: For testing the reward system

**Login credentials:**
- Organizer: `organizer@example.com` / `password123`
- User 1: `user1@example.com` / `password123`
- User 2: `user2@example.com` / `password123`

---

## 🚀 **Development Workflow**

### **1. Setting Up Development Environment**
```bash
# Clone and install
git clone https://github.com/ghallymuhammad/eventhub-miniproject.git
cd eventhub-miniproject
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and NextAuth secret

# Run database migrations
npx prisma migrate dev

# Seed database
pnpm db:seed

# Start development server
pnpm dev
```

### **2. Making Changes**
1. **Database changes**: Update `schema.prisma` → run migration
2. **API changes**: Modify files in `app/api/` or `src/`
3. **Frontend changes**: Modify components or pages
4. **Test changes**: Write/update tests in `__tests__/`

### **3. Code Style Guidelines**
- Use TypeScript for all new code
- Follow the MVC pattern (Controller → Service → Database)
- Write tests for business logic
- Use proper error handling with try-catch
- Validate input data with Zod or similar
- Use descriptive variable and function names

---

## 🔧 **Troubleshooting Common Issues**

### **1. Database Connection Issues**
```bash
# Check if PostgreSQL is running
pg_ctl status

# Verify DATABASE_URL in .env
# Format: postgresql://username:password@localhost:5432/database_name
```

### **2. NextAuth Configuration**
```bash
# Make sure NEXTAUTH_SECRET is set in .env
# Generate a new secret:
openssl rand -base64 32
```

### **3. Prisma Client Issues**
```bash
# Regenerate Prisma client
npx prisma generate

# If schema changes aren't reflected:
rm -rf node_modules/.prisma
npx prisma generate
```

### **4. TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Common issues:
# - Missing type definitions
# - Incorrect import paths
# - Prisma client not generated
```

### **5. JSX Parsing Errors**
```bash
# If you encounter JSX parsing errors:
# 1. Check for duplicate exports
# 2. Ensure proper function declarations
# 3. Verify all JSX tags are properly closed
# 4. Check for syntax errors in template literals

# Example of correct component structure:
function MyComponent() {
  return (
    <div>
      {/* Content */}
    </div>
  );
}

export default MyComponent; // Single export at bottom
```

### **6. Database Connection Issues**
```bash
# If Prisma client fails to connect:
# 1. Verify DATABASE_URL in .env
# 2. Check database server is running
# 3. Verify credentials are correct
# 4. Test connection:
npx prisma db push --force-reset

# For PostgreSQL connection string format:
# DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

### **7. Development Server Issues**
```bash
# If Next.js dev server fails to start:
# 1. Clear Next.js cache:
rm -rf .next

# 2. Clear node_modules and reinstall:
rm -rf node_modules package-lock.json
npm install

# 3. Check for port conflicts:
lsof -ti:3000 | xargs kill -9  # Kill processes on port 3000

# 4. Start with Turbopack (faster):
npm run dev  # Uses --turbopack flag
```

---

## 🎉 **Express Migration Status**

### **✅ Completed Backend Setup**
The Express.js backend has been successfully created with the following components:

#### **Backend Structure Created:**
- ✅ **Express Server** (`backend/src/server.ts`) - Complete with middleware, CORS, security
- ✅ **Authentication System** - JWT-based auth with registration, login, logout
- ✅ **Middleware Stack** - Error handling, authentication, validation, rate limiting
- ✅ **Prisma Integration** - Database client with graceful shutdown
- ✅ **API Documentation** - Swagger/OpenAPI setup at `/api-docs`
- ✅ **Development Setup** - Nodemon, TypeScript configuration, environment setup

#### **Frontend Integration:**
- ✅ **API Client** (`lib/api.ts`) - Complete client for all backend endpoints
- 🚧 **Component Updates** - Components need to be updated to use new API client
- 🚧 **Authentication Migration** - Move from NextAuth to JWT-based auth

### **🚀 Next Steps to Complete Migration**

#### **1. Install Backend Dependencies**
```bash
cd backend
npm install
```

#### **2. Setup Environment**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database credentials and JWT secret
nano .env
```

#### **3. Move Prisma Configuration**
```bash
# Move Prisma files to backend
mv prisma backend/
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

#### **4. Start Both Servers**
```bash
# Terminal 1: Backend
cd backend
npm run dev
# Server running on http://localhost:5000

# Terminal 2: Frontend (existing)
npm run dev
# Frontend running on http://localhost:3000
```

#### **5. Test API Endpoints**
Visit `http://localhost:5000/api-docs` to see the interactive API documentation.

### **🔄 Component Migration Guide**

Update your frontend components to use the new API client:

**Before (NextAuth):**
```typescript
import { useSession } from 'next-auth/react';

const { data: session } = useSession();
const response = await fetch('/api/events');
```

**After (Express API Client):**
```typescript
import { apiClient } from '@/lib/api';

const user = await apiClient.getMe();
const events = await apiClient.getEvents();
```

---

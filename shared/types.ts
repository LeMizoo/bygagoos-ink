// Shared TypeScript types for ByGagoos-Ink

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  familyRole?: FamilyRole;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'family_member' | 'client';
export type FamilyRole = 'structure' | 'inspiration' | 'creation' | 'communication';

export interface FamilyMember extends User {
  skills: string[];
  certifications: string[];
  currentRole: FamilyRole;
  availability: Availability;
  performanceMetrics: PerformanceMetrics;
}

export interface Availability {
  [day: string]: string[]; // e.g., { "monday": ["09:00-12:00", "14:00-17:00"] }
}

export interface PerformanceMetrics {
  productivity: number; // 0-100
  quality: number; // 0-100
  efficiency: number; // 0-100
  lastUpdated: Date;
}

export interface Client extends User {
  companyName?: string;
  clientType: ClientType;
  address: Address;
  taxId?: string;
  loyaltyPoints: number;
  totalSpent: number;
  preferences: ClientPreferences;
}

export type ClientType = 'school' | 'business' | 'association' | 'individual';

export interface Address {
  street: string;
  city: string;
  postalCode?: string;
  country: string;
}

export interface ClientPreferences {
  preferredContact: 'email' | 'whatsapp' | 'phone';
  newsletter: boolean;
  language: 'fr' | 'mg' | 'en';
}

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  depositPaid: number;
  finalPaid: number;
  deliveryDate: Date;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'in_production'
  | 'quality_check'
  | 'ready'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  tshirtColor: string;
  size: TShirtSize;
  quantity: number;
  unitPrice: number;
  designUrl: string;
  printPosition: PrintPosition;
  inkColors: number;
}

export type TShirtSize = '4ans' | '6ans' | '8ans' | '10ans' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type PrintPosition = 'center' | 'left' | 'right' | 'back' | 'pocket';

export interface Production {
  id: string;
  orderItemId: string;
  assignedTo: string;
  status: ProductionStatus;
  startTime?: Date;
  endTime?: Date;
  photos: string[];
  qualityScore?: number; // 1-5
  notes?: string;
}

export type ProductionStatus = 
  | 'waiting'
  | 'preparation'
  | 'printing'
  | 'drying'
  | 'quality_check'
  | 'packaging'
  | 'done';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard Stats
export interface DashboardStats {
  orders: {
    total: number;
    pending: number;
    inProduction: number;
    completedToday: number;
  };
  production: {
    dailyCapacity: number;
    producedToday: number;
    efficiency: number;
  };
  financials: {
    revenueToday: number;
    revenueMonth: number;
    pendingPayments: number;
  };
  quality: {
    averageScore: number;
    defectsToday: number;
    satisfactionRate: number;
  };
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  itemType: 'tshirt' | 'ink' | 'screen' | 'chemical';
  itemName: string;
  color?: string;
  size?: string;
  quantity: number;
  minimumStock: number;
  unitCost: number;
  lastRestock: Date;
  supplier: string;
}

// Quality Check Types
export interface QualityCheck {
  id: string;
  productionId: string;
  checkedBy: string;
  checkType: 'pre_print' | 'post_print' | 'final';
  defects: Defect[];
  passed: boolean;
  notes?: string;
  createdAt: Date;
}

export interface Defect {
  type: DefectType;
  severity: 'minor' | 'major' | 'critical';
  description: string;
  position?: string;
}

export type DefectType = 
  | 'smudge'
  | 'color_mismatch'
  | 'misalignment'
  | 'fading'
  | 'stain'
  | 'tear'
  | 'other';

// Time Tracking
export interface TimeTracking {
  id: string;
  familyMemberId: string;
  date: Date;
  checkIn: Date;
  checkOut?: Date;
  breaks: Break[];
  projectId?: string;
  taskDescription?: string;
}

export interface Break {
  start: string;
  end: string;
  type: 'coffee' | 'lunch' | 'break' | 'meeting';
}

// Invoice Types
export interface Invoice {
  id: string;
  orderId: string;
  invoiceNumber: string;
  amount: number;
  vatAmount: number;
  status: InvoiceStatus;
  dueDate: Date;
  paidAt?: Date;
  paymentMethod?: PaymentMethod;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';
export type PaymentMethod = 'cash' | 'mobile_money' | 'bank_transfer' | 'credit_card';
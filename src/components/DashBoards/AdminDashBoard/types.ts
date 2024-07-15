// types.ts
export interface User {
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  contact_phone?: string;
  address?: string;
  role: string;
  created_at?: string;
  updated_at?: string;
  password: string;
  
}


  
  export interface Vehicle {
    id: number;
    name: string;
    category: string;
    rate: number;
  }
  
  export interface Booking {
    id: number;
    userId: number;
    vehicleId: number;
    date: string;
    status: string;
  }
  
  export interface Payment {
    id: number;
    bookingId: number;
    amount: number;
    date: string;
  }
  
  export interface SupportTicket {
    id: number;
    userId: number;
    issue: string;
    status: string;
  }
  
  export interface Location {
    id: number;
    name: string;
    address: string;
  }
  
  export interface Fleet {
    id: number;
    vehicleId: number;
    acquisitionDate: string;
    maintenanceStatus: string;
  }
  
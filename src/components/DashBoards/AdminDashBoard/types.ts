// types.ts

export interface User {
    id: string;
    username: string;
    email: string;
    role: string; // 'admin' or 'user'
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
  
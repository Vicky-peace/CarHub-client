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




export interface Booking {
  id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupportTicket {

  ticket_id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Location {
  location_id: number;
  name: string;
  address: string;
  contact_phone: string;
  created_at?: string;
  updated_at?: string;
}

export interface Fleet {
  error: any;
  fleet_id: number;
  vehicle_id: number;
  acquisition_date: string;
  depreciation_rate: number;
  current_value: number;
  maintenance_cost: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}


// ./types.ts
export interface Vehicle {
  error: any;
  vehicle_id: number;
  vehicleSpec_id: number | null;
  rental_rate: string;
  availability: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  vehicleSpec: {
    manufacturer: string; 
    model: string;
    year: number;
    fuel_type: string;
    engine_capacity?: string | null;
    transmission?: string | null;
    seating_capacity?: number | null;
    color?: string | null;
    features?: string | null;
  };
}


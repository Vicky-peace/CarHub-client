// booking.ts
export type Booking = {
    booking_id: string;
    user_id: string;
    vehicle_id: string;
    location_id: string;
    booking_date: string;
    return_date: string;
    total_amount: number;
    booking_status: string;
  };
  

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  title: string;
  description: string;
  quantity: string;
  expiryTime: string;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  imageUrl?: string;
  status: 'open' | 'claimed' | 'delivered' | 'expired';
  createdAt: string;
  claimedBy?: string;
  claimedAt?: string;
  deliveredAt?: string;
  volunteerName?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'donor' | 'volunteer' | 'admin';
  phone?: string;
  location?: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  createdAt: string;
  totalDonations?: number;
  totalClaims?: number;
}

export interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    zipCode: string;
  };
  images: string[];
  coverImage: string;
  videos: string[];
  features: string[];
  bedrooms: number;
  bathrooms: number;
  sqMeters: number;
  garage: boolean;
  pool: boolean;
  garden: boolean;
  yearBuilt: number;
  amenities: string[];
  acceptedCryptos: string[];
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface PropertyFilter {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  hasPool?: boolean;
  hasGarage?: boolean;
  city?: string;
  sortBy?: 'price' | 'date' | 'newest' | 'popular';
}

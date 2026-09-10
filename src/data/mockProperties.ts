import type { Property } from '@/types/Property';
import raw from './properties.generated.json';

type RawProperty = {
  id?: string;
  title?: string;
  zone?: string;
  city?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area_m2?: number;
  image?: string;
  images?: string[];
  description?: string;
  status?: string;
};

const nowIso = () => new Date().toISOString();

const toProperty = (item: RawProperty, idx: number): Property => {
  const cover = item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6';
  const gallery = (item.images && item.images.length > 0 ? item.images : [cover]).filter(Boolean);

  return {
    id: item.id || `prop-${idx + 1}`,
    name: item.title || 'Vivienda',
    description: item.description || 'Propiedad disponible en viviendanova.casa',
    price: typeof item.price === 'number' ? item.price : 0,
    currency: 'EUR',

    location: {
      address: item.zone || '',
      city: item.city || '',
      country: 'España',
      lat: 0,
      lng: 0,
      zipCode: ''
    },

    images: gallery,
    coverImage: cover,
    videos: [],

    features: [],
    bedrooms: typeof item.bedrooms === 'number' ? item.bedrooms : 0,
    bathrooms: typeof item.bathrooms === 'number' ? item.bathrooms : 0,
    sqMeters: typeof item.area_m2 === 'number' ? item.area_m2 : 0,

    garage: false,
    pool: false,
    garden: false,
    yearBuilt: 2020,

    amenities: [],
    acceptedCryptos: [],

    createdAt: nowIso(),
    updatedAt: nowIso(),
    active: item.status ? item.status !== 'inactivo' : true
  };
};

const mockProperties: Property[] = (raw as RawProperty[]).map(toProperty);
export default mockProperties;

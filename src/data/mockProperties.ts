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
  type?: string;
  operation?: string;
  image?: string;
  images?: string[];
  description?: string;
  status?: string;
};

const toProperty = (item: RawProperty, idx: number): Property => {
  const cover = item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6';
  const gallery = (item.images && item.images.length > 0 ? item.images : [cover]).filter(Boolean);
  const price = typeof item.price === 'number' && !Number.isNaN(item.price) ? item.price : 0;
  const beds = typeof item.bedrooms === 'number' ? item.bedrooms : 0;
  const baths = typeof item.bathrooms === 'number' ? item.bathrooms : 0;
  const meters = typeof item.area_m2 === 'number' ? item.area_m2 : 0;

  const property: Property = {
    id: item.id || `prop-${idx + 1}`,
    name: item.title || 'Vivienda',
    title: item.title || 'Vivienda',
    description: item.description || 'Propiedad disponible en viviendanova.casa',

    price,
    currency: 'EUR',
    operation: item.operation || 'venta',
    propertyType: item.type || 'vivienda',

    bedrooms: beds,
    bathrooms: baths,
    area: meters,
    areaUnit: 'm²',
    sqMeters: meters,

    garage: false,
    pool: false,
    garden: false,
    terrace: false,
    furnished: false,

    videos: [],

    location: {
      address: item.zone || '',
      city: item.city || '',
      country: 'España',
      lat: 0,
      lng: 0,
      zipCode: ''
    },

    coverImage: cover,
    images: gallery,

    features: [],
    tags: [],

    status: item.status || 'disponible',
    isFeatured: true,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return property;
};

const mockProperties: Property[] = (raw as RawProperty[]).map(toProperty);
export default mockProperties;

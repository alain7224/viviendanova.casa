import React, { useState } from 'react';
import { useTranslation } from '@utils/translations';

interface PropertyDetailProps {
  propertyId: string;
  onClose?: () => void;
  isOpen?: boolean;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({
  propertyId,
  onClose,
  isOpen = true,
}) => {
  const t = useTranslation('es');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  // Mock property - replace with real data
  const property = {
    id: propertyId,
    name: 'Luxury Villa with Ocean View',
    price: 850000,
    currency: 'EUR',
    description: 'Beautiful villa with stunning ocean views and modern amenities',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003cedd07?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    ],
    bedrooms: 5,
    bathrooms: 3,
    sqMeters: 450,
    features: ['Pool', 'Garage', 'Garden', 'Gym'],
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-600 bg-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          ✕
        </button>

        {/* Image carousel */}
        <div className="relative w-full h-96 bg-gray-200">
          <img
            src={property.images[currentImageIndex]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() =>
              setCurrentImageIndex((i) => (i - 1 + property.images.length) % property.images.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((i) => (i + 1) % property.images.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl"
          >
            ›
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
          <p className="text-3xl font-bold text-primary mb-4">
            {property.price.toLocaleString()} {property.currency}
          </p>
          <p className="text-gray-600 mb-6">{property.description}</p>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">🛏️</p>
              <p className="font-semibold">{property.bedrooms}</p>
              <p className="text-sm text-gray-600">{t('bedrooms')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">🚿</p>
              <p className="font-semibold">{property.bathrooms}</p>
              <p className="text-sm text-gray-600">{t('bathrooms')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">📐</p>
              <p className="font-semibold">{property.sqMeters}</p>
              <p className="text-sm text-gray-600">m²</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">⭐</p>
              <p className="font-semibold">4.9</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">{t('features')}</h3>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <span key={feature} className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Contactar Ahora
            </button>
            <button className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

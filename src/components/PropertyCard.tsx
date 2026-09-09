import React from 'react';
import { useDeviceType } from '@hooks/useDeviceType';
import { useTranslation } from '@utils/translations';

interface PropertyCardProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  acceptedCryptos: string[];
  style?: 'flat' | 'three_d' | 'shadow' | 'frame' | 'grid' | 'minimal';
  onClick?: () => void;
}

const cardStyles = {
  flat: 'shadow-sm hover:shadow-md transition-shadow duration-300',
  three_d: 'shadow-lg hover:-translate-y-1 transition-all duration-300 perspective',
  shadow: 'shadow-xl hover:shadow-2xl transition-shadow duration-300',
  frame: 'border-8 border-gray-200 p-4 hover:border-primary transition-colors',
  grid: 'grid grid-cols-2 gap-2 shadow-md hover:shadow-lg',
  minimal: 'border-b-2 border-accent p-4 hover:bg-gray-50 transition-colors',
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  name,
  price,
  currency,
  image,
  bedrooms,
  bathrooms,
  features,
  acceptedCryptos,
  style = 'flat',
  onClick,
}) => {
  const deviceType = useDeviceType();
  const t = useTranslation('es');

  return (
    <div
      className={`property-card ${cardStyles[style]} rounded-lg overflow-hidden cursor-pointer animate-fadeInUp`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {acceptedCryptos.length > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
            🪙 {acceptedCryptos.slice(0, 2).join(' · ')}
          </div>
        )}
        <button
          className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          📍
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="text-lg md:text-xl font-bold text-text mb-2 line-clamp-2">
          {name}
        </h3>

        <p className="text-2xl md:text-3xl font-bold text-primary mb-3">
          {price.toLocaleString()} {currency}
        </p>

        {/* Features */}
        <div className="flex gap-4 mb-3 text-sm md:text-base">
          <span className="flex items-center gap-1">
            🛏️ {bedrooms} {t('bedrooms')}
          </span>
          <span className="flex items-center gap-1">
            🚿 {bathrooms} {t('bathrooms')}
          </span>
        </div>

        {/* Features tags */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {features.slice(0, deviceType === 'mobile' ? 2 : 4).map((feature) => (
              <span
                key={feature}
                className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* View button */}
        <button className="w-full bg-accent text-white py-2 rounded font-semibold hover:bg-accent/90 transition-colors">
          {t('features')}
        </button>
      </div>
    </div>
  );
};

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
  onClick?: () => void;
}

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
  onClick,
}) => {
  const deviceType = useDeviceType();
  const t = useTranslation('es');
  const [imageError, setImageError] = React.useState(false);

  const FALLBACK_IMAGE =
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1200&auto=format&fit=crop';

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:ring-1 hover:ring-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 backdrop-blur-sm"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden bg-slate-950">
        <img
          src={imageError ? FALLBACK_IMAGE : image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Crypto Badge */}
        {acceptedCryptos.length > 0 && (
          <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-500/40">
            🪙 {acceptedCryptos.slice(0, 2).join(' • ')}
          </div>
        )}

        {/* Location Button */}
        <button
          className="absolute bottom-3 right-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          aria-label="View property location"
        >
          📍
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 md:p-5 space-y-3">
        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-slate-100 line-clamp-2 group-hover:text-cyan-300 transition-colors">
          {name}
        </h3>

        {/* Price */}
        <p className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-tight">
          USD {price.toLocaleString('es-DO')}
        </p>

        {/* Specs */}
        <div className="flex gap-4 text-sm md:text-base text-slate-300">
          <span className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
            <span className="text-lg">🛏️</span>
            {bedrooms} {t('bedrooms')}
          </span>
          <span className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
            <span className="text-lg">🚿</span>
            {bathrooms} {t('bathrooms')}
          </span>
        </div>

        {/* Features Tags */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {features.slice(0, deviceType === 'mobile' ? 2 : 3).map((feature) => (
              <span
                key={feature}
                className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-md border border-cyan-500/30 font-medium hover:bg-cyan-500/30 transition-colors"
              >
                {feature}
              </span>
            ))}
            {features.length > (deviceType === 'mobile' ? 2 : 3) && (
              <span className="text-xs bg-slate-800/50 text-slate-400 px-2 py-1 rounded-md border border-slate-700/50">
                +{features.length - (deviceType === 'mobile' ? 2 : 3)}
              </span>
            )}
          </div>
        )}

        {/* CTA Button */}
        <button
          className="w-full mt-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-2.5 px-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 group-hover:translate-y-0 translate-y-0 active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          {t('features')} →
        </button>
      </div>
    </div>
  );
};

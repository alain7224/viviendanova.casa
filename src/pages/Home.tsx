import React, { useState } from 'react';
import { PropertyCard } from '@components/PropertyCard';
import { PropertyMap } from '@components/PropertyMap';
import { PropertyDetail } from '@components/PropertyDetail';
import { usePropertyStore } from '@stores/propertyStore';
import { useDeviceType } from '@hooks/useDeviceType';

interface HomeProps {
  onAdminClick?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onAdminClick }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const properties = usePropertyStore((state) => state.properties);
  const deviceType = useDeviceType();

  React.useEffect(() => {
    usePropertyStore.getState().fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encuentra tu Vivienda Perfecta
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Miles de propiedades disponibles en todo el país
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <input
              type="text"
              placeholder="Buscar propiedades..."
              className="px-6 py-3 rounded-lg text-text w-full md:w-96"
            />
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-text">Propiedades Destacadas</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-text hover:bg-gray-300'
            }`}
          >
            📊 Grid
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              viewMode === 'map'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-text hover:bg-gray-300'
            }`}
          >
            🗺️ Mapa
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                name={property.name}
                price={property.price}
                currency={property.currency}
                image={property.coverImage}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                features={property.features}
                acceptedCryptos={property.acceptedCryptos}
                style="flat"
                onClick={() => setSelectedPropertyId(property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-96 md:h-[600px] rounded-lg overflow-hidden">
            <PropertyMap
              properties={properties}
              onSelectProperty={setSelectedPropertyId}
              selectedPropertyId={selectedPropertyId}
            />
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPropertyId && (
        <PropertyDetail
          propertyId={selectedPropertyId}
          isOpen={true}
          onClose={() => setSelectedPropertyId(null)}
        />
      )}
    </div>
  );
};

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
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 via-slate-900 to-slate-950 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Encuentra tu Vivienda Perfecta
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Miles de propiedades disponibles en todo el país, con información clara y actualizada
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <input
              type="text"
              placeholder="Buscar propiedades..."
              className="px-6 py-3 rounded-lg text-slate-900 w-full md:w-96 bg-slate-100 border border-slate-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center border-b border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Propiedades Destacadas</h2>
        <div className="flex gap-2 bg-slate-900/40 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            📊 Grid
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              viewMode === 'map'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            🗺️ Mapa
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
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
                onClick={() => setSelectedPropertyId(property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-96 md:h-[600px] rounded-xl overflow-hidden border border-slate-800 shadow-lg">
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

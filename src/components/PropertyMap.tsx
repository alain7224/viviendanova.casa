import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Property } from '@/types/Property';

interface PropertyMapProps {
  properties: Property[];
  onSelectProperty?: (propertyId: string) => void;
  selectedPropertyId?: string | null;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  onSelectProperty,
  selectedPropertyId,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([41.3851, 2.1734], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Add markers
    properties.forEach((prop) => {
      const marker = L.marker([prop.location.lat, prop.location.lng])
        .bindPopup(prop.name)
        .addTo(map.current!);

      marker.on('click', () => {
        setExpandedId(prop.id);
        onSelectProperty?.(prop.id);
      });

      markersRef.current[prop.id] = marker;
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [properties, onSelectProperty]);

  const selectedProperty = properties.find((p) => p.id === expandedId);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />

      {/* Expanded card with arrow pointer */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-xs">
          {/* Arrow SVG pointer */}
          <svg
            className="absolute -bottom-2 left-4 w-4 h-2"
            viewBox="0 0 10 10"
            fill="white"
          >
            <polygon points="5,10 10,0 0,0" />
          </svg>

          {/* Close button */}
          <button
            onClick={() => setExpandedId(null)}
            className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          {/* Content */}
          <img
            src={selectedProperty.coverImage}
            alt={selectedProperty.name}
            className="w-full h-32 object-cover rounded mb-2"
          />
          <h3 className="text-lg font-bold mb-2">{selectedProperty.name}</h3>
          <p className="text-2xl font-bold text-primary mb-2">
            {selectedProperty.price.toLocaleString()} {selectedProperty.currency}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            {selectedProperty.location.address}
          </p>
          <button className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90">
            Ver Detalles
          </button>
        </div>
      )}
    </div>
  );
};

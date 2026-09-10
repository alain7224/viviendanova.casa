import { create } from 'zustand';
import type { Property } from '@/types/Property';

interface PropertyStore {
  properties: Property[];
  filteredProperties: Property[];
  isLoading: boolean;
  selectedProperty: Property | null;

  fetchProperties: () => Promise<void>;
  filterProperties: (filters: any) => void;
  selectProperty: (id: string | null) => void;
  addProperty: (property: Property) => Promise<void>;
  updateProperty: (id: string, updates: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  filteredProperties: [],
  isLoading: false,
  selectedProperty: null,

  fetchProperties: async () => {
    set({ isLoading: true });
    try {
      // Mock data - replace with real API
      const mockProperties = await import('@data/mockProperties').then(
        (m) => m.default
      );
      set({ properties: mockProperties, filteredProperties: mockProperties });
    } finally {
      set({ isLoading: false });
    }
  },

  filterProperties: (filters) => {
    const { properties } = get();
    let filtered = properties;

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice);
    }
    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms);
    }
    if (filters.hasPool) {
      filtered = filtered.filter((p) => p.pool);
    }
    if (filters.city) {
      filtered = filtered.filter(
        (p) => p.location.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    set({ filteredProperties: filtered });
  },

  selectProperty: (id) => {
    if (!id) {
      set({ selectedProperty: null });
      return;
    }
    const { properties } = get();
    const selected = properties.find((p) => p.id === id);
    set({ selectedProperty: selected || null });
  },

  addProperty: async (property) => {
    set((state) => ({
      properties: [...state.properties, property],
    }));
  },

  updateProperty: async (id, updates) => {
    set((state) => ({
      properties: state.properties.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  },

  deleteProperty: async (id) => {
    set((state) => ({
      properties: state.properties.filter((p) => p.id !== id),
    }));
  },
}));

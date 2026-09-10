import { create } from 'zustand';
import type { AdminUser, AdminSession, AdminSettings } from '@/types/Admin';

interface AdminStore {
  user: AdminUser | null;
  session: AdminSession | null;
  settings: AdminSettings | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  updateSettings: (settings: Partial<AdminSettings>) => Promise<void>;
}

const defaultSettings: AdminSettings = {
  siteTitle: 'Vivienda Nova',
  siteDescription: 'Modern Real Estate Platform',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  colors: {
    primary: '#2E7D32',
    secondary: '#1976D2',
    accent: '#F57C00',
    background: '#FAFAFA',
    text: '#212121',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
  },
  cardStyle: 'flat',
  enableCrypto: false,
  acceptedCryptos: [],
  cryptoWallet: '',
  maintenanceMode: false,
};

export const useAdminStore = create<AdminStore>((set, get) => ({
  user: null,
  session: null,
  settings: defaultSettings,
  isLoggedIn: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Mock authentication - replace with real API
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (email === adminEmail && password === adminPassword) {
        const session: AdminSession = {
          token: 'token_' + Math.random().toString(36),
          userId: 'admin_001',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
        };

        const user: AdminUser = {
          id: 'admin_001',
          email,
          name: 'Administrator',
          role: 'super_admin',
          permissions: ['all'],
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
        };

        sessionStorage.setItem('adminSession', JSON.stringify(session));
        set({ user, session, isLoggedIn: true });
        return true;
      }
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    sessionStorage.removeItem('adminSession');
    set({ user: null, session: null, isLoggedIn: false });
  },

  refreshSession: async () => {
    const storedSession = sessionStorage.getItem('adminSession');
    if (storedSession) {
      const session = JSON.parse(storedSession) as AdminSession;
      if (new Date(session.expiresAt) > new Date()) {
        set({ session, isLoggedIn: true });
      } else {
        get().logout();
      }
    }
  },

  updateSettings: async (newSettings: Partial<AdminSettings>) => {
    set((state) => ({
      settings: { ...state.settings!, ...newSettings },
    }));
    // Persist settings to localStorage/API
    localStorage.setItem('adminSettings', JSON.stringify(get().settings));
  },
}));

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
}

export interface AdminSession {
  token: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
}

export interface AdminSettings {
  siteTitle: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    success: string;
    warning: string;
    error: string;
  };
  cardStyle: 'flat' | 'three_d' | 'shadow' | 'frame' | 'grid' | 'minimal';
  enableCrypto: boolean;
  acceptedCryptos: string[];
  cryptoWallet: string;
  maintenanceMode: boolean;
}

import React from 'react';
import { useAdminStore } from '@stores/adminStore';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PublicLayoutProps {
  children: React.ReactNode;
  onAdminClick?: () => void;
}

const logoSrc = `${import.meta.env.BASE_URL}logo-viviendanova.svg`;

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onAdminClick }) => {
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
  const logout = useAdminStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <a href={import.meta.env.BASE_URL} className="flex items-center gap-3 shrink-0">
              <img src={logoSrc} alt="viviendanova.casa" className="h-10 w-auto" />
            </a>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              {isLoggedIn && (
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-slate-700 hover:bg-slate-800 transition-colors"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {!isLoggedIn && (
        <button
          onClick={onAdminClick}
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full font-semibold text-white shadow-lg bg-slate-700 hover:bg-slate-800 transition-colors"
        >
          🔐 Admin
        </button>
      )}
    </div>
  );
};

import React from 'react';
import { useAdminStore } from '@stores/adminStore';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PublicLayoutProps {
  children: React.ReactNode;
  onAdminClick?: () => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onAdminClick }) => {
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
  const logout = useAdminStore((state) => state.logout);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">🏠 Vivienda Nova</div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-error text-white px-4 py-2 rounded-lg hover:bg-error/90 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onAdminClick}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                🔐 Admin
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Vivienda Nova</h3>
              <p className="text-sm">Plataforma moderna de viviendas</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Propiedades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex justify-between items-center text-sm">
            <p>© 2026 Vivienda Nova. Todos los derechos reservados.</p>
            {!isLoggedIn && (
              <button
                onClick={onAdminClick}
                className="text-gray-400 hover:text-white transition-colors"
              >
                🔐 Admin
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { useAdminStore } from '@stores/adminStore';
import { useTranslation } from '@utils/translations';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useAdminStore((state) => state.user);
  const logout = useAdminStore((state) => state.logout);
  const t = useTranslation('es');

  const menuItems = [
    { id: 'properties', label: 'Propiedades', icon: '🏠' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' },
    { id: 'updates', label: 'Actualizaciones', icon: '🔄' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-4 font-bold text-lg border-b border-gray-700">
          {sidebarOpen ? '🏢 Admin' : '🏢'}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="font-semibold">{item.label}</span>}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-2xl hover:bg-gray-100 p-2 rounded transition-colors"
              >
                ☰
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user?.email}</p>
                <p className="text-sm text-gray-600">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="bg-error text-white px-4 py-2 rounded-lg hover:bg-error/90 transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

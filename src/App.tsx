import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useAdminStore } from '@stores/adminStore';

// Components
import { PublicLayout } from '@components/PublicLayout';
import { AdminLayout } from '@components/AdminLayout';
import { AdminLogin } from '@components/AdminLogin';

// Pages
import { Home } from '@pages/Home';
import { AdminProperties } from '@pages/AdminProperties';
import { AdminAnalytics } from '@pages/AdminAnalytics';
import { AdminSettings } from '@pages/AdminSettings';
import { AdminUpdates } from '@pages/AdminUpdates';

function App() {
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const adminIsLoggedIn = useAdminStore((state) => state.isLoggedIn);
  const refreshSession = useAdminStore((state) => state.refreshSession);
  const [currentPage, setCurrentPage] = useState<string>('properties');

  useEffect(() => {
    refreshSession();
  }, []);

  const adminPages: Record<string, React.ReactNode> = {
    properties: <AdminProperties />,
    analytics: <AdminAnalytics />,
    settings: <AdminSettings />,
    updates: <AdminUpdates />,
  };

  if (showLogin) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setShowLogin(false);
        }}
      />
    );
  }

  if (adminIsLoggedIn) {
    return (
      <AdminLayout>
        {adminPages[currentPage] || adminPages.properties}
      </AdminLayout>
    );
  }

  return (
    <PublicLayout onAdminClick={() => setShowLogin(true)}>
      <Home onAdminClick={() => setShowLogin(true)} />
    </PublicLayout>
  );
}

export default App;

import React, { useState } from 'react';
import { useAdminStore } from '@stores/adminStore';
import { useTranslation } from '@utils/translations';

export const AdminLogin: React.FC<{ onLoginSuccess?: () => void }> = ({
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useAdminStore((state) => state.login);
  const t = useTranslation('es');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        setEmail('');
        setPassword('');
        onLoginSuccess?.();
      } else {
        setError('Email o contraseña incorrectos');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 animate-fadeInUp">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Vivienda Nova</h1>
          <p className="text-gray-600">Admin Panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-error/10 border border-error text-error px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="viviendanova.casa@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? t('loading') : 'Ingresar'}
          </button>
        </form>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Solo acceso autorizado
        </p>
      </div>
    </div>
  );
};

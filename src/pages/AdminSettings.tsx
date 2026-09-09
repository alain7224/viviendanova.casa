import React, { useState } from 'react';
import { useAdminStore } from '@stores/adminStore';
import { applyTheme } from '@utils/theme';

export const AdminSettings: React.FC = () => {
  const settings = useAdminStore((state) => state.settings);
  const updateSettings = useAdminStore((state) => state.updateSettings);
  const [colors, setColors] = useState(settings?.colors || {});
  const [cardStyle, setCardStyle] = useState(settings?.cardStyle || 'flat');

  const handleColorChange = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    applyTheme(newColors);
  };

  const handleSave = async () => {
    await updateSettings({ colors, cardStyle });
    alert('Configuración guardada');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuración del Sitio</h1>

      {/* Color Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Paleta de Colores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-semibold mb-2 capitalize">{key}</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded font-mono text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Style */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Estilo de Tarjetas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['flat', 'three_d', 'shadow', 'frame', 'grid', 'minimal'].map((style) => (
            <button
              key={style}
              onClick={() => setCardStyle(style as any)}
              className={`p-4 rounded-lg border-2 transition-all capitalize font-semibold ${
                cardStyle === style
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {style.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Crypto Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Criptomonedas</h2>
        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            defaultChecked={settings?.enableCrypto}
            className="w-5 h-5"
          />
          <span className="font-semibold">Habilitar pagos en criptomonedas</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['BTC', 'ETH', 'USDC', 'USDT', 'XRP', 'LTC'].map((coin) => (
            <label key={coin} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>{coin}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
      >
        💾 Guardar Cambios
      </button>
    </div>
  );
};

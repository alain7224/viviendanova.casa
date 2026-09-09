import React, { useState } from 'react';
import { useTranslation } from '@utils/translations';

interface CryptoBadgeProps {
  coins: string[];
  walletAddress?: string;
}

export const CryptoBadge: React.FC<CryptoBadgeProps> = ({ coins, walletAddress }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (coins.length === 0) return null;

  const cryptoIcons: Record<string, string> = {
    BTC: '₿',
    ETH: 'Ξ',
    USDC: '🔵',
    USDT: '🟢',
    XRP: 'X',
    LTC: 'Ł',
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2"
      >
        🪙 {coins.slice(0, 2).join(' · ')}
        {coins.length > 2 && ` +${coins.length - 2}`}
      </button>

      {showDetails && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-10 min-w-max">
          <p className="font-bold text-xs text-gray-600 mb-2">Aceptamos:</p>
          {coins.map((coin) => (
            <div key={coin} className="flex items-center gap-2 text-sm py-1">
              <span>{cryptoIcons[coin] || '💰'}</span>
              <span>{coin}</span>
            </div>
          ))}
          {walletAddress && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Wallet:</p>
              <p className="text-xs font-mono bg-gray-100 p-1 rounded truncate">
                {walletAddress}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useTranslation } from '@utils/translations';

interface LanguageSwitcherProps {
  onLanguageChange?: (lang: string) => void;
  currentLanguage?: string;
}

const languages = [
  { code: 'es', name: '🇪🇸 Español' },
  { code: 'en', name: '🇬🇧 English' },
  { code: 'de', name: '🇩🇪 Deutsch' },
  { code: 'fr', name: '🇫🇷 Français' },
  { code: 'it', name: '🇮🇹 Italiano' },
  { code: 'pt', name: '🇵🇹 Português' },
  { code: 'pl', name: '🇵🇱 Polski' },
  { code: 'nl', name: '🇳🇱 Nederlands' },
  { code: 'ru', name: '🇷🇺 Русский' },
  { code: 'zh', name: '🇨🇳 中文' },
  { code: 'ja', name: '🇯🇵 日本語' },
  { code: 'ko', name: '🇰🇷 한국어' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onLanguageChange,
  currentLanguage = 'es',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = languages.find((l) => l.code === currentLanguage);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg">{currentLang?.name.split(' ')[0] || '🌍'}</span>
        <span className="text-sm font-semibold">{currentLanguage.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-max">
          <div className="grid grid-cols-2 gap-0">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange?.(lang.code);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${
                  lang.code === currentLanguage ? 'bg-primary/20 font-bold' : ''
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config

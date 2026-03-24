/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8A00',
          dark: '#E07800',
          light: '#FFB347',
        },
        blue: {
          brand: '#007BFF',
          dark: '#0062CC',
          light: '#4DA6FF',
        },
        foreground: '#0F172A',
        muted: '#64748B',
        border: '#E2E8F0',
        'bg-alt': '#F8F9FB',
        'bg-dark': '#0F172A',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'h1-mobile': ['34px', { lineHeight: '1.2', fontWeight: '800' }],
        'h1-desktop': ['56px', { lineHeight: '1.1', fontWeight: '800' }],
        'h2': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2-desktop': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '1.5' }],
      },
      spacing: {
        'sm': '16px',
        'md': '24px',
        'lg': '48px',
        'xl': '80px',
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 40px rgba(15, 23, 42, 0.1), 0 4px 12px rgba(15, 23, 42, 0.06)',
        'orange': '0 4px 15px rgba(255, 138, 0, 0.3)',
        'orange-lg': '0 8px 25px rgba(255, 138, 0, 0.4)',
        'blue': '0 4px 15px rgba(0, 123, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 40%, #007BFF 100%)',
        'gradient-orange': 'linear-gradient(135deg, #FF8A00, #FFB347)',
        'gradient-blue': 'linear-gradient(135deg, #007BFF, #0EA5E9)',
        'gradient-hero': 'linear-gradient(135deg, #FFF8F0 0%, #F0F7FF 100%)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-slide-up': 'fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'beam-drop': 'beam-drop 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 138, 0, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(255, 138, 0, 0)' },
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'beam-drop': {
          '0%': { top: '-100px', opacity: '0' },
          '20%': { opacity: '0.6' },
          '80%': { opacity: '0.6' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
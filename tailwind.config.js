import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                display: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Plus Jakarta Sans', 'DM Sans', ...defaultTheme.fontFamily.sans],
                admin: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
                mono: ['Space Grotesk', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                // Semantic Design Tokens
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    dark: 'var(--color-primary-dark)',
                    light: 'var(--color-primary-light)',
                    foreground: 'var(--color-on-primary)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    foreground: 'var(--color-on-accent)',
                },
                background: 'var(--color-bg)',
                foreground: 'var(--color-fg)',
                muted: {
                    DEFAULT: 'var(--color-muted)',
                    foreground: 'var(--color-muted-fg)',
                },
                border: 'var(--color-border)',
                destructive: 'var(--color-destructive)',
                // Kahoot Primary Colors
                kahoot: {
                    purple: {
                        DEFAULT: '#46178F',
                        dark: '#2D0F5C',
                        light: '#6B3FA0',
                    },
                    red: '#E21B3C',
                    blue: '#1368CE',
                    yellow: '#D89E00',
                    green: '#26890C',
                    orange: '#EB670F',
                    pink: '#FF3355',
                    teal: '#00BCD4',
                },
                // Colores para cada categoría CHASIDE
                chaside: {
                    C: '#E21B3C', // Rojo - Ciencias Exactas
                    H: '#EB670F', // Naranja - Humanísticas
                    A: '#46178F', // Púrpura - Artísticas
                    S: '#26890C', // Verde - Ciencias de la Salud
                    I: '#1368CE', // Azul - Investigativas
                    D: '#FF3355', // Rosa - Defensa/Seguridad
                    E: '#D89E00', // Amarillo - Económicas/Empresariales
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-down': 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
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
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.04)',
                'card-hover': '0 4px 12px rgba(0, 0, 0, 0.05), 0 16px 40px rgba(0, 0, 0, 0.08)',
                'purple': '0 4px 14px 0 rgba(70, 23, 143, 0.39)',
                'purple-hover': '0 6px 20px 0 rgba(70, 23, 143, 0.5)',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
        },
    },

    plugins: [forms],
};

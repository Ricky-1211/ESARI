/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#641E35', // Exact Deep Burgundy from prompt
          dark: '#4A1224',
          light: '#7F2842',
          deep: '#3A0E1C',
        },
        gold: {
          DEFAULT: '#D6B477', // Exact Champagne Gold from prompt
          light: '#E8CE9E',
          pale: '#F7EEDC',
          dark: '#B8934E',
        },
        ivory: {
          DEFAULT: '#FFFDF8', // Exact Ivory White from prompt
          light: '#FFFFFF',
          dark: '#F5EFE6',
          cream: '#FAF6EF',
        },
        beige: {
          DEFAULT: '#EDE3D5', // Exact Soft Beige from prompt
          light: '#F4ECE2',
          dark: '#DCCBBA',
        },
        charcoal: {
          DEFAULT: '#252525', // Exact Charcoal Black from prompt
          light: '#3A3A3A',
          muted: '#666666',
        },
        rose: {
          DEFAULT: '#D9B9B5',
          light: '#EAD7D4',
          dark: '#B8928D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Poppins"', '"Lato"', '"Montserrat"', 'system-ui', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        lato: ['"Lato"', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'subtle': '0.15em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(100, 30, 53, 0.08)',
        'luxury-gold': '0 10px 30px -5px rgba(214, 180, 119, 0.25)',
        'card': '0 10px 30px rgba(37, 37, 37, 0.06)',
      }
    },
  },
  plugins: [],
}

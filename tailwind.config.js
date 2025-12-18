/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Mengadopsi palet warna dari desain original Warung Bu Rina
      colors: {
        primary: '#4CAF50',    // Hijau Utama
        secondary: '#FFC107',  // Kuning/Amber
        accent: '#FF5722',     // Oranye Aksen
        dark: '#343a40',       // Dark Grey Text
        light: '#f8f9fa',      // Background Light
        gray: {
          DEFAULT: '#6c757d',
          light: '#e9ecef'
        },
        success: '#28a745'
      },
      fontFamily: {
        // Menggunakan Poppins sesuai brand identity
        sans: ['Poppins', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(0,0,0,0.1)',
        'hover': '0 12px 20px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
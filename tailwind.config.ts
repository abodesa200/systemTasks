import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maincolor:"#00a69c",
        primary: {
          50: '#e6fffa',
          100: '#b3f5ec',
          200: '#81e6d9',
          300: '#4fd1c7',
          400: '#38b2ac',
          500: '#00c4b4',
          600: '#00a69c',
          700: '#008b7a',
          800: '#065f46',
          900: '#064e3b',
        },
        secondary: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4a5568',
          700: '#2d3748',
          800: '#1a202c',
          900: '#171923',
        },
        accent: {
          orange: '#ff8c00',
          'orange-dark': '#e67e00',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      },
   
    },
  
  plugins: [],
} satisfies Config;



//bg-gradient-to-r from-[#00c4b4] to-[#00a69c]
//#00c4b4
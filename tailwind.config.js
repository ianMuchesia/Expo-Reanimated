/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#fef2d3",
          200: "#fde5a7",
          300: "#fdd97c",
          400: "#fccc50",
          500: "#fbbf24",
          600: "#c9991d",
          700: "#977316",
          800: "#644c0e",
          900: "#322607"
        },
        accent: {
          100: "#FBFBFD",
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31",
        },
        danger: "#F75555",
        boxShadow: {
          'custom': '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        borderRadius: {
          'custom': '23px',
        },
        colors: {
          'shadow': '#000',
        },
        spacing: {
          'shadow-offset-x': '0px',
          'shadow-offset-y': '2px',
        },
        opacity: {
          'shadow': '0.1',
        },
      },
    },
    
  },
  plugins: [],
}
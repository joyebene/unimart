
const config= {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: '#F7DC6F',
        secondary: '#34C759',
        accent: '#8BC34A',
        background: '#FFFFFF',
        text: '#333333',
      },
    },
  },
  plugins: [],
}

export default config

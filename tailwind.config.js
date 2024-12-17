/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors
      colors: {
        app: {
          blue: {
            1: "#4D49F6"
          },
          grey: {
            1: "#A2A2A2",
            2: "#F5F6FA",
            3: "#D5D5D5",
            4: "#404040"
          },
          // orange: {
          //   1: "#FE5E009C"
          // }
        }
      },
      // shadow
      boxShadow: {
        'custom': '-8px 0px 43.4px 0px #00000040', // Add your custom shadow,
      },
    },
  },
  plugins: [],
}


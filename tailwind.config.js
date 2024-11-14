/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#F4F5F9",
        black: "#2E3240",
        lightBlue: "#E6EAFA",
        blue: "#BFC9EC",
        darkBlue: "#4164E1",
      },
      borderRadius: {
        button: "2px",
        product: "6px",
      },
      fontSize: {
        xxs: "8px", // Ukuran font 8px
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
  daisyui: {
    themes: false, // Matikan tema default DaisyUI jika hanya ingin menggunakan warna custom
  },
};

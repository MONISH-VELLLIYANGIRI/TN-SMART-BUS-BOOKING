/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        ocean: "#0369a1",
        mist: "#eff6ff",
        mint: "#ecfeff"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(circle at 1px 1px, rgba(14, 116, 144, 0.09) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

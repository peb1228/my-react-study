/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f27f0d",
        "primary-hover": "#d96e05",
        "background-light": "#f8f7f5",
        "surface-light": "#ffffff",
        "text-main": "#1c140d",
        "text-muted": "#9c7349",
        "border-color": "#f4ede7",
      },
      fontFamily: {
        display: ["Space Grotesk", "Noto Sans KR", "sans-serif"],
        body: ["Noto Sans KR", "sans-serif"],
      },
      // 애니메이션과 키프레임을 여기에 합쳤습니다.
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
      },
    },
  },
  plugins: [],
};
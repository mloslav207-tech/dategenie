import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#FFE1EE",
        petal: "#FF6FA5",
        plum: "#7C3AED",
        deepplum: "#4C1D95",
        cream: "#FFFBF8",
        ink: "#2A1B3D",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      keyframes: {
        blobFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.97)" },
        },
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sparklePop: {
          "0%": { opacity: "0", transform: "scale(0.3) rotate(-10deg)" },
          "60%": { opacity: "1", transform: "scale(1.1) rotate(4deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wandSpin: {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(8deg)" },
        },
      },
      animation: {
        blobFloat: "blobFloat 14s ease-in-out infinite",
        fadeSlideUp: "fadeSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        sparklePop: "sparklePop 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 2.5s linear infinite",
        wandSpin: "wandSpin 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

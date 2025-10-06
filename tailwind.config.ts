import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        "surface-near": "#0B0B0B",
        surface: "#111111",
        "surface-elevated": "#141414",
        border: "#262626",
        "text-primary": "#FAFAFA",
        "text-muted": "#A1A1AA",
        accent: "#FF6600",
        "electric-orange": "#FF6600",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config

import type { Config } from "tailwindcss";
import { colors } from './tailwind-config/colors';
import { fontFamily } from './tailwind-config/typography';
import { spacing } from './tailwind-config/spacing';
import { screens } from './tailwind-config/screens';
import { keyframes, animations } from './tailwind-config/animations';
import { boxShadow, zIndex, borderRadius, backgroundImage, opacity, transition } from './tailwind-config/utilities';


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily,
      spacing,
      screens,
      keyframes,
      animation: animations,
      boxShadow,
      zIndex,
      borderRadius,
      backgroundImage,
      opacity,
      transition,
    }, 
  },
  plugins: [],
};
export default config;

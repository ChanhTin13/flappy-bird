// tailwind-config/animations.js
export const keyframes = {
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  ping: {
    "0%": { transform: "scale(1)", opacity: "1" },
    "75%, 100%": { transform: "scale(2)", opacity: "0" },
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
    },
    "50%": {
      transform: "none",
      animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
    },
  },
  // Add more keyframes as needed
};

export const animations = {
  spin: "spin 1s linear infinite",
  ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  bounce: "bounce 1s infinite",
  // Add more animations as needed
};

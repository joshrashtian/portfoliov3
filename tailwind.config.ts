import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        "infinite-scroll": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-50% - var(--gap)/2))",
          },
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll var(--duration) linear infinite",
      },
    },
  },
};

export default config;

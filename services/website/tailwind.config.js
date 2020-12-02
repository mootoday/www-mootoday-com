module.exports = {
  purge: {
    content: ["./src/**/*.svelte", "./src/**/*.svx"],
    options: {
      safelist: [/svelte-/],
    },
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};

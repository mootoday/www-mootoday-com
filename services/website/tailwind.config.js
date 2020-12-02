module.exports = {
  purge: {
    content: ["./src/**/*.svelte"],
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

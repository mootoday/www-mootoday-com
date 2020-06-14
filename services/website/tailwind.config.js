module.exports = {
  purge: {
    content: ["./src/**/*.svelte"],
    options: {
      whitelistPatterns: [/svelte-/],
    },
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};

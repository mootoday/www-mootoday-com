const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./src/**/*.svelte", "./src/**/*.svx"],
    options: {
      safelist: [/svelte-/, /-blog/, /-projects/, /-twitter/, /-youtube/],
    },
  },
  theme: {
    extend: {
      colors: {
        blog: colors.fuchsia["600"],
        projects: colors.violet["600"],
        twitter: "#007bc7",
        youtube: "#e00",
      },
    },
  },
  variants: {
    extend: {
      alignSelf: ["even"],
      flexDirection: ["odd"],
      justifyContent: ["odd"],
      margin: ["odd"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

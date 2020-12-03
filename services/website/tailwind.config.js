const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./src/**/*.svelte", "./src/**/*.svx"],
    options: {
      safelist: [/svelte-/, /-blog/, /-project/, /-twitter/, /-youtube/],
    },
  },
  theme: {
    extend: {
      colors: {
        blog: colors.trueGray["500"],
        project: colors.violet["500"],
        twitter: "#1da1f2",
        youtube: "#ff0000",
      },
    },
  },
  variants: {
    extend: {
      alignSelf: ["even"],
      flexDirection: ["odd"],
      justifyContent: ["odd"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

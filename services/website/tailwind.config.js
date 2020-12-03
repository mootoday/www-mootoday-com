const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./src/**/*.svelte", "./src/**/*.svx"],
    options: {
      safelist: [/svelte-/, /blog-/, /project-/, /twitter-/, /youtube-/],
    },
  },
  theme: {
    extend: {
      colors: {
        blog: colors.purple,
        project: colors.red,
        twitter: colors.green,
        youtube: colors.blue,
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};

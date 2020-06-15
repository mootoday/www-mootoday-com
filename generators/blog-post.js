const fs = require("fs");

module.exports = (plop) => {
  return {
    description: "Generate a new blog post.",
    prompts: [
      {
        type: "input",
        name: "blogPostTitle",
        message:
          "What's the title? (e.g. How to deploy a Sapper app to Cloud Run)",
      },
    ],
    actions: [
      {
        type: "add",
        path:
          "../services/website/src/blog-posts/{{today}}-{{dashCase blogPostTitle}}/index.svx",
        templateFile: "../templates/blog-post/index.svx.hbs",
      },
      {
        type: "add",
        path:
          "../services/website/src/routes/blog/{{dashCase blogPostTitle}}.svelte",
        templateFile: "../templates/blog-post/page.svelte.hbs",
      },
      {
        type: "add",
        path:
          "../services/website/static/blog-posts/{{today}}-{{dashCase blogPostTitle}}/cover.jpg",
        templateFile: "../templates/blog-post/cover.jpg",
      },
    ],
  };
};

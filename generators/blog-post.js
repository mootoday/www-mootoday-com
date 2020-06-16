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
      {
        type: "input",
        name: "blogPostSummary",
        message: "What's the summary? (e.g. Learn the steps necessary to ...)",
      },
      {
        type: "input",
        name: "blogPostCreatedAt",
        message:
          "What's the createdAt date [yyyy-mm-dd]? (leave blank for today)",
        default: new Date().toISOString().split("T")[0],
      },
    ],
    actions: [
      {
        type: "add",
        path:
          "../services/website/src/blog-posts/{{blogPostCreatedAt}}-{{dashCase blogPostTitle}}/index.svx",
        templateFile: "../templates/blog-post/index.svx.hbs",
      },
      {
        type: "add",
        path:
          "../services/website/src/routes/blog/{{dashCase blogPostTitle}}/index.svelte",
        templateFile: "../templates/blog-post/page.svelte.hbs",
      },
      {
        type: "add",
        path:
          "../services/website/static/blog-posts/{{blogPostCreatedAt}}-{{dashCase blogPostTitle}}/cover.jpg",
        templateFile: "../templates/blog-post/cover.jpg",
      },
    ],
  };
};

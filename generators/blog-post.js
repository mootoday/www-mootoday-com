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
          "What's the createdAt time [YYYY-MM-DDTHH:mm:ss.sssZ]? (leave blank for now)",
        default: new Date().toISOString(),
      },
    ],
    actions: [
      {
        type: "add",
        path:
          "../services/website/src/routes/blog/{{dashCase blogPostTitle}}/index.svx",
        templateFile: "../templates/blog-post/index.svx.hbs",
      },
    ],
  };
};

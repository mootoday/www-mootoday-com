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
      {
        type: "checkbox",
        name: "blogPostCategory",
        message: "What's the category?",
        choices: ['Art notes', 'Personally speaking', 'Seriously speaking', 'Coffee fantasia', 'Eat well drink well breath well', 'Field notes']
      },
      {
        type: "list",
        name: "postPostAuthor",
        message: "Who is the author?",
        choices: ['Linda Lai', 'LAI Wai-leung', 'Jess Lau', 'Kel Lok', 'Wong Chun Hoi', 'Cherry Wong', 'Vanessa Tsai', 'LAM Kin-choi', 'Sam Chan', 'FPC folks']
      },
      {
        type: "input",
        name: "postPostTags",
        message: "Any tags? (Separate by comma) i.e. 'd-daman', 'childhood', 'children'",
        default: ''
      }
    ],
    actions: [
      {
        type: "add",
        path:
          "../services/website/src/event-posts/{{convertDateIsoToYMD blogPostCreatedAt}}-{{dashCase blogPostTitle}}/index.svx",
        templateFile: "../templates/event-post/index.svx.hbs",
      },
      {
        type: "add",
        path:
          "../services/website/src/routes/events/{{dashCase blogPostTitle}}/index.svelte",
        templateFile: "../templates/event-post/page.svelte.hbs",
      },
      {
        type: "add",
        path:
          "../services/website/static/event-posts/{{convertDateIsoToYMD blogPostCreatedAt}}-{{dashCase blogPostTitle}}/cover.jpg",
        templateFile: "../templates/event-post/cover.jpg",
      },
    ],
  };
};

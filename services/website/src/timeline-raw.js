import { parseISO } from "date-fns";

const template = {
  cta: "[Optional] A call to action. If present, it points to `link`",
  label: "blog|project|twitter|youtube",
  link: "An absolute or relative URL.",
  milestone: "Main content. If `cta` is not present, this points to `link`",
  timestamp: parseISO("2014-02-11T11:30:30").getTime(),
};

export default [
  {
    label: "blog",
    link: "/blog/what-was-the-biggest-blunder-in-your-career-as-a-developer",
    milestone: "What was the biggest blunder in your career as a developer?",
    timestamp: parseISO("2020-08-20T12:47:18").getTime(),
  },
  {
    label: "blog",
    link:
      "/blog/how-i-wrote-214-pages-for-a-web-development-book-with-19-pull-requests-in-3-months",
    milestone:
      "How I wrote 214 pages for a web development book with 19 pull requests in 3 months",
    timestamp: parseISO("2020-07-03T20:26:33").getTime(),
  },
  {
    label: "blog",
    link: "/blog/my-personal-website-v2-0",
    milestone: "My personal website v2.0",
    timestamp: parseISO("2020-06-24T13:48:01").getTime(),
  },
  {
    label: "blog",
    link: "/blog/deploy-a-static-sapper-app-with-deno-on-cloud-run",
    milestone: "Deploy a static Sapper app with Deno on Cloud Run",
    timestamp: parseISO("2020-05-14T00:00:00").getTime(),
  },
  {
    label: "blog",
    link: "/blog/i-am-writing-a-book-cloud-native-web-development",
    milestone: "I am writing a book: Cloud Native Web Development",
    timestamp: parseISO("2020-05-10T00:00:00").getTime(),
  },
  {
    label: "blog",
    link:
      "/blog/develop-cypress-end-to-end-tests-on-gitpod-io-virtual-desktop-included",
    milestone:
      "Develop Cypress end-to-end tests on Gitpod.io - Virtual Desktop included",
    timestamp: parseISO("2020-05-02T00:00:00").getTime(),
  },
  {
    label: "blog",
    link:
      "/blog/firebase-hosting-for-static-assets-of-a-sapper-web-app-on-cloud-run",
    milestone:
      "Firebase Hosting for static assets of a Sapper web app on Cloud Run",
    timestamp: parseISO("2020-04-28T00:00:00").getTime(),
  },
  {
    label: "blog",
    link:
      "/blog/sapper-google-cloud-run-continuous-deployment-a-boilerplate-template",
    milestone:
      "Sapper, Google Cloud Run, Continuous Deployment - A boilerplate template",
    timestamp: parseISO("2020-04-28T00:00:00").getTime(),
  },
  {
    label: "blog",
    link: "/blog/a-link-content-previewer-with-svelte-sapper",
    milestone: "A Link Content Previewer with Svelte & Sapper",
    timestamp: parseISO("2020-04-18T00:00:00").getTime(),
  },
  {
    label: "blog",
    link:
      "/blog/why-i-use-a-cloud-based-development-environment-and-how-you-can-too",
    milestone:
      "Why I use a cloud-based development environment and how you can too",
    timestamp: parseISO("2020-03-31T00:00:00").getTime(),
  },
  {
    label: "blog",
    link: "/blog/how-to-use-svelte-for-your-google-docs-add-on",
    milestone: "How to use Svelte for your Google Docs add-on",
    timestamp: parseISO("2020-03-28T00:00:00").getTime(),
  },
  {
    label: "blog",
    link: "/blog/add-a-commenting-platform-to-a-svelte-app",
    milestone: "Add a commenting platform to a Svelte app",
    timestamp: parseISO("2020-01-01T00:00:00").getTime(),
  },
  {
    label: "blog",
    link: "/blog/why-i-moved-from-react-to-svelte-and-why-others-will-follow",
    milestone: "Why I moved from React to Svelte and why others will follow",
    timestamp: parseISO("2019-12-26T00:00:00").getTime(),
  },
  {
    label: "blog",
    link: "/blog/our-approach-to-software-development-consistency",
    milestone: "Our approach to software development consistency",
    timestamp: parseISO("2018-01-03T00:00:00").getTime(),
  },
  {
    label: "blog",
    link: "/blog/a-mostly-automated-release-process",
    milestone: "A (mostly) automated release process",
    timestamp: parseISO("2017-12-26T00:00:00").getTime(),
  },
  {
    label: "blog",
    link: "/blog/ever-wondered-why-your-best-employees-leave",
    milestone: "Ever wondered why your best employees leave",
    timestamp: parseISO("2016-04-11T00:00:00").getTime(),
  },
];

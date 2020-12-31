import { parseISO } from "date-fns";

export default [
  {
    cta: "Learn more",
    label: "projects",
    link: "https://gum.co/a-smart-guide-for-your-career-as-a-software-engineer",
    milestone:
      "Published my book A Smart Guide for Your Career as a Software Engineer",
    timestamp: parseISO("2020-12-31").getTime(),
  },
  {
    cta: "Learn more",
    label: "projects",
    link: "/cloud-native-web-development",
    milestone: "Published my book Cloud Native Web Development",
    timestamp: parseISO("2020-06-28").getTime(),
  },
];

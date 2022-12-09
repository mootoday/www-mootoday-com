import { parseISO } from "date-fns";
import blogEntries from "./_blog";
import projectsEntries from "./_projects";
import twitterEntries from "./_twitter";
import youtubeEntries from "./_youtube";

const template = {
  cta: "A call to action. If present, it points to `link`",
  label: "blog|projects|twitter|youtube",
  link: "An absolute or relative URL.",
  milestone: "Main content. If `cta` is not present, this points to `link`",
  timestamp: parseISO("2020-02-11T11:30:30").getTime(),
};

export default [
  ...blogEntries,
  ...projectsEntries,
  ...twitterEntries,
  ...youtubeEntries,
].sort((a, b) => b.timestamp - a.timestamp);

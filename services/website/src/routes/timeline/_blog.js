import { parseISO } from "date-fns";
import fs from "fs";
import frontMatter from "front-matter";
// import readingTime from "reading-time";

const BLOG_POSTS_BASE_DIR = "./src/routes/blog";

const generatePost = (postFrontMatter) => ({
  cta: "Read the blog post",
  label: "blog",
  link: `/blog/${postFrontMatter.attributes.slug}`,
  milestone: postFrontMatter.attributes.title,
  timestamp: postFrontMatter.attributes.createdAt.getTime(),
});

const readPostContent = (dirent) =>
  fs.readFileSync(`${BLOG_POSTS_BASE_DIR}/${dirent.name}/index.svx`, {
    encoding: "utf-8",
  });

export const posts = fs
  .readdirSync(BLOG_POSTS_BASE_DIR, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map(readPostContent)
  .map(frontMatter);

const additionalBlogRelatedEntries = [
  {
    cta: "Read 53 blog posts on Medium",
    label: "blog",
    link: "https://medium.com/@mikenikles",
    milestone: "Moved my blog from Medium to my own blog",
    timestamp: parseISO("2019-12-29T11:30:30").getTime(),
  },
];

export default [...posts.map(generatePost), ...additionalBlogRelatedEntries];

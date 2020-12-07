import { parseISO } from "date-fns";
import fs from "fs";
import { join } from "path";
import frontMatter from "front-matter";

const BLOG_POSTS_PATH = "../../../src/routes/blog";

const generatePost = (dirent) => {
  const postContent = fs.readFileSync(
    `${join(__dirname)}/${BLOG_POSTS_PATH}/${dirent.name}/index.svx`,
    {
      encoding: "utf-8",
    }
  );
  const postFrontMatter = frontMatter(postContent);

  return {
    cta: "Read the blog post",
    label: "blog",
    link: `/blog/${postFrontMatter.attributes.slug}`,
    milestone: postFrontMatter.attributes.title,
    timestamp: postFrontMatter.attributes.createdAt.getTime(),
  };
};

const posts = fs
  .readdirSync(`${join(__dirname)}/${BLOG_POSTS_PATH}`, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .filter((dirent) => !dirent.name.startsWith("["))
  .map(generatePost);

const additionalBlogRelatedEntries = [
  {
    cta: "Read 53 blog posts on Medium",
    label: "blog",
    link: "https://medium.com/@mikenikles",
    milestone: "Moved my blog from Medium to my own blog",
    timestamp: parseISO("2019-12-29T11:30:30").getTime(),
  },
];

export default [...posts, ...additionalBlogRelatedEntries];

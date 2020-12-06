import fs from "fs";
import frontMatter from "front-matter";
// import readingTime from "reading-time";

const BLOG_POSTS_BASE_DIR = "./src/routes/blog";

const generatePost = (dirent) => {
  const postContent = fs.readFileSync(
    `${BLOG_POSTS_BASE_DIR}/${dirent.name}/index.svx`,
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
  .readdirSync(BLOG_POSTS_BASE_DIR, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map(generatePost);

export default posts;

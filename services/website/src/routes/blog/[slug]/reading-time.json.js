import fs from "fs";
import frontMatter from "front-matter";
import readingTime from "reading-time";

const BLOG_POSTS_BASE_DIR = "./src/routes/blog";

export const get = async (req, res) => {
  const { slug } = req.params;

  const postContent = fs.readFileSync(
    `${BLOG_POSTS_BASE_DIR}/${slug}/index.svx`,
    {
      encoding: "utf-8",
    }
  );
  const postFrontMatter = frontMatter(postContent);
  const postReadingTime = readingTime(postFrontMatter.body);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(postReadingTime));
};

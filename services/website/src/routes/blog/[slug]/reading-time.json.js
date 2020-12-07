import fs from "fs";
import { join } from "path";
import frontMatter from "front-matter";
import readingTime from "reading-time";

const BLOG_POSTS_PATH = "../../../src/routes/blog";

export const get = async (req, res) => {
  const { slug } = req.params;

  const postContent = fs.readFileSync(
    `${join(__dirname)}/${BLOG_POSTS_PATH}/${slug}/index.svx`,
    {
      encoding: "utf-8",
    }
  );
  const postFrontMatter = frontMatter(postContent);
  const postReadingTime = readingTime(postFrontMatter.body);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(postReadingTime));
};

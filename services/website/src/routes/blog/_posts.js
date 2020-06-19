import fs from "fs";
import frontMatter from "front-matter";
import readingTime from "reading-time";

const generatePost = (dirent) => {
  const postContent = fs.readFileSync(
    `./src/blog-posts/${dirent.name}/index.svx`,
    {
      encoding: "utf-8",
    }
  );
  const postFrontMatter = frontMatter(postContent);

  return {
    metadata: {
      ...postFrontMatter.attributes,
      readingTime: readingTime(postFrontMatter.body),
    },
  };
};

const names = fs.readdirSync("./src/blog-posts", { withFileTypes: true });
const posts = names
  .filter((dirent) => dirent.isDirectory())
  .map(generatePost)
  .sort((a, b) =>
    a.metadata.createdAt > b.metadata.createdAt
      ? -1
      : a.metadata.createdAt < b.metadata.createdAt
      ? 1
      : 0
  );

export default posts;

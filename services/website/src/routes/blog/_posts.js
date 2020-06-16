import fs from "fs";
import frontMatter from "front-matter";

const names = fs.readdirSync("./src/blog-posts", { withFileTypes: true });
const posts = names
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => ({
    metadata: frontMatter(
      fs.readFileSync(`./src/blog-posts/${dirent.name}/index.svx`, {
        encoding: "utf-8",
      })
    ).attributes,
  }))
  .sort((a, b) =>
    a.metadata.createdAt > b.metadata.createdAt
      ? -1
      : a.metadata.createdAt < b.metadata.createdAt
      ? 1
      : 0
  );

export default posts;

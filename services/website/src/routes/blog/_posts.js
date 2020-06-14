import fs from "fs";
import frontMatter from "front-matter";

const names = fs.readdirSync("./src/blog-posts", { withFileTypes: true });
const posts = names
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => ({
    [`${dirent.name.substring("YYYY-MM-DD-".length)}`]: {
      metadata: frontMatter(
        fs.readFileSync(`./src/blog-posts/${dirent.name}/index.svx`, {
          encoding: "utf-8",
        })
      ).attributes,
    },
  }))
  .pop();

export default posts;

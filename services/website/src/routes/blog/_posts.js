import fs from "fs";
import frontMatter from "front-matter";

const filenames = fs.readdirSync("./src/blog-posts");
const posts = filenames
  .filter((filename) => filename.endsWith(".svx"))
  .map((filename) => ({
    [`P${filename.substring(0, "YYYY-MM-DD".length).replace(/-/g, "")}`]: {
      filename,
      slug: filename.substring(
        "YYYY-MM-DD-".length,
        filename.length - ".svx".length
      ),
      metadata: frontMatter(
        fs.readFileSync(`./src/blog-posts/${filename}`, {
          encoding: "utf-8",
        })
      ).attributes,
    },
  }))
  .pop();

export default posts;

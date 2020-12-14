import posts from "./_posts.js";
import tags from './_tags'

export const get = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  const result = {
    posts, tags
  }
  res.end(JSON.stringify(result));
};

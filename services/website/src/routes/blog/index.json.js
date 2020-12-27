import posts from "./_articles.js";

export const get = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  const result = {
    posts
  }
  res.end(JSON.stringify(result));
};

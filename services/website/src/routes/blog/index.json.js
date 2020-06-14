import posts from "./_posts.js";

export const get = (req, res) => {
  console.log(posts);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(posts));
};

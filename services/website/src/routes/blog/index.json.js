import posts from "./_posts.js";

export const get = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  console.log(JSON.stringify(posts))
  res.end(JSON.stringify(posts));
};

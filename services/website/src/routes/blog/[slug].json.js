import posts from "./_posts.js";

const lookup = new Map();
Object.entries(posts).map(([componentName, post]) => {
  lookup.set(
    post.slug,
    JSON.stringify({
      componentName,
      ...post,
    })
  );
});

export const get = (req, res) => {
  const { slug } = req.params;

  if (lookup.has(slug)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(lookup.get(slug));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
};

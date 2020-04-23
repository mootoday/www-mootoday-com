const fs = require("fs");

const GhostContentAPI = require("@tryghost/content-api");
const api = new GhostContentAPI({
  url: "https://blog.mikenikles.com",
  key: "5581c10aee9e1a44e3bfc012f7",
  version: "v3"
});

const fetchPosts = async () => {
  const posts = [];
  let page = 1;

  do {
    const apiResponse = await api.posts.browse({ page, include: "tags,author" });
    posts.push(...apiResponse);
    page = apiResponse.meta.pagination.next;
  } while (page)

  fs.writeFileSync("./src/routes/blog/_posts.json", JSON.stringify({posts}));
}

try {
  fetchPosts();
} catch (error) {
  console.error(error);
}

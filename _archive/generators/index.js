const blogPostGenerator = require("./blog-post");

module.exports = function (plop) {
  plop.setGenerator("blog-post", blogPostGenerator(plop));
};

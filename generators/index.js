const blogPostGenerator = require("./blog-post");
const { today } = require("./helpers");

module.exports = function (plop) {
  plop.setHelper("today", today);
  plop.setGenerator("blog-post", blogPostGenerator(plop));
};

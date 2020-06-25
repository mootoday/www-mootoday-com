const blogPostGenerator = require("./blog-post");
const { convertDateIsoToYMD } = require("./helpers");

module.exports = function (plop) {
  plop.setHelper("convertDateIsoToYMD", convertDateIsoToYMD);
  plop.setGenerator("blog-post", blogPostGenerator(plop));
};

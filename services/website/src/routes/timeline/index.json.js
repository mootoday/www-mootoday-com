import entries from "./_index.js";

export const get = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(entries));
};

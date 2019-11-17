import { posts } from './_posts.json';

const contents = JSON.stringify(posts.map(post => ({
  ...post,
  url: post.url.replace('blog.mikenikles.com', 'www.mikenikles.com/blog')
})));

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(contents);
}
# Mike's blog

The source code for www.mikenikles.com, version 2.0.

Check out the `v1.0.0` tag for the source code of the previous version, based on Ghost.org.

## Create a new blog post

Use the following command:

```bash
npm run generate blog-post "My blog post title"
```

Write you content, with [mdsvex](https://mdsvex.com/) in:

```
services/website/src/blog-posts/2020-06-15-my-blog-post-title/index.svx
```

Add your `cover.jpg` image and other assets to:

```
services/website/static/blog-posts/2020-06-15-my-blog-post-title/
```

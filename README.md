# Mike's blog

The source code for www.mikenikles.com, version 2.0.

Check out the `v1.0.0` tag for the source code of the previous version, based on Ghost.org.

## Create a new blog post

1. Use the following command:

   ```bash
   npm run generate blog-post "My blog post title"
   ```

1. Write you content, with [mdsvex](https://mdsvex.com/) in:

   ```
   services/website/src/blog-posts/YYYY-MM-DD-my-blog-post-title/index.svx
   ```

1. Add your `cover.jpg` image and other assets to:

   ```
   services/website/static/blog-posts/YYYY-MM-DD-my-blog-post-title/
   ```

1. Navigate to `services/website` and run the following script to create images in WebP and JPEG 2000 formats:

   ```bash
   npm run images
   ```

   Until there's a fix, run `git restore static/blog-posts`. That's because the above script modifies all files and not
   just the new ones. There's a way to make this work by passing a parameter to that NPM script, but it took me more
   than 15 minutes to figure out and wasn't a priority.

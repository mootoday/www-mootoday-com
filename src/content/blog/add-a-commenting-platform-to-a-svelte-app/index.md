---
title: "Add a commenting platform to a Svelte app"
slug: "add-a-commenting-platform-to-a-svelte-app"
summary: "A short intro on how to add a commenting platform to a Svelte app using commento.io."
createdAt: 2020-01-01T00:00:00.000Z
tags: ["web", "development", "svelte"]
layout: blog
---

<script>
  const assetsBasePath = `/blog/${slug}`;
</script>

Photo by [Art Lasovsky](https://unsplash.com/@artlasovsky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/writing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Happy new year!

I recently [relaunched](https://www.mikenikles.com/blog/migrating-from-medium-to-my-own-blog) my personal blog at www.mikenikles.com using Svelte ([learn why](https://www.mikenikles.com/blog/why-i-moved-from-react-to-svelte-and-why-others-will-follow)).

Initial feedback was to allow visitors to leave comments and have discussions. I took that feedback and found www.commento.io which looked lightweight enough and straitforward to implement.

What I did:

1.  Sign up at www.commento.io
2.  Create a Svelte component that displays comments

The component is as simple as this ([corresponding pull request](https://github.com/mikenikles/www-mikenikles-com/pull/4/files)):

```svelte
<svelte:head>
  <script src="https://cdn.commento.io/js/commento.js"></script>
</svelte:head>

<h2>Comments, Feedback, Thoughts</h2>
<div id="commento" />
```

## Configuration

You can style the commenting platform by providing a `data-css-override` attribute to the `script` tag, for example:

```html
<script src="https://cdn.commento.io/js/commento.js" data-css-override="http://example.com/my-custom-styling.css"></script>
```

Additional configuration options can be found in [the documentation](https://docs.commento.io/configuration/frontend/).

Are there other alternatives you have experience with? What do you like / dislike about them?
---
title: 'Why I turned my homepage into a timeline'
slug: 'why-i-turned-my-homepage-into-a-timeline'
coverPhotoId: 'nbKaLT4cmRM'
summary: 'A short explanation of why I streamlined the homepage into a timeline showcasing my blog posts, Twitter stats, YouTube videos, and projects.'
createdAt: 2020-12-06T20:21:32.999Z
tags: ['design', 'tailwindcss']
layout: blog
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

<!-- Photo by [Félix Prado](https://unsplash.com/@fprado?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/line?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) -->

## What has happened so far?

On December 21, 2019 I migrated my blog from Medium to my own infrastructure ([this blog post has more details](https://dev.to/mikenikles/migrating-from-medium-to-my-own-blog-1nj8)). The main reason was to own my content rather than leaving it on servers owned by a company. It also gives me more flexibility should the need arise to provide my content in other formats, e.g. RSS feed.
In summer of 2020, I launched [v2 of my website](/blog/my-personal-website-v2-0) in preparation for the publication of my first book, [Cloud Native Web Development](/cloud-native-web-development). The main goal of v2 was to significantly simplify the architecture.

As of v2, the homepage displayed a list of blog post previews.

![v2 homepage screenshot]({assetsBasePath}/1.jpg)

That was great up until just about now, read December 2020.

## Why choose a timeline as my homepage?

The latest evolution of the homepage looks as follows:

![timeline homepage screenshot]({assetsBasePath}/cover.jpg)

A lightweight version of the timeline is used on mobile:

![Mobile intro]({assetsBasePath}/2.jpg)
![Mobile timeline]({assetsBasePath}/3.jpg)

See [this X thread](https://x.com/mootoday/status/1334305377500925953) for progress updates and how the homepage came together.

The reason to show a timeline is twofold and inspired by [Florin Pop's timeline on his website](https://www.florin-pop.com/timeline):

1. Simplicity
1. It's about more than blog posts

### Simplicity

A bit over 1,000 visitors per month read a single blog post where I explain why I moved from React to Svelte, according to [my public website analytics](https://your-analytics.org/mikenikles.com?preset=30days).
The second most visited page is the homepage with roughly 800 visitors per month. While the previous version was colorful and had nice images and blog post summaries, I received feedback from people saying they look at the titles and if anything sounds interesting, they click and read the blog post.

The new timeline view reflects that and only displays a blog post's title, with a call to action to read the post.

A nice side effect with the new view is a much more performant homepage given there is only a single image to load.

### It's about more than blog posts

Throughout my career, I have mentored others, answered questions in online communities and worked on side projects.
With the timeline view, I have a place to showcase this work and help others find me online and see what I'm up to.

The filter & search features help narrow down what is displayed in the timeline. Starting in 2021, I am going to revive my [YouTube channel](https://www.youtube.com/channel/UCgEvLz_YbByFqn8f32wh9lA), so expect there to be new entries on the timeline.

## Technical implementation

The majority of the work happened in [PR 252](https://github.com/mikenikles/www-mikenikles-com/pull/252). There are about 10 lines of custom CSS code, the rest is styled with [Tailwind CSS](https://tailwindcss.com) and of course still based on [Svelte](https://svelte.dev) & [Sapper](https://sapper.svelte.dev).

---
title: 'A Link Content Previewer with Svelte & Sapper'
slug: 'a-link-content-previewer-with-svelte-sapper'
summary: "Develop a <LinkPreview> Svelte component to display a link's content in a preview card."
createdAt: 2020-04-18T00:00:00.000Z
tags: ['svelte', 'sapper', 'web', 'development']
layout: blog
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

<!-- Photo by [JJ Ying](https://unsplash.com/@jjying?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/link?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) -->

The inspiration for this post came from reading [Ilona](https://dev.to/ilonacodes)'s fantastic post on dev.to titled "[Frontend Shorts: How to create link content previewer with React, Vue, and Vanilla JavaScript](https://dev.to/ilonacodes/frontend-shorts-how-to-create-link-content-previewer-with-react-vue-and-vanilla-javascript-1pm1)". She did an amazing job explaining all the details, for VanillaJS, React and Vue. Please have a look at her post for full details.

In summary, she developed a feature that displays a content preview when a user moves their mouse over a link.

Below is an animated gif Ilona created to illustrate how this looks in practice:

![Link content previewer in action]({assetsBasePath}/1.gif)

Link content previewer in action

With all code in place as described in her post, the solution can be used as follows:

```html
<a
	href="https://dev.to"
	onmouseover="showLinkPreview()"
	onmouseleave="hideLinkPreview()"
	class="link-with-preview"
	data-image="https://thepracticaldev.s3.amazonaws.com/i/6hqmcjaxbgbon8ydw93z.png"
	data-title="DEV Community 👩‍💻👨‍💻"
	data-text="Where programmers share ideas and help each other grow—A constructive and inclusive social network."
>
	dev.to.
</a>
```

## There must be a way to dynamically create the preview... 🤔

This was my first thought when I read the blog post and looked at the source code. What if we fetched the link's `href` source in the `onmouseover` handler and dynamically set the title, text and image?

A sample Sapper application is available on my Github profile at [https://github.com/mootoday/sapper-link-preview](https://github.com/mootoday/sapper-link-preview).

Shouldn't be too hard, eh? Use the browser's built-in `fetch` in the `onmouseover` handler, parse the returned HTML and look for the page's `<title>`, some sort of meta tag for the text and image.

**Note**: Continue to read before you try this out ;-)

### ❌ Cross-Origin Resource Sharing (CORS)

From the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS):

> Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.

In other words, our website on https://domain-a.com can't easily fetch content from https://domain-b.com. However, the whole point of the link content previewer is to do exactly that.

## A backend service to the rescue

Alright then, if we can't fetch the content on the client-side, let's do it on the backend. There's no CORS issues there and we can easily fetch any URL, parse its HTML and create the link preview.

### Sapper server routes

In a [Sapper](https://sapper.svelte.dev/) application, we can use [server routes](https://sapper.svelte.dev/docs#Server_routes) to do the job for our link conten previewer.

All we need is the following server route at `src/routes/link-preview.json.js`:

```js
import got from 'got';
import * as cheerio from 'cheerio';

// TODO: Expand to include other meta tags (e.g. Facebook, Twitter, etc.)
const getTitle = ($) => $('head title').text();
const getDescription = ($) => $('meta[name=description]').attr('content');
const getImgSrc = ($) => $("meta[property='og:image']").attr('content');

export const get = async (req, res) => {
	const { href } = req.query;
	const fetchResponse = await got(href);
	const $ = cheerio.load(fetchResponse.body);

	res.setHeader('Content-Type', 'application/json');
	res.end(
		JSON.stringify({
			title: getTitle($),
			description: getDescription($),
			imgSrc: getImgSrc($)
		})
	);
};
```

It exports a `get` function, which maps to a GET request to `/link-preview.json`. Since that endpoints is served from the same domain as the frontend application, we have no CORS issues.

We need two libraries:

- [`got`](https://www.npmjs.com/package/got): A request library for Node.js
- [`cheerio`](https://www.npmjs.com/package/cheerio): An implementation of core jQuery designed for the server

In the `get` function, we first read the `href` request query parameter. The frontend can provide that when calling the endpoint with `/link-preview.json?href=https://dev.to`.

We send a GET request to that URL using `got`. Once the response comes back, we load the response body into `cheerio`, this helps us query the HTML in a way that's similar to how jQuery works.

Lastly, the `get` function returns a JSON object with the `title`, `description` and `imgSrc`, all read from the HTML.

**Note**: As commented in the code, the `getTitle`, `getDescription` and `getImgSrc` functions can be extended at will to read different meta tags.

### Test the backend service

In your Sapper project, run `npm install` and `npm run dev` to start the server. If you access `http://localhost:3000/link-preview.json?href=https://dev.to`, you'll see the JSON response as expected.

## Create a LinkPreview Svelte component

To use the above backend service, let's create a `<LinkPreview>` Svelte component. The goal is to end up with the following usage of this component:

> `<LinkPreview href="https://dev.to">dev.to</LinkPreview>`

Expressed as a [user story](https://en.wikipedia.org/wiki/User_story):

> As a frontend developer,  
> I want to use the `<LinkPreview>` component the same way I would use an `<a>` tag,  
> so that I can leverage all supported `<a>` attributes.

With these goals in mind, let's start with a new `src/components/link-preview.svelte` file:

```html
<a href="{$$props.href}" {...$$props}>
	<slot />
</a>
```

This gives us a `<LinkPreview>` component that simply wraps an `<a>` tag and passes all props to the underlying `<a>` tag. For example, `<LinkPreview href="https://dev.to">dev.to</LinkPreview>` renders as `<a href="https://dev.to">dev.to</a>`.

### Add the preview card to display the link content preview

We could modify the existing `link-preview.svelte` component and add the HTML for the card and the `mouseover` and `mouseleave` event handlers. However, let's instead create a separate component for that to encapsulate the behavior and design.

Create a `src/components/link-preview-card.svelte` file with basic Svelte boilerplate, plus the card HTML and CSS Ilona provided in her blog post:

```html
<script></script>

<style>
	.card {
		width: 150px;
		font-size: 10px;
		color: black;
		position: absolute;
		z-index: 100;
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
	}
	.card img {
		width: 150px;
	}
	.card-title {
		font-size: 14px;
	}
</style>

<div class="card">
	<img src="" class="card-img-top" />
	<div class="card-body">
		<h5 class="card-title"></h5>
		<p class="card-text"></p>
	</div>
</div>
```

Next, let's define the `title`, `description` and `imgSrc` variables. For now, they're empty, but we will soon use the backend service we created earlier to provide actual values. While we're at it, we also update the HTML to use the new variables.

```html
<script>
	let title = '';
	let description;
	let imgSrc;
</script>

<style>
	...;
</style>

<div class="card">
	<img src="{imgSrc}" alt="{title}" class="card-img-top" />
	<div class="card-body">
		<h5 class="card-title">{title}</h5>
		<p class="card-text">{description}</p>
	</div>
</div>
```

With that skeleton in place, it's time to populate the three variables dynamically, based on the link's `href` attribute.

We start with Svelte's `onMount()` lifecycle method to call the backend service. What this means is that when the component gets mounted, we immediately call the backend service, which in turns fetches the `href`'s content and parses it. Once done, the preview card's values are populated so that by the time a user moves their mouse over a link, the preview card displays the content.

```html
<script>
	 import { onMount } from "svelte";

	 export let href;

	 ...

	 onMount(() => {
	   fetch("/link-preview.json?href=" + href)
	     .then(response => response.json())
	     .then(linkData => {
	       title = linkData.title;
	       description = linkData.description;
	       imgSrc = linkData.imgSrc;
	     });
	});
</script>
```

You notice the new `href` prop we defined. We will pass that in when we use this component.

Now, the HTML needs a few updates for better user experience. Not every website provides the meta tags our backend service looks for. For now, we simply hide the parts that are missing.

```html
<div class="card">
	{#if imgSrc}
	<img src="{imgSrc}" alt="{title}" class="card-img-top" />
	{/if}
	<div class="card-body">
		<h5 class="card-title">{title}</h5>
		{#if description}
		<p class="card-text">{description}</p>
		{/if}
	</div>
</div>
```

To wrap up the development of this component, we need to indicate whether to show or hide this card. Remember, the preview card should only be displayed as long as the user's mouse is over a particular link. The only place we can determine that is in the already created `<LinkPreview>` component where the `<a>` tag is. So let's expose a `show` prop from the `<LinkPreviewCard>` component and wrap the entire HTML in an `if` statement.

```html
<script>
	...

	export href;
	export show = false;

	...
</script>

{#if show}
<div class="card">
	{#if imgSrc}
	<img src="{imgSrc}" alt="{title}" class="card-img-top" />
	{/if}
	<div class="card-body">
		<h5 class="card-title">{title}</h5>
		{#if description}
		<p class="card-text">{description}</p>
		{/if}
	</div>
</div>
{/if}
```

By default, the card is hidden (`export show = false;`).

### Use the new LinkPreviewCard component

Back in the `src/components/link-preview.svelte` component, we need to import the new preview card component first and add it inside the `<a>` tag.

```html
<script>
	import LinkPreviewCard from './link-preview-card.svelte';
</script>

<a href="{$$props.href}" {...$$props}>
	<slot />
	<LinkPreviewCard href="{$$props.href}" />
</a>
```

The `href` prop we pass to the `<LinkPreviewCard>` component is the one we send to the backend service to fetch the preview content.

To properly style the preview card, the `<a>` tag needs a tiny bit of styling:

```html
<style>
	a {
		position: relative;
	}
</style>
```

### Deal with the mouseover and mouseleave events

Lastly, the preview card needs to be displayed when the mouse is over a link and hidden otherwise. We track this in a new variable:

```html
<script>
	...

	let showPreviewCard = false;
</script>
```

Now, let's add the `mouseover` and `mouseleave` handlers and pass the `show` prop to the `<LinkPreviewCard>` component.

```html
<a {href} {...$$restProps}
  on:mouseover={() => showPreviewCard = true}
  on:mouseleave={() => showPreviewCard = false}
>
  <slot />
  <LinkPreviewCard {href} show={showPreviewCard} />
</a>
```

## Use the LinkPreview component

The `<LinkPreview>` component can now be used anywhere in the application, for example in `src/routes/index.svelte`:

```html
<script>
	import LinkPreview from '../components/link-preview.svelte';
</script>

<p>
	Move your mouse over the following link to see a preview of the link's content:
	<LinkPreview href="https://dev.to">dev.to.</LinkPreview>
</p>
```

## Conclusion

Thanks to Ilona for posting the initial blog post on this topic!

As we saw in my addition, with a simple backend service, it is possible to load a link's preview dynamically. The benefit of that is an always up-to-date preview even when a website we link to changes their title, description or main image.

If you like this kind of content, make sure to follow me on X [@mootoday](https://x.com/mootoday) to get notified of new blog posts.

### I'm writing a book, Cloud Native Web Development

If you want to learn how to develop modern, cloud-native web applications end-to-end, please sign up for updates at [https://gumroad.com/mikenikles](https://gumroad.com/mikenikles). I am currently writing a book with detailed instructions.

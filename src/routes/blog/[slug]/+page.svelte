<script>
	// Credit: https://github.com/rodneylab/sveltekit-blog-mdx/blob/main/src/routes/%5Bslug%5D/%2Bpage.svelte
	// import { browser } from '$app/environment';
	import BlogPost from '$lib/components/blog/post.svelte';
	// import '$lib/styles/index.scss';
	// import '$lib/styles/normalise.css';
	// import lazyload from 'vanilla-lazyload';
	import Comments from "$lib/components/comments.svelte";
	import ContentLayout from "$lib/components/content-layout.svelte";

	/** @type {import('./$types').PageData} */
	export let data;

	// const { page, post, imageData } = data;

	// if (browser && !document.lazyloadInstance) {
	// 	document.lazyloadInstance = new lazyload();
	// }

  const datePublishedDisplay = new Date(Date.parse(data.post?.datePublished)).toLocaleDateString(undefined, {
    dateStyle: "long"
  });

  const datePublishedYYYYMMDD = new Date(Date.parse(data.post?.datePublished)).toLocaleDateString(undefined, {
    dateStyle: "short"
  });
</script>

<!-- <BlogPost {post} {imageData} /> -->

<svelte:head>
	<title>{data.post?.postTitle} - mikenikles.com</title>
	<meta name="description" content="{data.post?.seoMetaDescription}">
</svelte:head>

<ContentLayout title={data.post?.postTitle}>
	<svelte:fragment slot="subtitle">
		<time
			datetime="{datePublishedYYYYMMDD}"
			class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
			><span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" /><span
				class="ml-3">{datePublishedDisplay}</span
			></time
		>

	</svelte:fragment>
	<div class="mt-8 prose dark:prose-invert">
		<svelte:component this={data.page} />
		<Comments />
	</div>
</ContentLayout>

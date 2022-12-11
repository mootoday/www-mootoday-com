<script>
	// Credit: https://github.com/rodneylab/sveltekit-blog-mdx/blob/main/src/routes/%5Bslug%5D/%2Bpage.svelte
	// import { browser } from '$app/environment';
	import BlogPost from '$lib/components/blog/post.svelte';
	// import '$lib/styles/index.scss';
	// import '$lib/styles/normalise.css';
	// import lazyload from 'vanilla-lazyload';

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

<main>
	<div class="sm:px-8 mt-16 lg:mt-32">
		<div class="mx-auto max-w-7xl lg:px-8">
			<div class="relative px-4 sm:px-8 lg:px-12">
				<div class="mx-auto max-w-2xl lg:max-w-5xl">
					<div class="xl:relative">
						<div class="mx-auto max-w-2xl">
							<article>
								<header class="flex flex-col">
									<h1
										class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
									>
										{data.post?.postTitle}
									</h1>
									<time
										datetime="{datePublishedYYYYMMDD}"
										class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
										><span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" /><span
											class="ml-3">{datePublishedDisplay}</span
										></time
									>
								</header>
								<div class="mt-8 prose dark:prose-invert">
									<svelte:component this={data.page} />
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

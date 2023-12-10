<script lang="ts">
	// Credit: https://github.com/rodneylab/sveltekit-blog-mdx/blob/main/src/routes/%5Bslug%5D/%2Bpage.svelte
	import type { PageData } from './$types';
	import Comments from '$lib/components/comments.svelte';
	import ContentLayout from '$lib/components/content-layout.svelte';
	import { FeedbackWidget } from '@howisit/svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	const datePublishedDisplay = new Date(Date.parse(data.metadata?.createdAt)).toLocaleDateString(
		undefined,
		{
			dateStyle: 'long'
		}
	);

	const datePublishedYYYYMMDD = new Date(Date.parse(data.metadata?.createdAt)).toLocaleDateString(
		undefined,
		{
			dateStyle: 'short'
		}
	);
</script>

<svelte:head>
	<title>{data.metadata?.title} - mikenikles.com</title>
	<meta name="description" content="{data.metadata?.summary}" />

	<!-- Facebook Meta Tags -->
  <meta property="og:url" content="{$page.url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{data.metadata?.title}">
  <meta property="og:description" content="{data.metadata?.summary}">
  <meta property="og:image" content="{$page.url}/card.png">

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta property="twitter:domain" content="{$page.url.host}">
  <meta property="twitter:url" content="{$page.url}">
  <meta name="twitter:title" content="{data.metadata?.title}">
  <meta name="twitter:description" content="{data.metadata?.summary}">
  <meta name="twitter:image" content="{$page.url}/card.png">

	<link href="/prism.css" rel="stylesheet" />
</svelte:head>

<ContentLayout title={data.metadata?.title}>
	<svelte:fragment slot="subtitle">
		<time
			datetime={datePublishedYYYYMMDD}
			class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
			><span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" /><span class="ml-3"
				>{datePublishedDisplay}</span
			></time
		>
	</svelte:fragment>
	<div class="mt-8 prose dark:prose-invert">
		<svelte:component this={data.page} data={{ ...data.metadata }} />
		<FeedbackWidget projectId="clfkqzc1z0000lykgdl2z4jxe" />
		<Comments />
	</div>
</ContentLayout>

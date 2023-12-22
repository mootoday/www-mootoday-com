<script lang="ts">
	// Credit: https://github.com/rodneylab/sveltekit-blog-mdx/blob/main/src/routes/%5Bslug%5D/%2Bpage.svelte
	import type { PageData } from './$types';
	import Comments from '$lib/components/comments.svelte';
	import ContentLayout from '$lib/components/content-layout.svelte';
	import { FeedbackWidget } from '@howisit/svelte';

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
	<title>{data.metadata?.title} - mootoday.com</title>
	<meta name="description" content={data.metadata?.summary} />
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

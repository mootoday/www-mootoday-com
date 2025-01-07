<script lang="ts">
	import type { PageData } from './$types';

	import ArticlePreview from '$lib/components/blog/preview-blog.svelte';
	import ContentLayout from '$lib/components/content-layout.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Blog posts - mootoday.com</title>
	<meta
		name="description"
		content="Content about developer experience, full-stack web development, tech careers, and whatever else crosses my mind."
	/>
</svelte:head>

<ContentLayout title="Short and long-form content.">
	<svelte:fragment slot="intro">
		For hot takes on anything tech, follow me on X <a href="https://bsky.app/profile/mootoday.com"
			>@mootoday</a
		>.
	</svelte:fragment>
	<div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
		<div class="flex max-w-3xl flex-col space-y-16">
			{#each data.posts as post}
				<ArticlePreview {post} />
			{/each}
			<ArticlePreview
				post={{
					createdAt: '2019-12-29T11:30:30',
					title: 'Read many more articles on Medium',
					summary: '',
					slug: 'medium-posts'
				}}
			/>
		</div>
	</div>
</ContentLayout>

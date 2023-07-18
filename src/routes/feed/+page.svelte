<script lang="ts">
	import { writable } from 'svelte/store';

	import ContentLayout from '$lib/components/content-layout.svelte';
	import Add from '$lib/components/feed/add.svelte';
	import Entry from '$lib/components/feed/entry.svelte';

	export let data;

	const newContent = writable<string>("");
</script>

<svelte:head>
	<title>Feed - mikenikles.com</title>
	<meta name="description" content="Short-form content" />
</svelte:head>

<ContentLayout title="Short-form content">
	<svelte:fragment slot="intro">
		<strong class="text-teal-500">Food for thought & opinions</strong> I have about software engineering.
	</svelte:fragment>
	<div class="mx-auto md:w-1/2">
		<Add {newContent} />
		{#if $newContent}
			<Entry entry={{
				id: `${new Date(new Date().getTime() + 1 * 60000).getTime()}`,
				content: $newContent,
			}} />
		{/if}
		{#each data.entries as entry}
			<Entry {entry} />
		{/each}
	</div>
</ContentLayout>

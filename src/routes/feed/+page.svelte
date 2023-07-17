<script lang="ts">
  import ContentLayout from '$lib/components/content-layout.svelte';
  import Entry from "$lib/components/feed/entry.svelte";

	export let data;
</script>

<svelte:head>
	<title>Feed - mikenikles.com</title>
	<meta
		name="description"
		content="Short-form content"
	/>
</svelte:head>

<ContentLayout
	title="Short-form content"
>
	<svelte:fragment slot="intro">
    <strong class="text-teal-500">Food for thought & opinions</strong> I have about software engineering.
	</svelte:fragment>

    {#each data.entries as entry}
        <Entry {entry} />
    {/each}
</ContentLayout>

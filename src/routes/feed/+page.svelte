<script lang="ts">
  import ContentLayout from '$lib/components/content-layout.svelte';
  import Entry from "$lib/components/feed/entry.svelte";
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
    <strong class="text-teal-500">Online courses</strong> I authored about full-stack web development.
	</svelte:fragment>

    {#each new Array(3) as entry}
        <Entry />
    {/each}
</ContentLayout>

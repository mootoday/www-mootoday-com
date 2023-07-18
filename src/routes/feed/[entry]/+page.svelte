<script lang="ts">
	import ContentLayout from '$lib/components/content-layout.svelte';
	import Entry from '$lib/components/feed/entry.svelte';

  export let data;
</script>

<svelte:head>
	<title>Feed - mikenikles.com</title>
	<meta name="description" content="{data.entry.content}" />
</svelte:head>

<ContentLayout title="">
	<svelte:fragment slot="intro">
		<strong class="text-teal-500"><a href="/feed">More content like this</a></strong> on my feed.
	</svelte:fragment>
	<div class="mx-auto md:w-1/2">
    <Entry entry={data.entry} />
	</div>
</ContentLayout>

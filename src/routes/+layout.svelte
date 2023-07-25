<script lang="ts">
	import '../app.postcss';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	{@html '<script async src="https://your-analytics.org/ya.js" data-domain="mikenikles.com"></script>'}
</svelte:head>

<div class="fixed inset-0 flex justify-center sm:px-8">
	<div class="flex w-full max-w-7xl lg:px-8">
		<div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
	</div>
</div>

<div class="relative">
	<Header />
	<slot />
	<Footer />
</div>

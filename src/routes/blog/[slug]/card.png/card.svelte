<script lang="ts">
	export let createdAt: string;
	export let title: string;

	const datePublishedDisplay = new Date(Date.parse(createdAt)).toLocaleDateString(undefined, {
		dateStyle: 'long'
	});

	const datePublishedYYYYMMDD = new Date(Date.parse(createdAt)).toLocaleDateString(undefined, {
		dateStyle: 'short'
	});
</script>

<div tw="flex flex-col w-full h-full bg-black pl-12">
	<time tw="mt-40 flex items-center text-zinc-400 pl-3.5" datetime={datePublishedYYYYMMDD}
		><span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"
			><span class="h-4 w-0.5 rounded-full bg-zinc-500" /></span
		>{datePublishedDisplay}</time
	>
	<h1 tw="text-4xl font-bold tracking-tight text-zinc-100">{title}</h1>
	<div
		tw="relative mt-4 flex items-center text-zinc-400"
	>
		<span tw="text-teal-500 mr-1">Read article</span>by mikenikles
	</div>
</div>

<script lang="ts">
	import type { createDialog } from '@melt-ui/svelte';

	export let src: string;
	export let dialog: ReturnType<typeof createDialog>;

	const { portal, overlay, content, open } = dialog;
</script>

<div use:portal>
	{#if $open}
		<div {...$overlay} use:overlay class="fixed inset-0 z-40 bg-white/50 dark:bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-2xl
            shadow-lg"
			{...$content}
			use:content
		>
			<img class="aspect-[3/2] w-full rounded-2xl object-cover" {src} alt="" />
		</div>
	{/if}
</div>

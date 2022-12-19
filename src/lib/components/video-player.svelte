<script lang="ts">
	export let playbackId: string;
	// export let muxBlurHashData;
	export let title: string;

	const player = import('@mux/mux-player');

	// const currentVideoBlurHashData = muxBlurHashData[playbackId];
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/@mux/mux-player"></script>
</svelte:head>

<!-- <div
	class="w-full relative"
	style:aspect-ratio={currentVideoBlurHashData.sourceWidth / currentVideoBlurHashData.sourceHeight}
> -->
	{#await player}
		<!-- <div
			class="placeholder"
			style:background-image="url({currentVideoBlurHashData.blurHashBase64})"
		/> -->
	{:then}
		<mux-player
			class="TTTabsolute TTTinset-0"
			stream-type="on-demand"
			playback-id={playbackId}
			{title}
			metadata-video-title={title}
		/>
	{/await}
<!-- </div> -->

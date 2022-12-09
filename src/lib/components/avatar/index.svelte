<script lang="ts">
	let clazz = '';
	export { clazz as class };
	export let style = "";
	export let large = false;
</script>

<a href="/" aria-label="Home" class="pointer-events-auto {clazz}" {style} {...$$props}>
	<img
    class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
    class:h-16={large}
    class:w-16={large}
    class:h-9={!large}
    class:w-9={!large}
		style:transform="var(--transform)"
		src="/headshot.png"
		alt="Mike's headshot"
		decoding="async"
	/>
</a>

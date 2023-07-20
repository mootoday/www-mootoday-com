<script>
	import { onMount } from 'svelte';

	let seconds = 0;
	onMount(() => {
		const interval = setInterval(() => {
			seconds++;
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p>
	You've been on this page for
	{seconds}
	{seconds === 1 ? 'second' : 'seconds'}
</p>

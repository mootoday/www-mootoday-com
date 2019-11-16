<script>
  import TailwindBase from '../tailwind-base.svelte'
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<TailwindBase />

<Nav {segment}/>

<main>
	<slot></slot>
</main>
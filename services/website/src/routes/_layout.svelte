<script>
  import Header from "../components/header/index.svelte";
  import TailwindCSS from "../components/tailwindcss.svelte";

  export let segment;
</script>

<TailwindCSS />

<Header />
<main>
	<slot></slot>
</main>

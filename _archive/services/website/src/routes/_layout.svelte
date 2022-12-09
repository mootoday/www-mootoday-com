<script>
  import Header from "../components/header/index.svelte";
  import TailwindCSS from "../components/tailwindcss.svelte";

  export let segment;
</script>

<style>
  .bgcnwd {
      background-color: #041522;
      @apply antialiased;
  }
</style>

<TailwindCSS />

<Header />
<main class:bgcnwd={segment === "cloud-native-web-development"}>
	<slot></slot>
</main>

<script>
  import Header from "../components/header/index.svelte";
  import TailwindCSS from "../components/tailwindcss.svelte";
  import WebAnalytics from "../components/web-analytics.svelte";

  export let segment;
</script>

<style>
  .bgcnwd {
      background-color: #041522;
  }
</style>

<TailwindCSS />

<Header />
<main class:bgcnwd={segment === "cloud-native-web-development"}>
	<slot></slot>
</main>

<WebAnalytics />

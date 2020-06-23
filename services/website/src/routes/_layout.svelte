<script>
  import Header from "../components/header/index.svelte";
  import TailwindCSS from "../components/tailwindcss.svelte";
  import WebAnalytics from "../components/web-analytics.svelte";

  export let segment;
</script>

<TailwindCSS />

<Header {segment} />
<main>
	<slot></slot>
</main>

<WebAnalytics />

<script>
  import TailwindCSS from "../components/tailwindcss.svelte";
  import WebAnalytics from "../components/web-analytics.svelte";
</script>

<TailwindCSS />

<main>
	<slot></slot>
</main>

<WebAnalytics />

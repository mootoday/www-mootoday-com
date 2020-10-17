<script>
  import OpenGraphPreview from "./open-graph-preview.svelte";
  import TwitterPreview from "./twitter-preview.svelte";

  export let description = "探討多方位群體的實驗場";
  export let image = "";
  export let imageAlt = "";
  export let keywords = "藝術家、策展人、作家、理論家的交匯處";
  export let title = "據點。句點";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content="Wong Fuk Kuen">
  <meta name="description" content="{description}" />
  <meta name="keywords" content="{keywords}" />

  <TwitterPreview {description} {image} {imageAlt} {title} />
  <OpenGraphPreview {description} {image} {title} />

  <slot />
</svelte:head>

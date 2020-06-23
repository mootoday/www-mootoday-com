<script>
  import OpenGraphCard from "./open-graph-preview.svelte";
  import TwitterCard from "./twitter-preview.svelte";

  export let description;
  export let image;
  export let imageAlt = "";
  export let title;
</script>

<svelte:head>
  <title>Mike's Personal Website</title>
  <TwitterCard {description} {image} {imageAlt} {title} />
  <OpenGraphCard {description} {image} {title} />
</svelte:head>

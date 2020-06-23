<script>
  import OpenGraphPreview from "./open-graph-preview.svelte";
  import TwitterPreview from "./twitter-preview.svelte";

  export let description = "Software Architect 👷. Productivity ⏱️ & Team Morale 😊. Javascript, Typescript, Cloud Native ☁️. Author 📚 and Educator 🧑‍🏫.";
  export let image = "";
  export let imageAlt = "";
  export let keywords = "software architecture, productivity, team morale, javascript, typescript, cloud, cloud native, author, educator";
  export let title = "Mike’s Personal Website - Software Architecture & More";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{description}" />
  <meta name="keywords" content="{keywords}" />

  <TwitterPreview {description} {image} {imageAlt} {title} />
  <OpenGraphPreview {description} {image} {title} />

  <slot />
</svelte:head>

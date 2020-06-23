<script>
  import { stores } from '@sapper/app';

  export let description;
  export let image;
  export let imageAlt;
  export let title;

  const { page } = stores();
</script>

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@mikenikles" />
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="{image}">
<meta name="twitter:image:alt" content="{imageAlt}">
<meta name="twitter:title" content="{title}">
<meta name="twitter:url" content="https://{$page.host + $page.path}">
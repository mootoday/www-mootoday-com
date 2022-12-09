<script>
  import { stores } from '@sapper/app';

  export let description;
  export let image;
  export let title;

  const { page } = stores();
</script>

<meta property="og:description" content="{description}">
<meta property="og:image" content="{image}">
<meta property="og:site_name" content="Mike's Personal Website">
<meta property="og:title" content="{title}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.mikenikles.com{$page.path}">

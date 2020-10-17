<script>
  import { stores } from '@sapper/app';

  export let description;
  export let image;
  export let title;

  const { page } = stores();
</script>

<meta property="og:description" content="{description}">
<meta property="og:image" content="{image}">
<meta property="og:site_name" content="據點。句點">
<meta property="og:title" content="{title}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://http://floatingprojectscollective.net/{$page.path}">

<script>
  export let post;
</script>

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@mikenikles" />
<meta name="twitter:description" content="{post.twitter_description || post.meta_description}">
<meta name="twitter:image" content="{post.twitter_image || post.feature_image}">
<meta name="twitter:image:alt" content="{post.twitter_title || post.meta_title}">
<meta name="twitter:title" content="{post.twitter_title || post.meta_title}">
<meta name="twitter:url" content="{post.url}">

<script>
  import OpenGraph from './open-graph.svelte';
  import TwitterCard from './twitter-card.svelte';
  
  export let post;
</script>

<OpenGraph {post} />
<TwitterCard {post} />
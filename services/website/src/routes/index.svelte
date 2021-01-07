<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json());
  }
</script>

<script>
  import Footer from "../components/footer.svelte";
  import SeoHead from "../components/seo/head.svelte";

  export let posts;

  // Without cloning the posts, it is an empty array when hydration kicks in.
  const postsArray = [...posts];


</script>

<SeoHead />

<h1>Latest events:</h1>


<h1>Latest articles:</h1>
{#each postsArray as post}
	{post.metadata.title}
{/each}

<Footer />

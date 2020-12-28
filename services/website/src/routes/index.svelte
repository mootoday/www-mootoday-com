<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json());
  }
</script>

<script>
  import BlogPostPreview from "../components/blog-post/previews/index.svelte";
  import BlogPostPreviewLead from "../components/blog-post/previews/lead.svelte";
  import Footer from "../components/footer.svelte";
  import Header from "../components/header/index.svelte";
  import SeoHead from "../components/seo/head.svelte";
  import Subscribe from "../components/subscribe.svelte";
  import { headerStore, searchStore } from "../stores";

  export let posts;

  // Without cloning the posts, it is an empty array when hydration kicks in.
  const postsArray = [...posts];

  $: filteredPosts = postsArray.filter(post =>
    post.metadata.title.toLowerCase().includes($searchStore.toLowerCase()) ||
    post.metadata.summary.toLowerCase().includes($searchStore.toLowerCase())
  );

  const titleAction = node => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        headerStore.setHeaderTransparent(entry.isIntersecting);
      });
    });

    observer.observe(node);

    return {
      destroy() {
        headerStore.setHeaderTransparent(false);
        observer.disconnect();
      }
    };
  };

</script>

<SeoHead />

<h1>Latest events:</h1>


<h1>Latest articles:</h1>

<Footer />

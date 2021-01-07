<script context="module">
  import postFetcher from "../_post-fetcher";

  export function preload({ path }) {
    return postFetcher(this.fetch, path.split("/").pop());
  }
</script>

<script>
  import BlogPostWrapper from "../../../components/blog-post/wrapper.svelte";
  import BlogPost, { metadata } from "../../../blog-posts/2020-06-25-together-quotidian-diversions-kin-choi-lam-in-search-of-time-lost-04/index.svx";

  export let post;
</script>

<BlogPostWrapper {post}>
  <BlogPost />
</BlogPostWrapper>

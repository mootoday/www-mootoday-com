<script context="module">
  import postFetcher from "../_post-fetcher";

  export function preload({ path }) {
    return postFetcher(this.fetch, path.split("/").pop());
  }
</script>

<script>
  import BlogPostWrapper from "../../../components/blog-post/wrapper.svelte";
  import BlogPost, { metadata } from "../../../blog-posts/2020-07-09-dreaming-quotidian-diversions-kin-choi-lam-in-search-of-time-lost-06/index.svx";

  export let post;
</script>

<BlogPostWrapper {post}>
  <BlogPost />
</BlogPostWrapper>

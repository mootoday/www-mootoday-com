<script context="module">
  import postFetcher from "../_post-fetcher";

  export function preload({ path }) {
    return postFetcher(this.fetch, path.split("/").pop());
  }
</script>

<script>
  import BlogPostWrapper from "../../../components/blog-post/wrapper.svelte";
  import BlogPost, { metadata } from "../../../blog-posts/2021-01-03-b-daman-and-i-once-a-kid-now-i-m-30/index.svx";

  export let post;
</script>

<BlogPostWrapper {post}>
  <BlogPost />
</BlogPostWrapper>

<script context="module">
  import postFetcher from "../_post-fetcher";

  export function preload({ path }) {
    return postFetcher(this.fetch, path.split("/").pop());
  }
</script>

<script>
  import BlogPostWrapper from "../../../components/blog-post/wrapper.svelte";
  import BlogPost, { metadata } from "../../../blog-posts/2020-07-03-how-i-wrote-214-pages-for-a-web-development-book-with-19-pull-requests-in-3-months/index.svx";

  export let post;
</script>

<BlogPostWrapper {post}>
  <BlogPost />
</BlogPostWrapper>

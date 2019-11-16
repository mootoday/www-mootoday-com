<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then((posts) => {
			return { posts };
		}).catch(error => {
      console.log(error)
    });
	}
</script>

<script>
  import FeaturedPosts from '../components/featured-posts.svelte';
  import BlogPostSummaryList from '../components/blog-post-summary-list.svelte';

	export let posts;
</script>

<style>
</style>

<svelte:head>
	<title>Software Architecture, Travel, Digital Transformation</title>
</svelte:head>

<div>
  <FeaturedPosts />
  <BlogPostSummaryList {posts} />
</div>
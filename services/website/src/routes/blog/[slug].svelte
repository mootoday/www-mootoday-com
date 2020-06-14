<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();
		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  import P202006141 from "../../blog-posts/2020-06-14-first-v2-post.svx";

  import { stores } from '@sapper/app';

  export let post;

  const { page } = stores();
  const blogPosts = {
    "2020-06-14-first-v2-post.svx": P202006141
  };
</script>

<svelte:component this={blogPosts[post.filename]} />

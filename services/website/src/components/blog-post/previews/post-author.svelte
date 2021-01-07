<script>
	export let post
</script>

{#if post.metadata.author}
<div class="flex items-center">
	<div class="avatar"
	     style="background-image: url('/authors/{post.metadata.author.slug}.jpg')"></div>
	<p class="text-black font-semibold ml-4">
		{post.metadata.author.name}
	</p>
</div>
{/if}
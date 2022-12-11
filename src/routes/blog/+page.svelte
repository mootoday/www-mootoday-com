<script lang="ts">
  import type {PageData} from "./$types"

	import ArticlePreview from "$lib/components/blog/preview-blog.svelte";

  export let data: PageData;
</script>

<svelte:head>
	<title>Blog posts - mikenikles.com</title>
	<meta name="description" content="Content about developer experience, full-stack web development, tech careers, and whatever else crosses my mind.">
</svelte:head>

<main>
	<div class="sm:px-8 mt-16 sm:mt-32">
		<div class="mx-auto max-w-7xl lg:px-8">
			<div class="relative px-4 sm:px-8 lg:px-12">
				<div class="mx-auto max-w-2xl lg:max-w-5xl">
					<header class="max-w-2xl">
						<h1
							class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
						>
							Short and long-form content.
						</h1>
						<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
							For hot takes on anything tech, follow me on Twitter <a href="https://twitter.com/mikenikles">@mikenikles</a>.
						</p>
					</header>
					<div class="mt-16 sm:mt-20">
						<div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
							<div class="flex max-w-3xl flex-col space-y-16">
								{#each data.posts as post}
									<ArticlePreview {post} />
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

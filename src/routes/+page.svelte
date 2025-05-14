<script lang="ts">
	import type { PageData } from './$types';

	import ArticlePreview from '$lib/components/blog/preview-homepage.svelte';

	export let data: PageData;

	const bannerImages = [
		{
			alt: 'Photo by Prateek Katyal: https://www.pexels.com/photo/black-and-white-laptop-2740956/'
		},
		{
			alt: 'Photo by Alex Fu: https://www.pexels.com/photo/dream-big-signage-945966/'
		},
		{
			alt: 'Photo by Anna Tarazevich: https://www.pexels.com/photo/welcome-lettering-text-on-black-background-5598288/'
		},
		{
			alt: 'Photo by Polina Kovaleva: https://www.pexels.com/photo/uneven-cutouts-on-black-background-6185244/'
		},
		{
			alt: 'Photo by Jorge Urosa: https://www.pexels.com/photo/motivational-quote-in-a-frame-9169913/'
		}
	];
</script>

<svelte:head>
	<title>www.mootoday.com</title>
	<meta
		name="description"
		content="Content about developer experience, full-stack web development, tech careers, and whatever else crosses my mind."
	/>
</svelte:head>

<main>
	<div class="sm:px-8 mt-9">
		<div class="mx-auto max-w-7xl lg:px-8">
			<div class="relative px-4 sm:px-8 lg:px-12">
				<div class="mx-auto max-w-2xl lg:max-w-5xl">
					<div class="max-w-4xl">
						<h1
							class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
						>
							Always learn, always grow.
						</h1>
						<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
							Mike's space. Content about developer experience, full-stack web development, tech
							careers, and whatever else crosses my mind.
						</p>
						<div class="mt-6 flex gap-6">
							<a
								class="group -m-1 p-1"
								aria-label="Follow on Bluesky"
								href="https://bsky.app/profile/mootoday.com"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 600 530"
									class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
									/>
								</svg>
							</a><a
								class="group -m-1 p-1"
								aria-label="Follow on GitHub"
								href="https://github.com/mootoday"
								><svg
									viewBox="0 0 24 24"
									aria-hidden="true"
									class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
									><path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
									/></svg
								></a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-16 sm:mt-20">
		<div class="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
			{#each bannerImages as { alt }, index}
				<div
					class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl rotate-2"
				>
					<picture>
						<source srcset="/banner-images/pexels-{index + 1}.webp" type="image/webp" /><img
							{alt}
							src="/banner-images/pexels-{index + 1}.jpeg"
							width="288"
							height="320"
							decoding="async"
							class="absolute inset-0 h-full w-full object-cover"
							loading="lazy"
							style="color:transparent"
						/></picture
					>
				</div>
			{/each}
		</div>
	</div>
	<div class="sm:px-8 mt-24 md:mt-28">
		<div class="mx-auto max-w-7xl lg:px-8">
			<div class="relative px-4 sm:px-8 lg:px-12">
				<div class="mx-auto max-w-2xl lg:max-w-5xl">
					<div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
						<div class="flex flex-col gap-16">
							{#each data.posts as post}
								<ArticlePreview {post} />
							{/each}
							<a href="/blog">
								<div class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
									Read {data.postsTotal} more articles<svg
										viewBox="0 0 16 16"
										fill="none"
										aria-hidden="true"
										class="ml-1 h-4 w-4 stroke-current"
										><path
											d="M6.75 5.75 9.25 8l-2.5 2.25"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>
							</a>
						</div>
						<div class="space-y-10 lg:pl-16 xl:pl-24">
							<form
								action="https://app.gumroad.com/follow_from_embed_form"
								method="post"
								class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
							>
								<input name="seller_id" type="hidden" value="916051007948" />
								<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										aria-hidden="true"
										class="h-6 w-6 flex-none"
										><path
											d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
											class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
										/><path
											d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
											class="stroke-zinc-400 dark:stroke-zinc-500"
										/></svg
									><span class="ml-3">Stay up to date</span>
								</h2>
								<p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
									Get notified when I publish something new, and unsubscribe at any time.
								</p>
								<div class="mt-6 flex">
									<input
										type="email"
										name="email"
										placeholder="Email address"
										aria-label="Email address"
										required
										class="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
									/><button
										class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
										type="submit">Join</button
									>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

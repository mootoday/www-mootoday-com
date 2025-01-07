<script lang="ts">
	import ContentLayout from '$lib/components/content-layout.svelte';
	import Email from '$lib/components/email/index.svelte';
</script>

<svelte:head>
	<title>About - mootoday.com</title>
	<meta
		name="description"
		content="Mike. I improve your developer experience to save you time and money."
	/>
</svelte:head>

<ContentLayout>
	<div
		class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12 -mt-16 sm:-mt-20"
	>
		<div class="lg:pl-20">
			<div class="max-w-xs px-2.5 lg:max-w-none">
				<picture>
					<source srcset="/headshot.webp" type="image/webp" /><img
						src="/headshot.png"
						alt="Mike's headshot"
						class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
						width="800"
						height="800"
						decoding="async"
						loading="lazy"
						style:color="transparent"
					/></picture
				>
			</div>
		</div>
		<div class="lg:order-first lg:row-span-2">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				I'm Mike. I improve your developer experience to save you time and money.
			</h1>
			<div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
				<p>
					I've automated things for as long as I can remember, starting with math & physics homework
					way back in middle school.
				</p>
				<p>
					Throughout my career, I focused on team efficiency and with that, developer experience.
					The more enjoyable a project is to work on, the more fun developers have, which leads to a
					more relaxed, productive work environment.
				</p>
				<p>
					Every time a developer runs into the same issue, their motivation drops a little. Over
					time, this turns into bitterness and an overall negative attitude towards a given project.
					With that mindset, the interest to write maintainable, clean code slowly erodes.
				</p>
				<p>
					<strong
						>This is why I advocate for fully automated, reproducible developer environments.</strong
					>
				</p>
				<p>
					We all hate context switching (e.g. we work in a feature branch and are asked to review a
					PR). <br />
					We all have started the dev server in a new branch only to see an error because of outdated
					/ missing dependencies. <br />
					We all have run <code>git stash</code> and forgot about what we stashed.
				</p>
				<p>
					All of the above can easily be avoided with automated, reproducible developer
					environments.
				</p>
			</div>
		</div>
		<div class="lg:pl-20">
			<ul>
				<li class="flex">
					<a
						class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
						href="https://bsky.app/profile/mootoday.com"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 600 530"
							class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
							/>
						</svg>
						<span class="ml-4">Follow on Bluesky</span></a
					>
				</li>
				<li class="mt-4 flex">
					<a
						class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
						href="https://github.com/mootoday"
						><svg
							viewBox="0 0 24 24"
							aria-hidden="true"
							class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
							><path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
							/></svg
						><span class="ml-4">Follow on GitHub</span></a
					>
				</li>
				<li class="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
					<Email />
				</li>
			</ul>
		</div>
	</div>
</ContentLayout>

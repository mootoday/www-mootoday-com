<script lang="ts">
	import ContentLayout from '$lib/components/content-layout.svelte';

	const books = [
		{
			logo: '',
			href: 'https://bsky.app/profile/mootoday.com',
			hrefDisplayText: 'Contact me for access',
			name: 'Cloud Native Web Development',
			description: 'From zero to production: A hands-on guidebook.'
		},
		{
			logo: '',
			href: 'https://bsky.app/profile/mootoday.com',
			hrefDisplayText: 'Contact me for access',
			name: 'A Smart Guide for Your Career as a Software Engineer',
			description:
				'Everything I learned in my 20 years as a software engineer - including all mistakes.'
		}
	];
</script>

<svelte:head>
	<title>Projects - mootoday.com</title>
	<meta
		name="description"
		content="Various web and full-stack software projects. Mostly written in Typescript, Node.js, and Svelte."
	/>
</svelte:head>

<ContentLayout title="Digital books, self-published">
	<svelte:fragment slot="intro">
		<strong class="text-teal-500">Digital books</strong> I've written and self-published over the years.
	</svelte:fragment>
	<ul class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
		{#each books as { href, hrefDisplayText, name, description }}
			<li class="group relative flex flex-col items-start">
				<div
					class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-8 h-8 text-white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
						/>
					</svg>
				</div>
				<h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
					<div
						class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
					/>
					<a {href}
						><span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" /><span
							class="relative z-10">{name}</span
						></a
					>
				</h2>
				<p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					{description}
				</p>
				<p
					class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200"
				>
					<svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
						><path
							d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
							fill="currentColor"
						/></svg
					><span class="ml-2">{hrefDisplayText}</span>
				</p>
			</li>
		{/each}
	</ul>
</ContentLayout>

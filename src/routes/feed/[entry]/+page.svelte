<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	import { enhance } from '$app/forms';

	import { getRelativeTimeString } from '$lib/date-time';
	import ContentLayout from '$lib/components/content-layout.svelte';
	import Entry from '$lib/components/feed/entry.svelte';

	export let data;
</script>

<svelte:head>
	<title>Feed - mikenikles.com</title>
	<meta name="description" content={data.entry.content} />
</svelte:head>

<ContentLayout title="">
	<svelte:fragment slot="intro">
		<strong class="text-teal-500"><a href="/feed">More content like this on my feed.</a></strong>
	</svelte:fragment>
	<div class="mx-auto md:w-1/2">
		<Entry entry={data.entry} replies={data.replies} />
		<form method="post" action="/feed?/addReply" use:enhance class="pl-16">
			<input type="hidden" name="entry" value={data.entry.id} />
			<label for="content" class="sr-only">Write your reply</label>
			<textarea
				rows="3"
				maxlength="300"
				required
				name="content"
				id="content"
				class="pl-0 block w-full resize-none border-0 bg-transparent py-1.5 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				placeholder="Write your reply. Markdown supported"
			/>
			<div class="flex justify-end">
				<button
					type="submit"
					class="inline-flex items-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
					>Reply</button
				>
			</div>
		</form>
		<div class="text-black dark:text-white space-y-4">
			{#each data.replies as reply}
				<div>
					<span class="text-sm font-medium leading-5 text-gray-400">
						{getRelativeTimeString(new Date(+reply.id))}
					</span>
					<p>
						<SvelteMarkdown
							source={reply.content}
							options={{
								gfm: true,
								breaks: true
							}}
						/>
					</p>
				</div>
			{/each}
		</div>
	</div>
</ContentLayout>

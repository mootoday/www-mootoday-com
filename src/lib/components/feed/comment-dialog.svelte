<script lang="ts">
	import type { createDialog } from '@melt-ui/svelte';

	import { enhance } from '$app/forms';
	import SvelteMarkdown from 'svelte-markdown';

	export let entry: {
		id: string;
		content: string;
	};
	export let dialog: ReturnType<typeof createDialog>;

	const {
		trigger,
		portal,
		overlay,
		content: dialogContent,
		title,
		description,
		close,
		open
	} = dialog;
</script>

<div use:portal>
	{#if $open}
		<div {...$overlay} use:overlay class="fixed inset-0 z-40 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-black
            p-6 shadow-sm shadow-white"
			{...$dialogContent}
			use:dialogContent
		>
			<div class="flex flex-shrink-0 p-4 pb-0">
				<div class="flex items-center">
					<div>
						<img
							class="inline-block h-10 w-10 rounded-full"
							src="https://pbs.twimg.com/profile_images/1255590513035665408/uV0_K_3T_x96.jpg"
							alt=""
						/>
					</div>
					<div class="ml-2">
						<p class="text-base font-medium leading-6 text-black dark:text-white">Mike Nikles</p>
					</div>
				</div>
			</div>
			<div class="pl-16">
				<p class="content width-auto flex-shrink text-base font-medium text-black dark:text-white">
					<SvelteMarkdown
						source={entry.content}
						options={{
							gfm: true,
							breaks: true
						}}
					/>
				</p>
			</div>
			<hr class="border-gray-600 mt-4" />
			<form method="post" action="/feed?/addReply" use:enhance class="pl-16">
				<input type="hidden" name="entry" value={entry.id} />
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
		</div>
	{/if}
</div>

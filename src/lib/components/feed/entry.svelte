<script lang="ts">
	import { createDialog } from '@melt-ui/svelte';
	import SvelteMarkdown from 'svelte-markdown';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { getRelativeTimeString } from '$lib/date-time';

	import CommentDialog from './comment-dialog.svelte';
	import FileDialog from './file-dialog.svelte';

	export let entry: {
		id: string;
		content: string;
		files: string;
	};
	export let replies: {
		id: string;
		entryId: string;
		content: string;
	}[];

	const commentDialog = createDialog();
	const { trigger: commentTrigger } = commentDialog;
	const fileDialog = createDialog();
	const { trigger: fileTrigger } = fileDialog;

	const share = async () => {
		if (typeof navigator.share === 'undefined') {
			alert('Web Share API not available. Please copy the URL of this page.');
			if ($page.route.id === '/feed') {
				goto(`/feed/${entry.id}`);
			}
		} else {
			try {
				await navigator.share({
					url:
						$page.route.id === '/feed'
							? `${window.location.href}/${entry.id}`
							: window.location.href
				});
			} catch (error) {
				// Ignored, this could be due to the user cancelling the share activity
			}
		}
	};
</script>

<div class="mb-8">
	<div class="flex flex-shrink-0 p-4 pb-0">
		<div class="flex items-center">
			<div>
				<img
					class="inline-block h-10 w-10 rounded-full object-cover"
					src="/headshot-small.png"
					alt="Mike's headshot"
				/>
			</div>
			<div class="ml-2">
				<p class="text-base font-medium leading-6 text-black dark:text-white">
					Mike
					<a href="/feed/{new Date(+entry.id).getTime()}">
						<span
							class="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out"
						>
							• {getRelativeTimeString(new Date(+entry.id))}
						</span>
					</a>
				</p>
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

		<div class="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none">
			{#each JSON.parse(entry.files || '[]') as file}
				{@const src = `https://assets-feed.mootoday.com/${file.name}`}
				<button {...$fileTrigger} use:fileTrigger>
					<img class="w-full rounded-2xl object-cover" {src} alt="" />
				</button>
				<FileDialog dialog={fileDialog} {src} />
			{/each}
		</div>
		<div class="flex">
			<div class="w-full">
				<div class="flex items-center">
					<div class="text-center flex relative">
						<button
							{...$commentTrigger}
							use:commentTrigger
							class="group flex w-12 items-center rounded-full px-3 py-2 text-base font-medium leading-6 text-gray-500 hover:bg-teal-800 hover:text-teal-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 text-center"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
								/>
							</svg>
						</button>
						<span
							class="absolute inline-flex items-center justify-center w-5 h-5 text-[0.6rem] font-bold text-white bg-teal-500 border-2 border-white rounded-full -top-1 -right-1 dark:border-gray-900"
							>{replies.length}</span
						>
					</div>

					<!-- <div class="m-2 py-2 text-center">
						<a
							href="#"
							class="group mt-1 flex w-12 items-center rounded-full px-3 py-2 text-base font-medium leading-6 text-gray-500 hover:bg-teal-800 hover:text-teal-300"
						>
							<svg
								class="h-7 w-6 text-center"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/></svg
							>
						</a>
					</div> -->

					<div class="flex-1 text-center py-2 my-2">
						<button
							on:click={share}
							class="w-12 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-teal-800 hover:text-teal-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-7"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<hr class="border-gray-600 mt-4" />
</div>

<CommentDialog {entry} dialog={commentDialog} />

<style lang="postcss">
	.content :global(a) {
		@apply text-teal-500;
	}
</style>

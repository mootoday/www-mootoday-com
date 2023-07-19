<script lang="ts">
	import { page } from '$app/stores';
	import SvelteMarkdown from 'svelte-markdown';

	export let entry: {
		id: string;
		content: string;
	};

	const share = async () => {
		if (typeof navigator.share === 'undefined') {
			alert('Web Share API not available.');
		} else {
			try {
				await navigator.share({
					text: entry.content,
					title: "Food for thought",
					url:
						$page.route.id === '/feed'
							? `${window.location.href}/${entry.id}`
							: window.location.href
				});
			} catch (error) {
				alert(`Sharing failed due to: ${error}`);
			}
		}
	};

	const getRelativeTimeString = (date: Date | number) => {
		// Allow dates or times to be passed
		const timeMs = typeof date === 'number' ? date : date.getTime();

		// Get the amount of seconds between the given date and now
		const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

		// Array reprsenting one minute, hour, day, week, month, etc in seconds
		const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

		// Array equivalent to the above but in the string representation of the units
		const units: Intl.RelativeTimeFormatUnit[] = [
			'second',
			'minute',
			'hour',
			'day',
			'week',
			'month',
			'year'
		];

		// Grab the ideal cutoff unit
		const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));

		// Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
		// is one day in seconds, so we can divide our seconds by this to get the # of days
		const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

		// Intl.RelativeTimeFormat do its magic
		const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
		return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
	};
</script>

<div class="mb-8">
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
				<p class="text-base font-medium leading-6 text-black dark:text-white">
					Mike Nikles
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

		<!-- <div class="pt-3 md:flex-shrink">
			<img
				class="h-64 w-full rounded-lg"
				src="https://images.unsplash.com/photo-1561715608-5659baeccfb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2873&q=80"
				alt="An emergency exit light on a call"
			/>
		</div> -->
		<div class="flex">
			<div class="w-full">
				<div class="flex items-center">
					<!-- <div class="text-center">
						<a
							href="#"
							class="group mt-1 flex w-12 items-center rounded-full px-3 py-2 text-base font-medium leading-6 text-gray-500 hover:bg-teal-800 hover:text-teal-300"
						>
							<svg
								class="h-6 w-6 text-center"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/></svg
							>
						</a>
					</div> -->

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
							class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-teal-800 hover:text-teal-300"
						>
							<svg
								class="text-center h-7 w-6"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg
							>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<hr class="border-gray-600 mt-4" />
</div>

<style lang="postcss">
	.content :global(a) {
		@apply text-teal-500;
	}
</style>

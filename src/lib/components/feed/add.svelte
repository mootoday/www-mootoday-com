<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let newContent: Writable<string>;

	let files: FileList;

	const setAuthorization = (node: HTMLInputElement) => {
		node.value = window.localStorage.getItem('authorization') || '';
	};

	const getFileSource = async (file: File) => {
		return await new Promise((resolve) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				resolve(e.target?.result);
			};
		});
	};

	const processWindowPasteEvent = (e: ClipboardEvent) => {
		if (e.clipboardData?.files) {
			const dataTransfer = new DataTransfer();
			for (const file of files || []) {
				dataTransfer.items.add(file);
			}
			for (const file of e.clipboardData.files) {
				dataTransfer.items.add(file);
			}
			files = dataTransfer.files;
		}
	};

	const submit = (({formData}) => {
		formData.delete("files"); // For some reason, there's a 0kb application/octet-stream file in this array. Let's clear that and only append what we need.
		for (const file of files || []) {
			formData.append("files", file);
		}
		return ({update}) => {
			update();
		};
	}) satisfies SubmitFunction;
</script>

<svelte:window on:paste={processWindowPasteEvent} />

<div class="flex items-start space-x-4 mb-8">
	<div class="min-w-0 flex-1">
		<form
			method="post"
			action="?/addEntry"
			use:enhance={submit}
			enctype="multipart/form-data"
			class="relative"
		>
			<input type="hidden" name="authorization" use:setAuthorization />
			<div
				class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-teal-500"
			>
				<label for="content" class="sr-only">What's up?</label>
				<textarea
					rows="3"
					name="content"
					id="content"
					bind:value={$newContent}
					class="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
					placeholder="What's up? Markdown supported"
				/>

				<!-- Spacer element to match the height of the toolbar -->
				<div class="py-2" aria-hidden="true">
					<!-- Matches height of button in toolbar (1px border + 36px content height) -->
					<div class="py-px">
						<div class="h-9" />
					</div>
				</div>
			</div>

			<div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
				<div class="flex items-center space-x-5">
					<div class="flex items-center">
						<label
							class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
						>
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="sr-only">Attach a file</span>
							<input
								bind:files
								class="hidden"
								type="file"
								id="files"
								name="files"
								accept=".jpg,.jpeg,.png,.webp"
								multiple
							/>
						</label>
					</div>
				</div>
				<div class="flex-shrink-0">
					<button
						type="submit"
						class="inline-flex items-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
						>Post</button
					>
				</div>
			</div>
		</form>

		{#if files}
			<ul
				role="list"
				class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
			>
				{#each files as file}
					{@const fileSourcePromise = getFileSource(file)}
					{#await fileSourcePromise then src}
						<li>
							<img class="w-full rounded-2xl object-cover" {src} alt="" />
						</li>
					{/await}
				{/each}
			</ul>
		{/if}
	</div>
</div>

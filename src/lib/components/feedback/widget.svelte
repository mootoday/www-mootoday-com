<script lang="ts">
	// Design & idea credit: www.vercel.com/docs 🙏
	import { page } from "$app/stores";
	import one from "./1.svg";
	import two from "./2.svg";
	import three from "./3.svg";
	import four from "./4.svg";

  const projectId = "clfkqzc1z0000lykgdl2z4jxe";
	const scoreImages = [one, two, three, four];

	let selectedEmotion: number | undefined;
	let note = "";
	let resultMessage: string;
	let isSubmittedOnce = false;

	const submitFeedback = async () => {
		isSubmittedOnce = true;
		const response = await fetch("https://howisit.app/api/feedback", {
			method: "post",
			body: JSON.stringify({
				score: selectedEmotion,
				note,
				url: `https://${$page.url.host + $page.url.pathname}`,
				projectId
			})
		});
		if (response.status === 201) {
			resultMessage = "Thanks for your feedback, we appreciate it.";
		} else {
			resultMessage = "Oh no, something went wrong :(.";
		}
		setTimeout(() => {
			selectedEmotion = undefined;
			note = "";
			resultMessage = "";
		}, 5000);
	};
</script>

<div>
	<div class="bg-white dark:bg-slate-800 rounded-2xl max-w-md py-8 px-6 m-auto">
		<h5 class="mb-6 text-center font-bold">Was this helpful?</h5>
		{#if resultMessage}
			<p class="text-center">{resultMessage}</p>
		{:else}
			<form on:submit|preventDefault={submitFeedback}>
				<div class="flex justify-center py-4 space-x-6">
					{#each new Array(4) as _, index}
						<button
							on:click|preventDefault={() => (selectedEmotion = index + 1)}
							class:selected={selectedEmotion === index + 1}
							class="filter grayscale transform transition duration-150 hover:grayscale-0 hover:scale-150"
						>
							<img
								src={scoreImages[index]}
								alt="Feedback {index + 1} of 4"
								title="Feedback {index + 1} of 4"
								class="h-6 w-6"
							/>
						</button>
					{/each}
				</div>
				{#if selectedEmotion}
					<div class="mt-6">
						<div class="w-full">
							<label for="note" class="block my-2 text-left uppercase text-xs">Feedback</label>
							<textarea
								bind:value={note}
								id="note"
								placeholder="Your feedback..."
								aria-label="Feedback input"
								autocapitalize="off"
								autocomplete="off"
								autocorrect="off"
								class="w-full p-2 rounded-lg border border-gray-300 resize-none"
							/>
						</div>
						<div class="flex justify-end">
							<button
								type="submit"
								disabled={isSubmittedOnce}
								class:cursor-not-allowed={isSubmittedOnce}
								class="px-4 py-2 rounded-lg bg-black text-sm text-white hover:bg-white hover:text-black hover:border hover:border-black"
								><span>Send</span></button
							>
						</div>
					</div>
				{/if}
			</form>
		{/if}
	</div>
</div>

<style type="text/postcss">
	button.selected {
		@apply grayscale-0 scale-150;
	}
</style>

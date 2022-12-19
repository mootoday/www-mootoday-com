<script lang="ts">
	import Icon from '$lib/components/icons/index.svelte';

	const emailValueDefault = '***************';

	let emailValue = emailValueDefault;
	let currentState: 'hidden' | 'visible' | 'copied' = 'hidden';

	const showEmailValue = () => {
		// prettier-ignore
		emailValue = ['m','i','k','e','@','a','b','c','.','c','o','m'].join('');
		currentState = 'visible';
	};

	const copyEmailValue = () => {
		// TODO: Copy email to clipboard
		currentState = 'copied';
		setTimeout(() => {
			emailValue = emailValueDefault;
			currentState = 'hidden';
		}, 1000);
	};
</script>

<div class="flex">
	<span
		class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
	>
		<Icon
			name="envelopeSolid"
			class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
		/>
		<span class="ml-4 mr-2">{emailValue}</span>
	</span>

	{#if currentState === 'hidden'}
		<button on:click={showEmailValue}>
			<Icon name="eyeSlash" />
		</button>
	{/if}
	{#if currentState === 'visible'}
		<button on:click={copyEmailValue}>
			<Icon name="documentDuplicate" />
		</button>
	{/if}
	{#if currentState === 'copied'}
		<Icon name="clipboardDocumentCheck" />
	{/if}
</div>

<script lang="ts">
	import { interpret } from 'xstate';

	import Icon from '$lib/components/icons/index.svelte';
	import { emailMachine } from './email-machine-step-3';

	const emailService = interpret(emailMachine).start();
</script>

<div class="flex">
	<span
		class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
	>
		<Icon
			name="envelopeSolid"
			class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
		/>
		<span class="ml-4 mr-2">{$emailService.context.emailValue}</span>
	</span>

	{#if $emailService.matches('hidden')}
		<button
			on:click={() => {
				emailService.send('SHOW');
			}}
		>
			<Icon name="eyeSlash" />
		</button>
	{/if}
	{#if $emailService.matches('visible')}
		<button
			on:click={() => {
				emailService.send('COPY');
			}}
		>
			<Icon name="documentDuplicate" />
		</button>
	{/if}
	{#if $emailService.matches('copied')}
		<Icon name="clipboardDocumentCheck" />
	{/if}
</div>

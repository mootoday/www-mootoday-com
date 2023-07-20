<script lang="ts">
	import { interpret } from 'xstate';

	import Icon from '$lib/components/icons/index.svelte';
	import { emailMachine } from './email-machine';

	const emailService = interpret(emailMachine).start();
</script>

<div class="flex">
	<span
		class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
		><svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
			><path
				fill-rule="evenodd"
				d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
			/></svg
		>
		<span class="ml-4 mr-2">{$emailService.context.emailValue}</span>
	</span>

	{#if $emailService.matches('hidden')}
		<button
			on:click={() => {
				emailService.send('SHOW');
			}}
		>
			<Icon name="eyeSlash" class="last:h-6 text-gray-700" />
		</button>
	{/if}
	{#if $emailService.matches('visible')}
		<button
			on:click={() => {
				emailService.send('COPY');
			}}
		>
			<Icon name="documentDuplicate" class="last:h-6 text-gray-700" />
		</button>
	{/if}
	{#if $emailService.matches('copied')}
		<Icon name="clipboardDocumentCheck" class="last:h-6 text-gray-700" />
	{/if}
</div>

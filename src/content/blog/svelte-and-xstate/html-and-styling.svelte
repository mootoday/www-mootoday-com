<script lang="ts">
	import Icon from '$lib/components/icons/index.svelte';
</script>

<div class="flex">
	<span
		class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
	>
		<Icon
			name="envelopeSolid"
			class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
		/>
		<span class="ml-4 mr-2">***************</span>
	</span>

	<button>
		<Icon name="eyeSlash" />
	</button>
	<button>
		<Icon name="documentDuplicate" />
	</button>
	<Icon name="clipboardDocumentCheck" />
</div>

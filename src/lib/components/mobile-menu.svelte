<script lang="ts">
	import type { Writable } from "svelte/store";
	import { beforeNavigate } from "$app/navigation";

  export let showMobileMenu: Writable<boolean>;
	export let navigationItems: {href: string; label: string;}[];

	beforeNavigate(() => {
		$showMobileMenu = false;
	});
</script>

{#if $showMobileMenu}
	<div>
		<div
			on:click={() => { $showMobileMenu = false; }}
			class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80 opacity-100"
			id="headlessui-popover-overlay-:r9:"
			aria-hidden="true"
		/>
		<div
			class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800 opacity-100 scale-100"
			id="headlessui-popover-panel-:Rqb6H1:"
			tabindex="-1"
		>
			<div class="flex flex-row-reverse items-center justify-between">
				<button
					on:click={() => { $showMobileMenu = false; }}
					aria-label="Close menu"
					class="-m-1 p-1"
					type="button"
					tabindex="0"
					><svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-6 w-6 text-zinc-500 dark:text-zinc-400"
						><path
							d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					></button
				>
				<h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
			</div>
			<nav class="mt-6">
				<ul
					class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"
				>
					{#each navigationItems as {href, label}}
						<li><a class="block py-2" {href}>{label}</a></li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
{/if}

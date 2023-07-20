<script lang="ts">
	export let title: string = '';
</script>

<main>
	<div class="sm:px-8 mt-16 sm:mt-32">
		<div class="mx-auto max-w-7xl lg:px-8">
			<div class="relative px-4 sm:px-8 lg:px-12">
				<div class="mx-auto max-w-2xl lg:max-w-5xl">
					<header class="max-w-2xl flex flex-col">
						<h1
							class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
						>
							{title}
						</h1>
						<slot name="subtitle" />
						{#if $$slots.intro}
							<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
								<slot name="intro" />
							</p>
						{/if}
					</header>
					<div class="mt-16 sm:mt-20">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

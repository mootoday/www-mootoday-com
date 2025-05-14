<main>
	<div class="sm:px-8 mt-9">
		<div class="mx-auto max-w-7xl lg:px-8">
			<div class="relative px-4 sm:px-8 lg:px-12">
				<div class="mx-auto max-w-2xl lg:max-w-5xl">
					<div class="max-w-4xl">
						<h1
							class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
						>
							Haptic Feedback on the web
						</h1>

						<div class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
							<p>Doesn't work on Safari and Safari for iOS.</p>

							<p>
								<button class="mt-4 underline" on:click={() => window.navigator.vibrate([200])}
									>A little</button
								>
							</p>
							<p>
								<button class="mt-4 underline" on:click={() => window.navigator.vibrate([1000])}
									>A little more</button
								>
							</p>
							<p>
								<button
									class="mt-4 underline"
									on:click={() => window.navigator.vibrate([50, 50, 50, 50, 50, 50, 50, 50, 50])}
									>All the vibrations</button
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

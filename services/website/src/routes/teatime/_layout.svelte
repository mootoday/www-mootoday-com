<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog/meta.json`)
				.then(r => r.json());
	}
</script>

<script>
	export let tags
</script>

<div style="padding-top: 60px">
	<div class="flex">
		<div>
			<slot></slot>
		</div>
		<div>
			<b>category:</b>
			<b>tag:</b>
			<ul>
				{#each tags as t}
				<li>{t}</li>
				{/each}
			</ul>
			archive: ..
			author: ..
		</div>
	</div>
</div>
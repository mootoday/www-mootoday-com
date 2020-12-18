<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog/meta.json`)
				.then(r => r.json());
	}
</script>

<script>
	export let tags
	export let authors
	export let categories
</script>

<div style="padding-top: 60px">
	<div class="flex">
		<div>
			<slot></slot>
		</div>
		<div>
			<h5><b>category:</b></h5>
			<ul>
				{#each categories as t}
					<li><a href="/teatime/category/{t}">{t}</a></li>
				{/each}
			</ul>

			<h5><b>tag:</b></h5>
			<ul>
				{#each tags as t}
					<li><a href="/teatime/tags/{t}">{t}</a></li>
				{/each}
			</ul>

			<h5><b>archive:</b></h5>

			<h5><b>author:</b></h5>
			<ul>
				{#each authors as t}
					<li><a href="/teatime/author/{t}">{t}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</div>
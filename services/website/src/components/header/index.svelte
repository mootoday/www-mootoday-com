<script>
  import { stores } from '@sapper/app';
  import A from "../ui-elements/a.svelte";
  import Logo from "./logo.svelte";

  export let segment

  const { page } = stores();

  const items = [
	  {
		  name: "據點一杯茶",
		  name_en: "Floating teatime",
		  href: "/blog"
	  },
	  {
		  name: "打開門",
		  name_en: "Floating events",
		  href: "/event"
	  },
	  {
		  name: "句點藝術群體",
		  name_en: "Floating Projects Collective",
		  href: "/members"
	  },
	  {
		  name: "我們",
		  name_en: "About FPC",
		  href: "/about"
	  }
  ]
</script>

<a href="/" class="mb-5 text-center">
	<h1 class="text-3xl">FP</h1>
</a>
<div class="flex justify-center text-center">
	{#each items as item}
		<a href="{item.href}" class="mx-2" class:text-blue-500={item.href === '/'+segment}>
			<div>{item.name}</div>
			<div class="text-sm">{item.name_en}</div>
		</a>
	{/each}
</div>

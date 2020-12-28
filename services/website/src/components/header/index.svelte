<script>
  import { stores } from '@sapper/app';
  import A from "../ui-elements/a.svelte";
  import Logo from "./logo.svelte";

  const { page } = stores();

  const items = [
	  {
		  name: "據點一杯茶",
		  name_en: "Floating teatime",
		  href: "/teatime"
	  },
	  {
		  name: "打開門",
		  name_en: "Floating events",
		  href: "/events"
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

<a href="/">
<h1 class="bold mb5 mt10 tac">FP</h1>
</a>
<div class="ac jc tac">
	{#each items as item}
		<a href="{item.href}" class="mx10">
			<div>{item.name}</div>
			<div>{item.name_en}</div>
		</a>
	{/each}
</div>

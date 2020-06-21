<script>
  import A from "../ui-elements/a.svelte";
  import { stores } from '@sapper/app';

  const { page } = stores();
  const isBlogPage = $page.path.startsWith("/blog")
</script>

<style>
  .forceshow {
    @apply flex;
  }
</style>

<div class:forceshow={isBlogPage} class="hidden md:flex justify-center flex-1 font-extrabold">
  <A class="flex" href="/">
    👋
    <span class="pl-1">Mike Nikles</span>
  </A>
</div>

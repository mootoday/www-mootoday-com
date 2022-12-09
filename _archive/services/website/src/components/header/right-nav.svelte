<script>
  import A from "../ui-elements/a.svelte";
  import FlyOutMenu from "./fly-out-menu.svelte";

  export let onMenuClicked;
  export let openMenu;
  export let projectsMenu;
</script>

<nav class="hidden md:flex justify-end flex-1">
  {#if false}
    <A
      href="TODO.html"
      class="text-base leading-6 font-medium text-gray-500 hover:text-white
      focus:outline-none focus:text-white transition ease-in-out duration-150">
      TODO
    </A>
  {/if}
  <FlyOutMenu
    isOpen={openMenu === 'projects'}
    menu={projectsMenu}
    on:click={onMenuClicked('projects')} />
</nav>

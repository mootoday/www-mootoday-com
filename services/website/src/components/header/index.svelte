<script>
  import { stores } from '@sapper/app';
  import { headerStore } from "../../stores";
  import A from "../ui-elements/a.svelte";
  import Logo from "./logo.svelte";
  import MobileMenu from "./mobile-menu.svelte";
  import RightNav from "./right-nav.svelte";
  import ScrollProgressBar from "../blog-post/scroll-progress-bar.svelte";
  import Search from "./search.svelte";
  import SocialIcons from "./social-icons.svelte";

  const { page } = stores();

  $: isBlogPage = $page.path.startsWith("/blog");
  $: isSearchVisible = $page.path === "/";

  let openMenu = "";

  const projectsMenu = {
    label: "Projects",
    svgPath:
      "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
    items: [
      {
        label: "Cloud Native Web Development",
        description: "A hands-on guidebook: From source code to production.",
        href: "https://www.gum.co/cloud-native-web-development",
        svgPath:
          "M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      },
      {
        label: "Markua Support",
        description:
          "Do you write books on Leanpub? Use Google Docs instead and use the Markua Support add-on to help you.",
        href: "/markua-support",
        svgPath:
          "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
      }
    ]
  };

  const onMenuClicked = menuId => () => {
    openMenu = openMenu === menuId ? "" : menuId;
  };
</script>

<style>
  .transparent {
    @apply bg-transparent;
  }
</style>

<svelte:body on:click={() => (openMenu = '')} />

<div class:transparent={$headerStore.header.isTransparent} class="fixed transition duration-500 bg-gray-900 w-full">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex justify-between items-center text-white p-2">
      <div class={`${isBlogPage ? 'hidden md:flex' : 'flex'} justify-start flex-1`}>
        <SocialIcons />
        {#if isSearchVisible}
        <Search />
        {/if}
      </div>
      <Logo />
      <RightNav {onMenuClicked} {openMenu} {projectsMenu} />

      <div class="-mr-2 -my-2 md:hidden">
        <button
          on:click|stopPropagation={onMenuClicked('mobile')}
          type="button"
          aria-label="Menu"
          class="inline-flex items-center justify-center p-2 rounded-md
          text-gray-400 focus:outline-none transition duration-150 ease-in-out">
          <svg
            focusable="false"
            aria-hidden="true"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <MobileMenu isOpen={openMenu === 'mobile'} menuItems={projectsMenu.items} />
  {#if isBlogPage && process.browser}
    <ScrollProgressBar />
  {/if}
</div>

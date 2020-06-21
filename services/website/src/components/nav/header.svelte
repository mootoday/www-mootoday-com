<script>
  import A from "../ui-elements/a.svelte";
  import FlyOutMenu from "./fly-out-menu.svelte";
  import MobileMenu from "./mobile-menu.svelte";

  let openMenu = "";

  const projectsMenu = {
    label: "Projects",
    svgPath: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
    items: [{
      label: "Cloud Native Web Development",
      description: "A hands-on guidebook: From source code to production.",
      href: "https://www.gum.co/cloud-native-web-development",
      svgPath: "M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    }, {
      label: "Markua Support",
      description: "Do you write books on Leanpub? Use Google Docs instead and use the Markua Support add-on to help you.",
      href: "/markua-support",
      svgPath: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    }]
  };

  const onMenuClicked = (menuId) => () => {
    openMenu = openMenu === menuId ? "" : menuId;
  }
</script>

<svelte:body on:click={() => openMenu = ""} />

<!-- This example requires Tailwind CSS v1.4.0+ -->
<div class="fixed bg-gray-900 w-full">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex justify-between items-center md:justify-start">
      <div class="hidden md:flex flex-1">
        <div class="flex content-center">
          <A
            class="inline-block text-gray-500 no-underline hover:text-white
            hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 avatar"
            href="https://twitter.com/mikenikles"
            aria-label="Twitter profile">
            <svg
              class="fill-current h-4"
              focusable="false"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32">
              <path
                d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0
                1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875
                1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625
                2.563c-1.813.688-3.75 1-5.75 1-3.25
                0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0
                5.063-.875 7.188-2.5-1.25
                0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125
                1.125.125.5 0 1-.063
                1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0
                1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0
                1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938
                1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579
                5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625
                4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313
                2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z" />
            </svg>
          </A>
          <A
            class="inline-block text-gray-500 no-underline hover:text-white
            hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 avatar"
            href="https://www.linkedin.com/in/mikenikles/"
            aria-label="LinkedIn profile">
            <svg
              class="fill-current h-4"
              focusable="false"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path
                d="M100.3 480H7.4V180.9h92.9V480zM53.8 140.1C24.1 140.1 0 115.5 0
                85.8 0 56.1 24.1 32 53.8 32c29.7 0 53.8 24.1 53.8 53.8 0 29.7-24.1
                54.3-53.8 54.3zM448 480h-92.7V334.4c0-34.7-.7-79.2-48.3-79.2-48.3
                0-55.7 37.7-55.7 76.7V480h-92.8V180.9h89.1v40.8h1.3c12.4-23.5
                42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V480z" />
            </svg>
          </A>
          <A
            class="inline-block text-gray-500 no-underline hover:text-white
            hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 avatar"
            href="https://www.github.com/mikenikles/"
            aria-label="GitHub profile">
            <svg
              class="fill-current h-4"
              focusable="false"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512">
              <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2
                2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3
                4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2
                2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7
                4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0
                252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1
                0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6
                0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5
                72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5
                0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69
                27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6
                69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0
                96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3
                75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496
                252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6
                1.6 3.9 2.3 5.2 1 1.3-1
                1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3
                3.9 1.6 1 3.6.7
                4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6
                1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1
                1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6
                3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9
                0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </A>
        </div>
      </div>


      <div class="md:flex items-center md:flex-1 lg:w-0 text-white font-extrabold">
        <A
          class="flex text-white text-base no-underline hover:text-white
          hover:no-underline p-2"
          href="/">
          👋
          <span class="md:w-auto md:block pl-1">Mike Nikles</span>
        </A>
      </div>

      <div class="-mr-2 -my-2 md:hidden">
        <button on:click|stopPropagation={onMenuClicked("mobile")} type="button" aria-label="Menu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none transition duration-150 ease-in-out">
          <svg focusable="false" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>


      <nav class="hidden md:flex justify-end space-x-10">
        {#if false}
        <A href="TODO.html" class="text-base leading-6 font-medium text-gray-500 hover:text-white focus:outline-none focus:text-white transition ease-in-out duration-150">
          TODO
        </A>
        {/if}
        <FlyOutMenu isOpen={openMenu === "projects"} menu={projectsMenu} on:click={onMenuClicked("projects")} />
      </nav>


    </div>
  </div>

  <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->
  <MobileMenu isOpen={openMenu === "mobile"} menuItems={projectsMenu.items} />
  <slot />
</div>
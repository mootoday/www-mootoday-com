<script lang="ts">
  import { onMount } from "svelte";
	import { writable } from "svelte/store";
  import { page } from '$app/stores';

  import Avatar from "$lib/components/avatar/index.svelte";
  import AvatarContainer from "$lib/components/avatar/container.svelte";
  import MobileMenu from "$lib/components/mobile-menu.svelte";
  import ModeToggle from "$lib/components/mode-toggle.svelte";

  let headerRef: HTMLDivElement;
  let avatarRef: HTMLDivElement;

  let isInitial = true;
  let upDelay = 64;
  let showMobileMenu = writable(false);
  
  $: isHomePage = $page.route.id === "/";

  const navigationItems = [{
    href: "/blog",
    label: "Blog"
  }, {
    href: "/projects",
    label: "Projects"
  },]

  const clamp = (number: number, a: number, b: number) => {
    let min = Math.min(a, b)
    let max = Math.max(a, b)
    return Math.min(Math.max(number, min), max)
}

  const setProperty = (property: string, value: string) => {
    document.documentElement.style.setProperty(property, value)
  };

  const removeProperty = (property: string) => {
    document.documentElement.style.removeProperty(property);
  };

  const updateHeaderStyles = () => {
    let { top, height } = headerRef?.getBoundingClientRect()
    let scrollY = clamp(
      window.scrollY,
      0,
      document.body.scrollHeight - window.innerHeight
    )

    if (isInitial) {
      setProperty('--header-position', 'sticky')
    }

    let downDelay = avatarRef?.offsetTop ?? 0;
    setProperty('--content-offset', `${downDelay}px`)

    if (isInitial || scrollY < downDelay) {
      setProperty('--header-height', `${downDelay + height}px`)
      setProperty('--header-mb', `${-downDelay}px`)
    } else if (top + height < -upDelay) {
      let offset = Math.max(height, scrollY - upDelay)
      setProperty('--header-height', `${offset}px`)
      setProperty('--header-mb', `${height - offset}px`)
    } else if (top === 0) {
      setProperty('--header-height', `${scrollY + height}px`)
      setProperty('--header-mb', `${-scrollY}px`)
    }

    if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
      setProperty('--header-inner-position', 'fixed')
      removeProperty('--header-top')
      removeProperty('--avatar-top')
    } else {
      removeProperty('--header-inner-position')
      setProperty('--header-top', '0px')
      setProperty('--avatar-top', '0px')
    }
  };

  const updateAvatarStyles = () => {
    if (!isHomePage) {
        return
      }

      let fromScale = 1
      let toScale = 36 / 64
      let fromX = 0
      let toX = 2 / 16

      let downDelay = avatarRef?.offsetTop ?? 0;
      let scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      )

      let borderScale = 1 / (toScale / scale)
      let borderX = (-toX + x) * borderScale
      let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', Number(scale === toScale ? 1 : 0).toString())
  };

  const updateStyles = () => {
    updateHeaderStyles();
    updateAvatarStyles();
    isInitial = false;
  };

  onMount(() => {
    if (isHomePage) {
      updateStyles();
      window.addEventListener('scroll', updateStyles, { passive: true })
      window.addEventListener('resize', updateStyles)
      
      return () => {
        window.removeEventListener('scroll', updateStyles, { passive: true });
        window.removeEventListener('resize', updateStyles);
      }
    }
  });
</script>

<header 
  class="pointer-events-none relative z-50 flex flex-col"
  style="height:var(--header-height);margin-bottom:var(--header-mb)"
>
{#if isHomePage}
    <div bind:this={avatarRef} class="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]" />
    <div class="sm:px-8 top-0 order-last -mb-3 pt-3" style="position:var(--header-position)">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <div
              class="top-[var(--avatar-top,theme(spacing.3))] w-full"
              style="position:var(--header-inner-position)"
            >
              <div class="relative">
                <AvatarContainer
                  class="absolute left-0 top-3 origin-left transition-opacity"
                  style="opacity: var(--avatar-border-opacity, 0); transform: var(--avatar-border-transform)"
                />
                <Avatar
                  large
                  class="block h-16 w-16 origin-left"
                  style="transform: var(--avatar-image-transform)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <div bind:this={headerRef} class="top-0 z-10 h-16 pt-6" style="position:var(--header-position)">
    <div
      class="sm:px-8 top-[var(--header-top,theme(spacing.6))] w-full"
      style="position:var(--header-inner-position)"
    >
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <div class="relative flex gap-4">
              <div class="flex flex-1">
                {#if !isHomePage}
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                {/if}
              </div>
              <div class="flex flex-1 justify-end md:justify-center">
                <div class="pointer-events-auto md:hidden" data-headlessui-state="">
                  <button
                    on:click={() => $showMobileMenu = true}
                    class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
                    id="headlessui-popover-button-:Rqb6:"
                    type="button"
                    aria-expanded="false"
                    data-headlessui-state=""
                    >Menu<svg
                      viewBox="0 0 8 6"
                      aria-hidden="true"
                      class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
                      ><path
                        d="M1.75 1.75 4 4.25l2.25-2.5"
                        fill="none"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      /></svg
                    ></button
                  >
                  <MobileMenu {navigationItems} {showMobileMenu} />
                </div>
                <nav class="pointer-events-auto hidden md:block">
                  <ul
                    class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
                  >
                    {#each navigationItems as {href, label}}
                      <li>
                        <a
                          class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          {href}>{label}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </nav>
              </div>
              <div class="flex justify-end md:flex-1">
                <div class="pointer-events-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

{#if isHomePage}
  <div style="height:var(--content-offset)" />
{/if}

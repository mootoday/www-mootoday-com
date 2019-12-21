<script>
  import { stores } from "@sapper/app";
  import { fade, fly, slide, scale, draw } from "svelte/transition";
  const { page } = stores();
  let isOpen = false;
</script>

<style>
  header {
    @apply bg-white
    z-50
    shadow
    w-full
    fixed
    top-0
    left-0;
    height: 64px;
  }

  .wrapper-header {
    @apply px-4 py-3;
  }

  .name-logo {
    @apply uppercase 
    font-logo-name01 
    text-center 
    font-semibold
    text-xl
    w-48 
    m-auto
    leading-none;
  }

  .name {
    @apply text-brown-700;
    letter-spacing: 0.08em;
  }

  .title {
    @apply text-brown-500 
    tracking-normal;
  }

  button {
    @apply fixed;
    right: 1rem;
    top: 1.2rem;
  }

  button:focus {
    outline: transparent;
  }

  button svg {
    @apply text-brown-700;
  }

  button svg:hover {
    @apply text-brown-500;
  }

  .nav-outer {
    @apply w-screen
    h-screen
    top-0
    left-0
    pointer-events-none;
    background: hsla(18.7, 7.8%, 40.4%, 0.9);
  }

  .nav-outer.open {
    @apply opacity-100
    pointer-events-auto;
  }

  nav {
    @apply px-2
    pt-2
    pb-4
    bg-white;
    max-height: 130px;
  }

  nav a {
    @apply block
    font-semibold
    px-2
    py-1
    mt-1
    text-brown-800;
  }

  nav a:first-child {
    @apply mt-0;
  }

  nav a:hover {
    @apply bg-brown-400
    rounded;
  }

  @screen lg {
    header.index {
      @apply hidden;
    }
  }
</style>

<header class:index={$page.path === '/'}>
  <div class="wrapper-header">
    <div class="name-logo">
      <a href="/">
        <h1 class="name">Mike Nikles</h1>
        <h1 class="title">SW Architect</h1>
      </a>
    </div>

    <button aria-label="Navigation Menu Toggle" type="button" on:click={() => (isOpen = !isOpen)}>
      {#if isOpen}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="vertical-align:bottom">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="vertical-align:bottom">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      {/if}
    </button>
  </div>

  {#if isOpen}
    <div
      class="nav-outer"
      class:open={isOpen}
      on:click={() => (isOpen = false)}>
      <nav transition:slide>
        <a href="#">Featured Posts</a>
        <a href="#">Software Architecture</a>
        <a href="#">Leadership</a>
      </nav>
    </div>
  {/if}
</header>

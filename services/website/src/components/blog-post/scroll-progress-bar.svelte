<script>
  export let height;

  let documentElement = document.documentElement,
    body = document.body,
    scrollTop = "scrollTop",
    scrollHeight = "scrollHeight";

  let scrollProgressBar;

  let scrollY = 0;
  $: if (scrollProgressBar && scrollY > height) {
    const scrollPercentage =
      ((documentElement[scrollTop] || body[scrollTop]) /
        ((documentElement[scrollHeight] || body[scrollHeight]) -
          documentElement.clientHeight)) *
      100;
    scrollProgressBar.style.setProperty("--scroll", scrollPercentage + "%");
  }
</script>

<svelte:window bind:scrollY />

<div
  bind:this={scrollProgressBar}
  class="h-1 bg-white shadow"
  style="background:linear-gradient(to right, #4C51BF var(--scroll), transparent
  0);" />

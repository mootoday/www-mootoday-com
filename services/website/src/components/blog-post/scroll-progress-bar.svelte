<script>
  export let height;
  export let readingTime;

  let documentElement = document.documentElement,
    body = document.body,
    scrollTop = "scrollTop",
    scrollHeight = "scrollHeight";

  let progressBarNode;
  let remainingReadingTimeNode;

  let scrollY = 0;
  let remainingReadingTime = 0;

  $: if (progressBarNode && remainingReadingTimeNode && scrollY > height) {
    // Percentage indicator
    const scrollPercentage =
      ((documentElement[scrollTop] || body[scrollTop]) /
        ((documentElement[scrollHeight] || body[scrollHeight]) -
          documentElement.clientHeight)) *
      100;
    progressBarNode.style.setProperty("--scroll", scrollPercentage + "%");

    // Remaining time indicator
    remainingReadingTime = Math.floor(
      readingTime.minutes - readingTime.minutes * (scrollPercentage / 100)
    );

    const progressBarWidth = progressBarNode.offsetWidth;
    const remainingReadingTimeBadgeWidth = remainingReadingTimeNode.offsetWidth;
    const halfBadgeToBarPercentage = ((remainingReadingTimeBadgeWidth / progressBarWidth) * 100) / 2;

    let left = 0;
    if (scrollPercentage + halfBadgeToBarPercentage >= 100) {
      left = 100 - halfBadgeToBarPercentage * 2;
    } else if (scrollPercentage > halfBadgeToBarPercentage) {
      left = scrollPercentage - halfBadgeToBarPercentage;
    }
    remainingReadingTimeNode.style.setProperty("--left", left + "%");
  }
</script>

<style>
  span {
    position: absolute;
    left: var(--left);
  }
</style>

<svelte:window bind:scrollY />

<div>
  <div
    bind:this={progressBarNode}
    class="h-1 bg-white shadow"
    style="background:linear-gradient(to right, #4C51BF var(--scroll),
    transparent 0);" />
  <span
    bind:this={remainingReadingTimeNode}
    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium
    leading-5 bg-indigo-100 text-indigo-800">
    {remainingReadingTime === 0 ? "🎉 Thanks for reading" : `${remainingReadingTime} min remaining`}
  </span>
</div>

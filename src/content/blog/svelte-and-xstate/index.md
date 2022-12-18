---
title: "Svelte & XState"
summary: "State-driven user interfaces with Svelte & XState. Learn how to define a state machine and how to use it in your Svelte components."
createdAt: 2022-12-17T21:10:13.067Z
videoPlaybackIds: ["BO6wueby01o169Ih003gA53BuufuW4n6znZV8hC8GN1y8"]
---

<script>
  import VideoPlayer from "$lib/components/video-player.svelte";

  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

**Key takeaways**
* With Statecharts, application behavior is decoupled from components
* Developing declarative, reactive UIs may become easier to reason about
* Statecharts are (web) framework agnostic
* Learning the concepts and XState comes with a (somewhat steep) learning curve

<div class="mx-auto md:only:w-1/2">
  <!-- <VideoPlayer playbackId="{data.videoPlaybackIds[0]}" title="Show, copy, & hide email address" muxBlurHashData="{data.videoMetadata}" /> -->
  <VideoPlayer playbackId="{data.videoPlaybackIds[0]}" title="Show, copy, & hide email address" />
</div>

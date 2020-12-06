<script context="module">	
  export async function  preload() {
    const response = await this.fetch(`timeline.json`);
    const timelineEntries = await response.json();
    return { timelineEntries };
  }	
</script>

<script>
  import { timeline } from "../stores/timeline";
  import Footer from "../components/footer.svelte";
  import SeoHead from "../components/seo/head.svelte";
  import Subscribe from "../components/subscribe.svelte";
  import Timeline from "../components/timeline/index.svelte";

  export let timelineEntries;

  timeline.set(timelineEntries);
</script>

<SeoHead />
<Timeline />
<Subscribe />
<Footer />

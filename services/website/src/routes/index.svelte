<script context="module">
  export async function  preload() {
    const response = await this.fetch(`timeline.json`);
    const timelineEntries = await response.json();
    return { timelineEntries };
  }
</script>

<script>
  import SeoHead from "../components/seo/head.svelte";
  import Timeline from "../components/timeline/index.svelte";

  export let timelineEntries;
</script>

<SeoHead />
<Timeline entries={timelineEntries} />
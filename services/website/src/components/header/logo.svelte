<script>
  import { fade } from "svelte/transition";
  import A from "../ui-elements/a.svelte";
</script>

<div class="flex justify-center flex-1 font-extrabold">
  <div transition:fade={{duration: 500}}>
    <A class="flex" href="/">
      👋
      <span class="pl-1">Mike Nikles</span>
    </A>
  </div>
</div>

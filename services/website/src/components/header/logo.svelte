<script>
  import { fade } from "svelte/transition";
  import { headerStore } from "../../stores";
  import A from "../ui-elements/a.svelte";
</script>

<div class="flex justify-center flex-1 font-extrabold">
  {#if !$headerStore.header.isTransparent}
    <div transition:fade={{duration: 500}}>
      <A class="flex" href="/">
        <span class="pl-1">據點。句點</span>
      </A>
    </div>
  {/if}
</div>

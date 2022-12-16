<script lang="ts">
  import clipboardDocumentCheck from "./clipboard-document-check.svelte";
  import documentDuplicate from "./document-duplicate.svelte";
  import eyeSlash from "./eye-slash.svelte";

  let clazz = "";
  export { clazz as class };

  const icons = {
    clipboardDocumentCheck,
    documentDuplicate,
    eyeSlash,
  };

  export let name: keyof typeof icons;
</script>

<svelte:component this={icons[name]} class={clazz || "w-6 h-6"} />

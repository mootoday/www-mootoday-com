<script>
  import { stores } from "@sapper/app";
  const { page } = stores();
  $: {
    if (
      typeof window !== "undefined" &&
      $page.path.indexOf(".") === -1
    ) {
      firebase && firebase.analytics().logEvent('page_view');
    }
  }
</script>
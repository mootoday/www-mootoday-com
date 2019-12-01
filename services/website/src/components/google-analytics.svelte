<script>
  import { stores } from "@sapper/app";
  import { GA_TRACKING, getConfigValue } from "../config";
//  import { gtag } from "../utils/ga";
  const { page } = stores();
  $: {
    if (
      getConfigValue(GA_TRACKING) &&
      typeof window !== "undefined" &&
      $page.path.indexOf(".") === -1
    ) {
      firebase && firebase.analytics().logEvent('page_view');
//      gtag("config", getConfigValue(GA_TRACKING), {
//        page_path: $page.path,
//      });
    }
  }
</script>
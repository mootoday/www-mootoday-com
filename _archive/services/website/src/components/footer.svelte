<script>
  import A from "./ui-elements/a.svelte";
  import CnwdBanner from "./cloud-native-web-development/banner.svelte";
</script>

<footer class="bg-gray-900">
  <div
    class="container pb-24 w-full px-4 md:px-0 max-w-6xl mx-auto flex items-center
    py-8">
    <div class="w-full mx-0 sm:mx-6">
      <div class="w-full mx-auto flex flex-wrap items-center">
        <div
          class="flex w-full md:w-1/2 justify-center md:justify-start text-white
          font-extrabold">
          <p class="no-underline">
            👋
            <span class="text-base text-white">Mike Nikles</span>
          </p>
        </div>
        <div
          class="flex w-full content-center justify-between md:w-1/2
          md:justify-end">
          <ul
            class="list-reset flex justify-center flex-1 md:flex-none
            items-center">
            <li>
              <A
                class="inline-block py-2 px-3 text-white no-underline
                hover:text-gray-200 hover:underline"
                href="https://www.twitter.com/mikenikles"
                target="_blank">
                Twitter
              </A>
            </li>
            <li>
              <A
                class="inline-block text-white no-underline hover:text-gray-200
                hover:underline py-2 px-3"
                href="https://www.linkedin.com/in/mikenikles/"
                target="_blank">
                LinkedIn
              </A>
            </li>
            <li>
              <A
                class="inline-block text-white no-underline hover:text-gray-200
                hover:underline py-2 px-3"
                href="https://github.com/mikenikles"
                target="_blank">
                GitHub
              </A>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <CnwdBanner />
</footer>

<script>
  import { stores } from "@sapper/app";
  const { page } = stores();

  let isPrivacyDialogOpen = ($page.query && $page.query.p) || false;
</script>

<style>
  .wrapper {
    margin-top: 64px;
  }

  #cover-image {
    object-position: right;
  }

  .bold-italic-underline {
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
  }
</style>

<div class="wrapper">
  <div class="relative bg-white overflow-hidden">
    <div class="max-w-screen-xl mx-auto ">
      <div
        class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl
        lg:w-full lg:pb-28 xl:pb-32">
        <div class="pt-6 px-4 sm:px-6 lg:px-8">
          <nav
            class="relative flex items-center justify-between sm:h-10
            lg:justify-start">
            <div
              class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div class="flex items-center justify-between w-full md:w-auto">
                <img
                  class="h-8 w-auto sm:h-10"
                  src="markua-support/markua-support-logos-128px.png"
                  alt="Markua Support logo" />
              </div>
            </div>
            <div class="block ml-10 pr-4">
              <a
                href="markua-support#features"
                class="font-medium text-gray-500 hover:text-gray-900
                focus:outline-none focus:text-gray-900 transition duration-150
                ease-in-out">
                Features
              </a>
            </div>
          </nav>
        </div>

        <div
          class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16
          lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <h2
              class="text-4xl tracking-tight leading-10 font-extrabold
              text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              Markua Support
              <br class="xl:hidden" />
              <span class="text-indigo-600">a Google Docs Add-on</span>
            </h2>
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl
              sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Do you write books on Leanpub? Use Google Docs instead and use the
              Markua Support add-on to help you.
            </p>
            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <a
                  href="https://gsuite.google.com/marketplace/app/markua_support/382576728671"
                  target="_blank"
                  class="w-full flex items-center justify-center px-8 py-3
                  border border-transparent text-base leading-6 font-medium
                  rounded-md text-white bg-indigo-600 hover:bg-indigo-500
                  focus:outline-none focus:shadow-outline transition
                  duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                  Visit the G Suite Marketplace
                </a>
              </div>
            </div>
          </div>
        </div>
        <svg
          class="hidden lg:block absolute right-0 inset-y-0 h-full w-48
          text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        id="cover-image"
        class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        src="markua-support/snippets.png"
        alt="Markua Support Screenshot" />
    </div>
  </div>

  <a name="features" />
  <div class="py-12 bg-white">
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md
            bg-indigo-500 text-white">
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9
                9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657
                0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div class="mt-5">
            <h5 class="text-lg leading-6 font-medium text-gray-900">
              Snippets
            </h5>
            <p class="mt-2 text-base leading-6 text-gray-500">
              Leanpub's Markua language provides features such as "aside",
              "blurb", etc. This syntax can be difficult to remember and
              distracts from writing a book. Click a butto to insert specific
              snippets!
            </p>
          </div>
        </div>
        <div class="mt-10 lg:mt-0">
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md
            bg-indigo-500 text-white">
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6
                2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3
                9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <div class="mt-5">
            <h5 class="text-lg leading-6 font-medium text-gray-900">
              Text Formatting
            </h5>
            <p class="mt-2 text-base leading-6 text-gray-500">
              Formatting text can be difficult. For example,
              <code>**bold**</code>
              formats as a
              <strong>bold</strong>
              text whereas
              <code>____bold, italic and underline____</code>
              turns text into
              <span class="bold-italic-underline">
                bold, italic and underline
              </span>
              . With the Markua Support add-on, simply use Google Doc's bold,
              italic, etc. formatting as you usually would.
            </p>
          </div>
        </div>
        <div class="mt-10 lg:mt-0">
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md
            bg-indigo-500 text-white">
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="mt-5">
            <h5 class="text-lg leading-6 font-medium text-gray-900">Convert</h5>
            <p class="mt-2 text-base leading-6 text-gray-500">
              When you're ready to preview or publish your book, simply click a
              button to convert your Google Doc to Markua, then click another
              button to copy the text and paste it into the Leanpub online
              editor- done.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
    <p class="mt-4 text-base leading-6 text-gray-500">
      <button on:click={() => (isPrivacyDialogOpen = true)}>
        Privacy Policy
      </button>
      <span>|</span>
      <a href="https://github.com/mikenikles/markua-docs-addon" target="_blank">Source Code</a>
    </p>
  </div>

  {#if isPrivacyDialogOpen}
    <div
      class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex
      sm:items-center sm:justify-center z-20">
      <div class="fixed inset-0 transition-opacity opacity-100">
        <div class="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <div
        class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl
        transform transition-all sm:max-w-md sm:w-full sm:p-6 opacity-100
        translate-y-0 sm:scale-100">
        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12
            rounded-full bg-green-100">
            <svg
              class="h-6 w-6 text-green-600"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="mt-3 sm:mt-5">
            <h3 class="text-lg text-center leading-6 font-medium text-gray-900">
              Privacy Policy
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">
                The Markua Support Google Doc add-on does not collect or
                distribute any information about you or the documents it
                converts.
              </p>
              <h2 class="mt-4 mb-2">Required permissions</h2>
              <p class="mt-2 text-sm leading-5 text-gray-500">
                Markua Support Google Doc add-on will ask for permission to
                access the current Doc (to convert it and insert Markua
                snippets). Markua Support Google Doc add-on reads the document
                content and structure; it inserts snippets at the cursor's
                position if you instruct it to do so.
              </p>
              <p class="mt-2 text-sm leading-5 text-gray-500">
                Markua Support Google Doc add-on will also ask for permission to
                display a sidebar. It uses the sidebar to display action buttons
                and options as well as the converted Markua. It allows you to
                copy the Markua to your clipboard.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <span class="flex w-full rounded-md shadow-sm">
            <button
              on:click={() => (isPrivacyDialogOpen = false)}
              type="button"
              class="inline-flex justify-center w-full rounded-md border
              border-transparent px-4 py-2 bg-indigo-600 text-base leading-6
              font-medium text-white shadow-sm hover:bg-indigo-500
              focus:outline-none focus:border-indigo-700
              focus:shadow-outline-indigo transition ease-in-out duration-150
              sm:text-sm sm:leading-5">
              Close
            </button>
          </span>
        </div>
      </div>
    </div>
  {/if}
</div>

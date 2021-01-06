<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
	  background: #fafafa;
  }

  .tag {
      @apply mr-2 px-4 bg-white border-solid border-2 rounded text-blue-800
  }

  .prose img + em {
      margin-top: -2em;
      display: block;
      background: antiquewhite;
      padding: 0.5em;
  }

  .footnote {
		  @apply text-sm bg-gray-200 p-8
  }
</style>
<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
	  background: #fafafa;
  }

  .tag {
      @apply mr-2 px-4 bg-white border-solid border-2 rounded text-blue-800;
		  white-space: nowrap;
  }

  .avatar {
		  @apply h-12 w-12 rounded-full bg-cover bg-center flex-shrink-0 border-gray-300 border-2
  }

  .avatar.big {
      @apply h-32 w-32
  }

  .bg-image {
      @apply bg-cover bg-center rounded flex-shrink-0;
		  padding-top: 56%;
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
<script>
  export let col;
</script>

<div class="w-full md:{col} p-6 flex flex-col flex-grow flex-shrink">
  <div
    class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
    <a href="tbd.html" class="flex flex-wrap no-underline hover:no-underline">
      <img
        src="https://source.unsplash.com/collection/225/800x600"
        class="h-64 w-full rounded-t pb-6 object-cover"
        alt="TODO" />
      <p class="w-full text-gray-900 text-xs md:text-sm px-6">
        GETTING STARTED
      </p>
      <div class="w-full font-bold text-xl text-gray-900 px-6">
        Lorem ipsum dolor sit amet.
      </div>
      <p class="text-gray-900 font-serif text-base px-6 mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
        ipsum eu nunc commodo posuere et sit amet ligula.
      </p>
    </a>
  </div>
  <div
    class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden
    shadow-lg p-6">
    <div class="flex items-center justify-between">
      <img
        class="w-8 h-8 rounded-full mr-4 avatar"
        data-tippy-content="Author Name"
        src="images/profile-pic.jpg"
        alt="Avatar of Author" />
      <p class="text-gray-900 text-xs md:text-sm">1 MIN READ</p>
    </div>
  </div>
</div>

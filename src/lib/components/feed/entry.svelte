<script lang="ts">
  export let entry: {
    id: string;
    slug: string;
    content: string;
    created_on: string;
  };
</script>

<div class="flex flex-shrink-0 p-4 pb-0">
      <a href="#" class="group block flex-shrink-0">
        <div class="flex items-center">
          <div>
            <img class="inline-block h-10 w-10 rounded-full" src="https://pbs.twimg.com/profile_images/1255590513035665408/uV0_K_3T_x96.jpg" alt="" />
          </div>
          <div class="ml-2">
            <p class="text-base font-medium leading-6 text-white">
              Mike Nikles
              <span class="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300"> • {entry.created_on} </span>
            </p>
          </div>
        </div>
      </a>
    </div>

    <div class="pl-16">
      <p class="width-auto flex-shrink text-base font-medium text-white">
        {entry.content}
      </p>

      <div class="pr-6 pt-3 md:flex-shrink">
        <img class="h-64 w-full rounded-lg" src="https://images.unsplash.com/photo-1561715608-5659baeccfb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2873&q=80" alt="An emergency exit light on a call" />
      </div>
      <div class="flex">
        <div class="w-full">
          <div class="flex items-center">
            <div class="text-center">
              <a href="#" class="group mt-1 flex w-12 items-center rounded-full px-3 py-2 text-base font-medium leading-6 text-gray-500 hover:bg-blue-800 hover:text-blue-300">
                <svg class="h-6 w-6 text-center" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </a>
            </div>

            <div class="m-2 py-2 text-center">
              <a href="#" class="group mt-1 flex w-12 items-center rounded-full px-3 py-2 text-base font-medium leading-6 text-gray-500 hover:bg-blue-800 hover:text-blue-300">
                <svg class="h-7 w-6 text-center" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-gray-600" />
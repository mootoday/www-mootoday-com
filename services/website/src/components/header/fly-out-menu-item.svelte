<script>
  import A from "../ui-elements/a.svelte";

  export let menuItem;
</script>

<A href="{menuItem.href}" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-400 transition ease-in-out duration-150">
  <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{menuItem.svgPath}"/>
  </svg>
  <div class="space-y-1">
    <p class="text-base leading-6 font-medium text-gray-900">
      {menuItem.label}
    </p>
    <p class="text-sm leading-5 text-gray-700">
      {menuItem.description}
    </p>
  </div>
</A>

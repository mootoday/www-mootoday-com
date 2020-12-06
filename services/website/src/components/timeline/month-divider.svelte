<script>
  export let month;

  const monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
</script>

<div
  class="py-3 px-6 bg-white border-4 border-black rounded-full text-2xl md:text-3xl">
  {monthsNames[month]}
</div>

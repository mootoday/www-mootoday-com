<script lang="ts">
	import ContentLayout from '$lib/components/content-layout.svelte';

  const projects = [{
    logo: "webstone-education",
    href: "https://www.webstone.app/",
    hrefDisplayText: "webstone.app",
    name: "Webstone Education",
    description: "Interactive courses. You choose your tech stack. We provide continuous course updates."
  }, {
    logo: "webstone-app",
    href: "https://github.com/webstonehq/webstone",
    hrefDisplayText: "github.com/webstonehq/webstone",
    name: "Webstone - App Framework",
    description: "Webstone provides an ecosystem of plugins for your full-stack web application."
  }, {
    logo: "your-analytics",
    href: "https://www.your-analytics.org/",
    hrefDisplayText: "your-analytics.org",
    name: "Your Analytics",
    description: "An open source, privacy-focused web analytics platform."
  }];

  const books = [{
    logo: "",
    href: "https://mikenikles.gumroad.com/l/cloud-native-web-development",
    hrefDisplayText: "mikenikles.gumroad.com",
    name: "Cloud Native Web Development",
    description: "From zero to production: A hands-on guidebook."
  },{
    logo: "",
    href: "https://mikenikles.gumroad.com/l/a-smart-guide-for-your-career-as-a-software-engineer?layout=profile",
    hrefDisplayText: "mikenikles.gumroad.com",
    name: "A Smart Guide for Your Career as a Software Engineer",
    description: "Everything I learned in my 20 years as a software engineer - including all mistakes."
  },];

  const courses = [{
    logo: "",
    href: "https://www.youtube.com/watch?v=OUzaUJ3gEug",
    hrefDisplayText: "youtube.com",
    name: "Full Stack Web Development in the Cloud",
    description: "From `npm init` to production deployment – 7+ hours of detailed lessons."
  },{
    logo: "",
    href: "https://www.educative.io/courses/cloud-native-development",
    hrefDisplayText: "educative.io",
    name: "Cloud Native Development with Tailwind, Google Cloud and Firebase",
    description: "Based on my book, a hands-on course with lessons, quizzes, etc."
  },];
</script>

<svelte:head>
	<title>Projects - mikenikles.com</title>
	<meta
		name="description"
		content="Various web and full-stack software projects. Mostly written in Typescript, Node.js, and Svelte."
	/>
</svelte:head>

<ContentLayout
	title="SaaS, Books, Courses"
>
	<svelte:fragment slot="intro">
    <strong class="text-teal-500">Software projects</strong> I've created. Mostly written in Typescript, Node.js, Svelte / SvelteKit, Prisma, PostgreSQL.
	</svelte:fragment>
	<ul class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
    {#each projects as {logo, href, hrefDisplayText, name, description}}
      <li class="group relative flex flex-col items-start">
        <div
          class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
        >
          <img
            alt=""
            src="/projects/{logo}.svg"
            width="32"
            height="32"
            decoding="async"
            data-nimg="1"
            class="h-8 w-8"
            loading="lazy"
            style="color: transparent;"
          />
        </div>
        <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
          <div
            class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
          />
          <a {href}
            ><span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" /><span
              class="relative z-10">{name}</span
            ></a
          >
        </h2>
        <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <p
          class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
            ><path
              d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
              fill="currentColor"
            /></svg
          ><span class="ml-2">{hrefDisplayText}</span>
        </p>
      </li>
    {/each}
	</ul>
</ContentLayout>

<ContentLayout
	title=""
>
	<svelte:fragment slot="intro">
    <strong class="text-teal-500">Digital books</strong> I've written and self-published over the years.
	</svelte:fragment>
	<ul class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
    {#each books as {href, hrefDisplayText, name, description}}
      <li class="group relative flex flex-col items-start">
        <div
          class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
          <div
            class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
          />
          <a {href}
            ><span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" /><span
              class="relative z-10">{name}</span
            ></a
          >
        </h2>
        <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <p
          class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
            ><path
              d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
              fill="currentColor"
            /></svg
          ><span class="ml-2">{hrefDisplayText}</span>
        </p>
      </li>
    {/each}
	</ul>
</ContentLayout>

<ContentLayout
	title=""
>
	<svelte:fragment slot="intro">
    <strong class="text-teal-500">Online courses</strong> I authored about full-stack web development.
	</svelte:fragment>
	<ul class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
    {#each courses as {href, hrefDisplayText, name, description}}
      <li class="group relative flex flex-col items-start">
        <div
          class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>        
        </div>
        <h2 class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
          <div
            class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
          />
          <a {href}
            ><span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" /><span
              class="relative z-10">{name}</span
            ></a
          >
        </h2>
        <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <p
          class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 flex-none"
            ><path
              d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
              fill="currentColor"
            /></svg
          ><span class="ml-2">{hrefDisplayText}</span>
        </p>
      </li>
    {/each}
	</ul>
</ContentLayout>

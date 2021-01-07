<script context="module">
  export async function preload({ params, query }) {
    const blog_promise = this.fetch(`blog.json`)
    const event_promise = this.fetch(`event.json`)
    const series_promise = this.fetch(`blog/tags/Quotidian%20diversions%20series.json`)

	  const result = await Promise.all([blog_promise, event_promise, series_promise])
	  const {posts} = await result[0].json()
	  const {events} = await result[1].json()
	  const res = await result[2].json()
  	return {
		  posts,
		  events,
		  blog_series: res.posts
	  }
  }
</script>

<script>
  import Footer from "../components/footer.svelte";
  import SeoHead from "../components/seo/head.svelte";
  import PostAuthor from '../components/blog-post/previews/post-author.svelte'

  export let posts;
  export let events;
  export let blog_series;

  // Without cloning the posts, it is an empty array when hydration kicks in.
  const postsArray = [...posts];
  const eventsArray = [...events]
  const blog_series_Array = [...blog_series]
  const leadEvent = eventsArray.shift()
  const lead_blog_series = blog_series_Array.shift()

	const getPostPreviewImage = post => `blog-posts/${
			post.metadata.createdAt.split("T")[0]
	}-${post.metadata.slug}/cover.jpg`

  const getEventPreviewImage = post => `event-posts/${
		  post.metadata.createdAt.split("T")[0]
  }-${post.metadata.slug}/cover.jpg`

  const getExcerpt = post => post.metadata.summary.slice(0, 30) + '...'

  const formatDate = (date) => {
	  return new Date(date).toLocaleDateString(undefined, {
		  month: 'short',
		  day: 'numeric'
	  })
  }

  const getEventDateDisplay = event => {
  	const {event_start_date, event_end_date} = event.metadata
	  return '' + formatDate(event_start_date) + "-" + formatDate(event_end_date)
  }

  const news = [
	  {
	  	date: '31-12-2020',
		  body: '藝發局資助《平地數碼》錄像文章網上雜誌第一期 12月31日刊登'
	  },
	  {
		  date: '01-03-2020',
		  body: '藝發局資助《平地數碼》錄像文章網上雜誌第2期公開徵稿 3月1日截止'
	  },
	  {
		  date: '31-03-2021',
		  body: '藝發局資助《平地數碼》錄像文章網上雜誌第2期 3月31日上載'
	  }
  ]
</script>

<SeoHead />

<div class="mb-12">
	<div class="text-white bg-gray-800 py-12">
		<a href="event/{leadEvent.metadata.slug}" class="container block sm:mx-auto px-4 sm:grid sm:grid-cols-2 sm:gap-4">
			<div>
				<p class="text-sm font-bold uppercase text-red-500 mb-2">{leadEvent.metadata.category[0].name_en}</p>
				<h2 class="text-2xl mb-4">{leadEvent.metadata.title}</h2>
				<p>{getEventDateDisplay(leadEvent)}</p>
				<p class="text-xl text-pink-200">{leadEvent.metadata.summary}</p>
			</div>
			<div class="sm:mt-0 mt-4">
				<div class="bg-image" style="background-image: url({getEventPreviewImage(leadEvent)});"></div>
			</div>
		</a>
	</div>

	<div class="text-white bg-gray-700 py-6">
		<div class="container block sm:mx-auto px-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
			{#each eventsArray as post (post.metadata.slug)}
				<a href="event/{post.metadata.slug}">
					<p class="text-sm font-bold uppercase text-red-500">{post.metadata.category[0].name_en}</p>
					<h3 class="mb-4">{post.metadata.title}</h3>
					<p class="text-xs mb-4 text-pink-300">{getEventDateDisplay(post)}</p>
					<p class="text-sm">{getExcerpt(post)}</p>
				</a>
			{/each}
		</div>
	</div>
</div>

<div class="container block sm:mx-auto px-4 grid sm:grid-cols-2 gap-4">
	<div class="bg-red-100 p-8">
		<div class="mx-auto w-16 h-12 -mt-12 bg-gray-800"></div>
		<h2 style="font-size: 4em" class="mb-2 font-bold">平地數碼</h2>
		<p>Video Essays as a Minor Literature</p>
		<p class="mt-4">More</p>
	</div>
	<div>
		{#each news as n}
			<div class="flex items-center">
				<div class="flex-shrink-0 w-12 text-center">
					<div class="text-xl text-red-400">
						JAN
					</div>
					<div class="text-xs">
						2021
					</div>
				</div>
				<p class="p-4">{n.body}</p>
			</div>
		{/each}
	</div>
</div>

<div class="container block sm:mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
	<div class="col-span-1 md:col-span-2">
		<div class="h-1 bg-gray-800"></div>
		<h3 class="font-bold text-xl mb-4">Childhood</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<a href="blog/{lead_blog_series.metadata.slug}" class="border border-gray-400 p-4">
				<p class="text-sm font-bold mb-2 text-blue-900">{lead_blog_series.metadata.author.name}</p>
				<h4 class="text-lg">{lead_blog_series.metadata.title}</h4>
				<div class="bg-image mt-4" style="background-image: url({getPostPreviewImage(lead_blog_series)});"></div>
			</a>
			<div>
				{#each blog_series_Array as post}
					<a href="blog/{post.metadata.slug}" class="block border-b-1 border-gray-400 mb-2 pb-2" style="border-bottom-width: 1px">
						<p class="text-sm font-bold mb-2 text-blue-900">{post.metadata.author.name}</p>
						<h4 class="text-sm">{post.metadata.title}</h4>
					</a>
				{/each}
			</div>
		</div>
	</div>
	<div class="col-span-1">
		<div class="h-1 bg-gray-800"></div>
		<h3 class="font-bold text-xl mb-4">Kind Choi</h3>
		hi
	</div>
</div>

<div class="p-8 border-t border-b border-gray-200">
	<div class="rounded relative bg-image w-3/4 max-w-4xl mx-auto" style="background-image: url('elemental-dynamite/cover-preview.png'); padding-top: 12%">
		<div class="text-white absolute inset-0 flex items-center justify-center">
			<div style="text-center">
				<h3>原格破裂</h3>
				<h3>elemental-dynamite</h3>
			</div>
		</div>
	</div>
</div>

<div class="container mx-auto my-8">
	<div class="grid grid-cols-2 gap-4">
		{#each postsArray as post}
			<a href="blog/{post.metadata.slug}" class="flex">
				<div class="flex-shrink-0 w-32">
					<div class="bg-image" style="background-image: url({getPostPreviewImage(post)});"></div>
				</div>
				<div class="flex-1 ml-4">
					<p class="text-sm font-bold uppercase text-red-500">{post.metadata.category[0].name_en}</p>
					<h3 class="mb-2">{post.metadata.title}</h3>
					<p class="text-gray-600 text-sm">{getExcerpt(post)}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<Footer />

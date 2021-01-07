<script context="module">
  export async function preload({ params, query }) {
    const blog_promise = this.fetch(`blog.json`)
    const event_promise = this.fetch(`event.json`)
    const series_promise = this.fetch(`blog/tags/Quotidian%20diversions%20series.json`)

	  const result = await Promise.all([blog_promise, event_promise, series_promise])
	  const {posts} = await result[0].json()
	  const {events} = await result[1].json()
	  const res = await result[2].json()
	  console.log(res.posts)
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

  export let posts;
  export let events;
  export let blog_series;

  // Without cloning the posts, it is an empty array when hydration kicks in.
  const postsArray = [...posts];
  const eventsArray = [...events]
  const blog_series_Array = [...blog_series]
  const leadEvent = eventsArray.shift()

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
		<div class="container mx-auto">
			<a class="flex mb-12" href="event/{leadEvent.metadata.slug}">
				<div class="flex-1">
					<p class="text-sm font-bold uppercase text-red-500 mb-2">{leadEvent.metadata.category[0].name_en}</p>
					<h2 class="text-2xl mb-4">{leadEvent.metadata.title}</h2>
					<p>{getEventDateDisplay(leadEvent)}</p>
					<p class="text-xl text-pink-200">{leadEvent.metadata.summary}</p>
				</div>
				<div class="flex-1">
					<div class="bg-image" style="background-image: url({getEventPreviewImage(leadEvent)});"></div>
				</div>
			</a>
		</div>
	</div>

	<div class="text-white bg-gray-700 py-6">
		<div class="container mx-auto">
			<div class="grid grid-cols-3 gap-4">
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
</div>

<div class="container mx-auto">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-2">
			<div class="grid grid-cols-3 border-8 border-red-200">
				<div class="bg-red-200 col-span-2 p-8">
					<h2 style="font-size: 4em" class="mb-2 font-bold">平地數碼</h2>
					<p>Video Essays as a Minor Literature</p>
					<p class="mt-4">More</p>
				</div>
				<div class="bg-red-100">
					{#each news as n}
						<div class="flex items-center">
							<div class="flex-shrink-0 w-16 text-center">
								<div class="text-2xl text-red-400">
									JAN
								</div>
								<div class="text-sm">
									2021
								</div>
							</div>
							<p class="p-4">{n.body}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div>
			<div>xx</div>
		</div>
	</div>
</div>

<div class="container">
	<div class="grid grid-cols-2 gap-4">
		<div>
			<h2>原格破裂 – 動畫的互媒實驗綜覽</h2>
			<p>源於一股脈衝，又或是在諸多提問的裂縫中想去尋蹤覓跡的驅策，《原格破裂 – 動畫的互媒實驗綜覽》的研習以社會文化歷史與技術譜系的宏闊景觀作願景去研習動畫的端倪。</p>
		</div>
		<div>
			<div>
				series 01
			</div>
			<div>
				series 02
				{#each blog_series_Array as post}
					<div>{post.metadata.title}</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<div class="container mx-auto mb-12">
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

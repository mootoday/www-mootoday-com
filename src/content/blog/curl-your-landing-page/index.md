---
title: '`curl` your landing page'
summary: "Does your project provide a CLI? Let people install it with `curl` from your marketing landing page."
createdAt: 2023-11-27T06:15:13.067Z
featured: false
---

<script>
	import UserAgent from "./user-agent.svelte";
</script>

**Key takeaways**

- Streamline CLI installations with `curl https://your-domain.com | sh`
- Try it out: `curl https://mikenikles.com | sh`
- Serve HTML for browsers, a shell script for `curl` requests

**Source code**

You can find the source code related to this post in the [`mikenikles/www-mikenikles-com`](https://github.com/mikenikles/www-mikenikles-com) GitHub repository. In particular, look for the `handleCurl` function in [`src/hooks.server.ts`](https://github.com/mikenikles/www-mikenikles-com/blob/master/src/hooks.server.ts).

## CLI distributions

If your project provides a CLI, you have near infinite options to distribute that CLI. Each has its pros and cons and each requires you to maintain and regularly test the various distribution channels you support.

## Distribute from your own domain

One alternative to Homebrew, apt-get, NPM, you name it, is to provide an installation shell script on your own domain and let people install it with:

```sh
curl https://your-domain.com | sh
```

To see what this looks like in action, try the following command:

```sh
curl https://mikenikles.com | sh
```

So... did you execute the above command 😰? You didn't, right? If you did, no harm was done since I'm a kind person and as of this writing, my domain hasn't been hacked.

> ⛔️ Never, and by that I mean **absolutely never ever in your lifetime**, should you download a random file with `curl` and blindly pipe it into `sh`.

Needless to say there could be major security implications by downloading and running random shell scripts on your computer. See the "Examples" below for a few companies that provide their CLIs through shell scripts. Use your best judgement as to when to trust a company.

If you want to check what a script is about (which is what I do before I execute any `curl ... | sh` command):

```sh
curl https://mikenikles.com | cat
```

Voilà, this prints the content of that shell script so you can verify its content before you run it.

## How does it work?

You may wonder how this works – well given you've read this far, you most definitely want to know how it works 🙂.

The key to this solution is what's called a `User-Agent` HTTP request header ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)).

In short, it's a string that tells the web server what kind of application sent the request. For example, your browser's `User-Agent` is:

<UserAgent />

When someone uses `curl https://mikenikles.com`, the `User-Agent` is something like this:

<code>curl/8.1.2</code>

Knowing that, all we need to do is tell the web server to send either a HTML response when a browser sends a request, or send a shell script response when `curl` sends a request.

## A SvelteKit hook does the work

In SvelteKit, we can handle that in the `src/hooks.server.js|ts` file.

```typescript
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleCurl = (async ({ event, resolve }) => {
	if (
		event.url.pathname === "/" &&
		event.request.headers.get("user-agent")?.startsWith("curl")
	) {
		const shellScript = import.meta.glob("../static/mikenikles.sh", { as: "raw" });
		const shellScriptContent = await shellScript["../static/mikenikles.sh"]();
		return new Response(shellScriptContent, {
			status: 200,
		});
	}
	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(handleCurl);
```

That's all there is to it.

## Example

One example where an actual CLI (as opposed to my demo shell script) is distributed as described in this post is:

```sh
curl https://goldsky.com | sh
```

It's where I implemented this approach and if you want crypto data live-streamed, Goldsky is how you do it.

👋

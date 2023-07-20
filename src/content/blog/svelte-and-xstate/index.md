---
title: 'Svelte & XState'
summary: 'State-driven user interfaces with Svelte & XState. Learn how to define a state machine and how to use it in your Svelte components.'
createdAt: 2022-12-17T21:10:13.067Z
videoPlaybackIds: ['BO6wueby01o169Ih003gA53BuufuW4n6znZV8hC8GN1y8']
---

<script>
	import Icon from "$lib/components/icons/index.svelte";
  import VideoPlayer from "$lib/components/video-player.svelte";

	import EmailWithXStateStep1 from "./with-xstate/step-1.svelte";
	import EmailWithXStateStep2 from "./with-xstate/step-2.svelte";
	import EmailWithXStateStep3 from "./with-xstate/step-3.svelte";
	import EmailWithXStateStep4 from "./with-xstate/step-4.svelte";

	import EmailWithoutXStateStep1 from "./without-xstate/step-1.svelte";
	import EmailWithoutXStateStep2 from "./without-xstate/step-2.svelte";
	import EmailWithoutXStateStep3 from "./without-xstate/step-3.svelte";
	import EmailWithoutXStateStep4 from "./without-xstate/step-4.svelte";
	import HtmlAndStyling from "./html-and-styling.svelte";

  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

**Key takeaways**

- With Statecharts, application behavior is decoupled from components
- Developing declarative, reactive UIs may become easier to reason about
- Statecharts are (web) framework agnostic
- Learning the concepts and XState comes with a (somewhat steep) learning curve

## What are we developing?

In this article, I am going to explain how you can use XState ([xstate.js.org](https://xstate.js.org)) in your Svelte(Kit) ([kit.svelte.dev](https://kit.svelte.dev)) application. I initially shared a [Twitter thread](https://twitter.com/mikenikles/status/1603561280479952897) about that and when it reached 10k+ impressions and the video was watched 4k+ times, I decided to elaborate in more detail on how it's done.

The video below shows what we are going to develop:

<div class="mx-auto md:only:w-1/2">
  <VideoPlayer playbackId="{data.videoPlaybackIds[0]}" title="Show, copy, & hide email address" muxBlurHashData="{data.videoMetadata}" />
  <!-- <VideoPlayer playbackId="{data.videoPlaybackIds[0]}" title="Show, copy, & hide email address" /> -->
</div>

You can find a live example on the [`/about`](https://www.mikenikles.com/about) page or interact with it below:

<EmailWithoutXStateStep4 />

## What is XState?

In their own words<sup>1</sup>:

> State machines and statecharts for the modern web.

Also from the XState team, Why?<sup>2</sup>

> Statecharts are a formalism for modeling stateful, reactive systems. This is useful for declaratively describing the behavior of your application, from the individual components to the overall application logic.

Applied to every day situations, XState lets you think of your application's behavior outside the scope of your code. Every user interface consists of one or more state, increasing in complexity as the application grows.

Traditionally, we likely define the happy path first before we start to think of error cases, empty states, loading states, etc. Without XState, our components slowly get more and more complex, to a point where we start to extract functionality into smaller components.

With XState, components render the user interface declaratively, based on the state machine's current state.

Let's look at the email component without and with XState.

## HTML & Styling

First, we develop the email component's structure and add some Tailwind CSS classes for styling. **Note**: The `<Icon />` component is omitted from this article, but you can find its implementation [on GitHub](https://github.com/mikenikles/www-mikenikles-com/blob/master/src/lib/components/icons/index.svelte).

```svelte
<script lang="ts">
	import Icon from '$lib/components/icons/index.svelte';
</script>

<div class="flex">
	<span
		class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
	>
		<Icon
			name="envelopeSolid"
			class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
		/>
		<span class="ml-4 mr-2">***************</span>
	</span>

	<button>
		<Icon name="eyeSlash" />
	</button>
	<button>
		<Icon name="documentDuplicate" />
	</button>
	<Icon name="clipboardDocumentCheck" />
</div>
```

This results in the following user interface:

<HtmlAndStyling />

Next, we are going to add functionality.

## Email component without XState

Let's walk through a few steps to build this email component without XState.

### Step 1 - Show a single icon only

First of all, let's make sure we only see one icon rather than three next to each other to the right of the `***************`. For that, we define a `currentState` variable to keep track of which icon to show – or in other words, to keep track of which state the component is in.

We also add click-handlers to the two buttons to change the `currentState` value.

```svelte
<script lang="ts">
	import Icon from '$lib/components/icons/index.svelte';

	let currentState: 'hidden' | 'visible' | 'copied' = 'hidden';

	const showEmailValue = () => {
		currentState = 'visible';
	};

	const copyEmailValue = () => {
		// TODO: Copy email to clipboard
		currentState = 'copied';
		// TODO: Change state back to "hidden" after a 1s delay
	};
</script>

<div class="flex">
	<span
		class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
	>
		<Icon
			name="envelopeSolid"
			class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
		/>
		<span class="ml-4 mr-2">***************</span>
	</span>

	{#if currentState === 'hidden'}
		<button on:click={showEmailValue}>
			<Icon name="eyeSlash" />
		</button>
	{/if}
	{#if currentState === 'visible'}
		<button on:click={copyEmailValue}>
			<Icon name="documentDuplicate" />
		</button>
	{/if}
	{#if currentState === 'copied'}
		<Icon name="clipboardDocumentCheck" />
	{/if}
</div>
```

This gives us the following component behavior:

<EmailWithoutXStateStep1 />

You notice we are missing a few features:

- Show the email address after the first click
- Copy the email address to the clipboard after the second click
- Automatically hide the email address and change the icon one second after we copied the email address to the clipboard

### Step 2 - Add a 1 second delay to change the icon back to the eye

We can achieve this with a `setTimeout()` call in the `copyEmailValue()` function.

```diff
const copyEmailValue = () => {
	// TODO: Copy email to clipboard
	currentState = 'copied';
-	// TODO: Change state back to "hidden" after a 1s delay
+	setTimeout(() => {
+		currentState = 'hidden';
+	}, 1000);
};
```

Once you click on the <Icon name="documentDuplicate" class="inline w-6 h-6" /> icon, you notice the <Icon name="clipboardDocumentCheck" class="inline w-6 h-6" /> icon is displayed for one second before it automatically changes back to <Icon name="eyeSlash" class="inline w-6 h-6" />.

<EmailWithoutXStateStep2 />

### Step 3 - Show email address

So far so good, the icons work as expected, but we don't see an email address yet. We can implement this with two small updates to the `showEmailValue()` and `copyEmailValue()` functions as seen below.

We need a variable that holds the email address value, which is either a few asterisks or an email address. While we refactor the component, let's also add an email default value which we set to `***************`.

Lastly, we use the new `emailValue` variable in the markup to display the correct value in the UI.

```diff
+	const emailValueDefault = '***************';

+	let emailValue = emailValueDefault;
	let currentState: 'hidden' | 'visible' | 'copied' = 'hidden';

	const showEmailValue = () => {
+		// prettier-ignore
+		emailValue = ['m','i','k','e','@','a','b','c','.','c','o','m'].join('');
		currentState = 'visible';
	};

	const copyEmailValue = () => {
		// TODO: Copy email to clipboard
		currentState = 'copied';
		setTimeout(() => {
+			emailValue = emailValueDefault;
			currentState = 'hidden';
		}, 1000);
	};

...

-		<span class="ml-4 mr-2">***************</span>
+		<span class="ml-4 mr-2">{emailValue}</span>

...
```

<EmailWithoutXStateStep3 />

If you wonder what that `emailValue = ['m','i','k','e','@','a','b','c','.','c','o','m'].join('');` is all about: It is completely optional, you could assign `mike@abc.com` to the variable. The array just makes it a tiny bit more difficult for spam bots to find the email address when they scrape your website.

### Step 4 - Copy the email address to the clipboard

Finally, we can leverage `navigator.clipboard` to copy the value of `emailValue` to the user's clipboard.

```diff
- const copyEmailValue = () => {
+ const copyEmailValue = async () => {
+ 	try {
+		await navigator.clipboard?.writeText(emailValue || '');
		currentState = 'copied';
		setTimeout(() => {
			emailValue = emailValueDefault;
			currentState = 'hidden';
		}, 1000);
+ 	} catch (error) {
+ 		currentState = 'hidden';
+ 	}
};
```

<EmailWithoutXStateStep4 />

Notice after you click the <Icon name="documentDuplicate" class="inline w-6 h-6" /> icon above, your clipboard contains `mike@abc.com`.

For simplicity, we ignore errors that may occur when we copying the email address to the clipboard. You could extend this code with additional error handling to display an error to your website visitor.

You can find the source code for the individual steps above [on GitHub](https://github.com/mikenikles/www-mikenikles-com/tree/master/src/content/blog/svelte-and-xstate/without-xstate).

### Conclusion – Without XState

This is a fairly simple component and you likely have seen many Svelte components written like that. A bit of UI, a click handler or two, some business logic. It works, it's readable and maintainable at the current size of the component.

Six months down the road, a few new use cases later, and some feature requests from customers and this component may start to become more complex, possible even split across multiple smaller components with props being passed from one component to another.

Now let's rebuild the component with XState.

## Email component with XState

> The foundation, just as with the example above, is taken from the **HTML & Styling chapter further above**. Please refer to it as a starting point.

### Step 0 - Create the state machine

We start with a new `email-machine.ts` file where we are going to define the state machine. With the knowledge we gained in the previous example, we already know what states the UI can be in as well as what events will occur. Based on that, let's create the following boilerplate state machine:

```ts
import { assign, createMachine } from 'xstate';

type Context = {};

export const emailMachine = createMachine(
	{
		id: 'Email',
		context: {},
		initial: 'hidden',
		states: {
			hidden: {},
			visible: {},
			copied: {}
		},
		schema: {
			context: {} as Context,
			events: {} as { type: 'SHOW' } | { type: 'COPY' }
		},
		predictableActionArguments: true,
		preserveActionOrder: true
	},
	{
		actions: {
			showEmailAddress: assign({}),
			hideEmailAddress: assign({})
		}
	}
);
```

Three things to note for now:

1. `states` defines the possible states our state machine can be in. That's `hidden`, `visible`, and `copied` here
1. `initial` defines the initial state, `hidden` in this case
1. `schema.events` defines the possible events, `SHOW` and `COPY` respectively

If you compare that to our component implementation without XState above, you notice many similarities.

### Step 1 - Show a single icon only

As with the example earlier without XState, let's start by showing a single icon only depending on the state. With state machines, we define this behavior in the machine itself rather than the UI component.

```diff
...
		states: {
-			hidden: {},
+			hidden: {
+				on: {
+					SHOW: {
+						target: 'visible'
+					}
+				}
+			},
-			visible: {},
+			visible: {
+				on: {
+					COPY: {
+						target: 'copied'
+					}
+				}
+			},
			copied: {}
		},
...
```

In plain English, these states read as follows:

- If the current state is `hidden` and a `SHOW` event is sent to the state machine, the current state changes to `visible`
- If the current state is `visible` and a `COPY` event is sent to the state machine, the current state changes to `copied`

With that in place, we can leverage the state machine in the UI component:

```svelte
<script lang="ts">
	import { interpret } from 'xstate';

	import Icon from '$lib/components/icons/index.svelte';
	import { emailMachine } from './email-machine-step-1';

	const emailService = interpret(emailMachine).start();
</script>

<div class="flex">
	<span
		class="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
	>
		<Icon
			name="envelopeSolid"
			class="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
		/>
		<span class="ml-4 mr-2">***************</span>
	</span>

	{#if $emailService.matches('hidden')}
		<button
			on:click={() => {
				emailService.send('SHOW');
			}}
		>
			<Icon name="eyeSlash" />
		</button>
	{/if}
	{#if $emailService.matches('visible')}
		<button
			on:click={() => {
				emailService.send('COPY');
			}}
		>
			<Icon name="documentDuplicate" />
		</button>
	{/if}
	{#if $emailService.matches('copied')}
		<Icon name="clipboardDocumentCheck" />
	{/if}
</div>
```

The result is:

<EmailWithXStateStep1 />

### Step 2 - Add a 1 second delay to change the icon back to the eye

Remember the `setTimeout()` function we used in the earlier example to achieve the one second delay? Well, it turns out XState thought of these use cases and provides a feature for it.

```diff
states: {
	hidden: {
		on: {
			SHOW: {
				target: 'visible'
			}
		}
	},
	visible: {
		on: {
			COPY: {
				target: 'copied'
			}
		}
	},
-	copied: {}
+	copied: {
+		after: {
+			'1000': {
+				target: 'hidden',
+			}
+		}
+	}
},
```

Once you click on the <Icon name="documentDuplicate" class="inline w-6 h-6" /> icon, you notice the <Icon name="clipboardDocumentCheck" class="inline w-6 h-6" /> icon is displayed for one second before it automatically changes back to <Icon name="eyeSlash" class="inline w-6 h-6" />.

<EmailWithXStateStep2 />

### Step 3 - Show email address

It is time to learn about XState's `context`. This is where we store values such as the `emailValue` variable in the example earlier. Again, instead of storing this in the UI component, we extend the state machine.

```diff
import { assign, createMachine } from 'xstate';

- type Context = {};
+ type Context = {
+ 	emailValue: string;
+ };

+ const emailValueDefault = '***************';

export const emailMachine = createMachine(
	{
		id: 'Email',
-		context: {},
+		context: {
+			emailValue: emailValueDefault
+		},
		initial: 'hidden',
		states: {
			hidden: {
+				entry: ['hideEmailAddress'],
				on: {
					SHOW: {
						target: 'visible'
					}
				}
			},
			visible: {
+				entry: ['showEmailAddress'],
				on: {
					COPY: {
						target: 'copied'
					}
				}
			},
			copied: {
				after: {
					'1000': {
						target: 'hidden'
					}
				}
			}
		},
		schema: {
			context: {} as Context,
			events: {} as { type: 'SHOW' } | { type: 'COPY' }
		},
		predictableActionArguments: true,
		preserveActionOrder: true
	},
	{
		actions: {
-			showEmailAddress: assign({}),
+			showEmailAddress: assign({
+				// prettier-ignore
+				emailValue: ['m','i','k','e','@','a','b','c','.','c','o','m'].join('')
+			}),
-			hideEmailAddress: assign({}),
+			hideEmailAddress: assign({
+				emailValue: emailValueDefault
+			})
		}
	}
);
```

This populates the context's `emailValue` depending on the state. All we need to do now is to display that context value in the UI.

```diff
...
-		<span class="ml-4 mr-2">***************</span>
+		<span class="ml-4 mr-2">{$emailService.context.emailValue}</span>
...
```

<EmailWithXStateStep3 />

### Step 4 - Copy the email address to the clipboard

To wrap up, all that is left is to copy the email address to the clipboard. Remember earlier, we had a `try ... catch` block to deal with the case where copying to the clipboard fails? These are two additional states, success and failure.

XState has built-in support for promises, such as in the case of `navigator.clipboard.writeText()`. We define the copy (and possible copy error) states in a new `copying` state.

```diff
states: {
	...
	visible: {
		entry: ['showEmailAddress'],
		on: {
			COPY: {
-				target: 'copied'
+				target: 'copying'
			}
		}
	},
+	copying: {
+		invoke: {
+			id: 'copyEmailAddress',
+			src: (context, event) => navigator.clipboard?.writeText(context.emailValue || ''),
+			onDone: {
+				target: 'copied'
+			},
+			onError: {
+				target: 'hidden'
+			}
+		}
+	},
	...
}
```

<EmailWithXStateStep4 />

We introduced a new `copying` state which leverages XState's built-in support for promises. The `onDone` and `onError` properties map to what we did in the previous example where we used a `try...catch` block.

Notice after you click the <Icon name="documentDuplicate" class="inline w-6 h-6" /> icon above, your clipboard contains `mike@abc.com`.

You can find the source code for the individual steps above [on GitHub](https://github.com/mikenikles/www-mikenikles-com/tree/master/src/content/blog/svelte-and-xstate/with-xstate).

### Conclusion – With XState

Despite this being a very simple component, you can see how XState helps us keep all behavior code encapsulated in the state machine. This results in clean Svelte components that react to state changes and render the corresponding user interface, depending on the state.

It is entirely possible to re-use that exact state machine in other projects that may use different web frameworks. I highly recommend the ["My love letter to XState and statecharts ♥"](https://timdeschryver.dev/blog/my-love-letter-to-xstate-and-statecharts) blog post written by Tim Deschryver.

Here is one more benefit of defining state with XState: You can visualize your state and interactively review what happens (go ahead, click on the blue areas):

<iframe class="w-full h-[300px]" src="https://stately.ai/viz/embed/58afca4a-d4b9-4fc5-b0db-5e68318d07dd?mode=viz&panel=code&showOriginalLink=1&readOnly=1&pan=1&zoom=1&controls=1" sandbox="allow-same-origin allow-scripts"></iframe>

Also check out XState's visual editor at [stately.ai/editor](https://stately.ai/editor) to get started with your first example in a visual way.

## Wrap up

While XState comes with a somewhat steep learning curve, I believe it may be worth it in the long run as a project evolves and becomes more complex. This is still early days for me, but I am going to give it a try for a few more use cases to see how it plays out in real-world scenarios.

This all can get pretty complex too, for example [this number input state machine](https://state-machine-viz.vercel.app/number-input) :). To be fair, I would argue this interactive visualization is a lot simpler to reason about than whatever its equivalent without XState may look like.

As with any library, you always must consider its weight and what impact this has for your website visitors. XState itself is massive, way too big for what I use it for on [`/about`](/about). There is `@xstate/fsm` which weighs 1/10 of the full version, but comes with some tradeoffs<sup>3</sup>.

Do you use XState or similar libraries? If not, why not?

👋

**References**

&nbsp;<sup>1</sup> [github.com/statelyai/xstate](https://github.com/statelyai/xstate)

&nbsp;<sup>2</sup> [xstate.js.org/docs](https://xstate.js.org/docs/#why)

&nbsp;<sup>3</sup> [github.com/statelyai/xstate/tree/main/packages/xstate-fsm](https://github.com/statelyai/xstate/tree/main/packages/xstate-fsm)

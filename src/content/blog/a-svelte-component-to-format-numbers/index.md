---
title: "A Svelte component to format numbers"
slug: "a-svelte-component-to-format-numbers"
coverPhotoId: "yD5rv8_WzxA"
summary: "Instead of 63476432, the component displays 64M."
createdAt: 2021-01-09T15:23:05.323Z
tags: ["svelte", "components"]
layout: blog
---

<script>
  import FormattedNumber from "./formatted-number.svelte";

  const exampleString = "63476432";
  const examples = exampleString.split("").reduce((result, current) => {
    if (result.length === 0) {
      result.push(current);
    } else {
      const next = result[result.length - 1] + current;
      result.push(next * 1);
    }
    return result;
  }, []);

  const locales = ["ko-KR", "zh-TW", "de-CH", "ar-SA"]
</script>

<style>
  td {
    font-family: 'Courier New', monospace;
  }
</style>

Photo by [Nick Hiller](https://unsplash.com/@nhillier?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/notebook?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

Let's develop a [Svelte](https://svelte.dev) component that formats numbers in a human readable way.

Instead of 63476432, the component displays 64M. Here are a few more examples:
<table class="monospace">
  {#each examples as example}
    <tr><td>{example}</td><td>=></td><td><FormattedNumber number={example} /></td></tr>
  {/each}
</table>

It supports different locales as well. Converting {exampleString} looks as follows:
<table class="monospace">
  {#each locales as locale}
    <tr><td>{locale}</td><td>=></td><td><FormattedNumber number={exampleString * 1} locale={locale} /></td></tr>
  {/each}
</table>

## How it's done

We leverage the `Number.prototype.toLocaleString()` method ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)). Thanks to that, the Svelte component becomes very basic:

```html
<script>
  export let number;
  export let locale = "en";
  
  $: formattedNumber = number.toLocaleString(locale, {
    notation: "compact",
    compactDisplay: "short",
  });
</script>

<style>
  span {
    font-variant-numeric: tabular-nums;
  }
</style>

<span>{formattedNumber}</span>
```

It is important to make sure `number` is of type `Number`. If you pass a string, the `toLocaleString` method will not work as intended.

### Typescript

I highly recommend you enable Typescript for your Svelte project ([instructions](https://svelte.dev/blog/svelte-and-typescript)) and refactor the `FormattedNumber` component as follows:

```html
<script lang="ts">
  export let number: number;
  export let locale: string = "en";

  $: formattedNumber = number.toLocaleString(locale, {
    notation: "compact",
    compactDisplay: "short",
  });
</script>

<style>
  span {
    font-variant-numeric: tabular-nums;
  }
</style>

<span>{formattedNumber}</span>
```

Voilà, now the Typescript compiler makes sure you pass a `Number`.

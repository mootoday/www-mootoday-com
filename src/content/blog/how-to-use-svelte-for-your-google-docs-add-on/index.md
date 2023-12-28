---
title: 'How to use Svelte for your Google Docs add-on'
slug: 'how-to-use-svelte-for-your-google-docs-add-on'
summary: 'Develop Google Docs add-on sidebars with Svelte and Typescript.'
createdAt: 2020-03-28T00:00:00.000Z
tags: ['svelte', 'development']
layout: blog
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

A screenshot of a Svelte app rendered in a Google Doc's add-on sidebar

## Introduction

I recently found myself in a situation where I needed a Google Docs add-on to help with authoring my upcoming book, **[Cloud Native Web Development](https://gumroad.com/mikenikles)**.

If you're not familiar with these add-ons, they are "customized extensions of G Suite productivity applications such as Gmail, Google Sheets and Google Docs." You can learn more by reading [the official documentation](https://developers.google.com/gsuite/add-ons/overview).

The application development platform used to develop add-ons is called [Google Apps Script](https://developers.google.com/apps-script/overview) and developers use JavaScript or, as you will see in this blog post, Typescript to write code.

## Custom sidebars

A feature that caught my attention is [custom sidebars](https://developers.google.com/apps-script/guides/dialogs#custom_sidebars). Imagine you have a Google Docs document open - a custom sidebar would appear on the right-hand side of the screen.

Sidebars are HTML files styled with CSS and JavaScript is used to interact with the server-side code by leveraging an asynchronous client-side JavaScript API, `google.script.run`. A lot more details are available in the [documentation](https://developers.google.com/apps-script/guides/html/communication).

### User interface

While reading the documentation to familiarze myself with Apps Script and custom sidebars, I found a [quickstart sample](https://developers.google.com/gsuite/add-ons/editors/docs/quickstart/translate) that used jQuery and plain CSS. A good start for sure, but you wouldn't be reading this blog post if I had accepted that technology stack ;-).

I wondered... "If it's HTML, CSS and JavaScript, there must be a way to use [Svelte](https://svelte.dev/)! 🤔"

If you're curious why I prefer Svelte over React, please check out [why I moved from React to Svelte](https://www.mootoday.com/blog/why-i-moved-from-react-to-svelte-and-why-others-will-follow).

The default Svelte template provides a `build` NPM script that compiles Svelte components into static HTML pages. Let's see how we can take advantage of that.

## A Google Docs add-on Svelte template

First things first: The template repository is available at [https://github.com/mootoday/google-docs-addon-svelte-template](https://github.com/mootoday/google-docs-addon-svelte-template). You can simply clone this repository, follow the instructions in the `README` and you're up and running in no time. To learn about the steps I took, have a look at the [closed pull requests](https://github.com/mootoday/google-docs-addon-svelte-template/pulls?q=is%3Apr+is%3Aclosed) or keep reading.

Secondly, remember at the beginning I said I needed a Google Docs add-on? If you're curious to see it all in action in a bigger project, please check out [https://github.com/mootoday/markua-docs-addon](https://github.com/mootoday/markua-docs-addon).

### Initialize all tooling (npm, clasp)

Note: I recommend you clone my template above to get started and save yourself the following steps! This is mainly for the curious who want to understand what's going on.

[Files changed in pull request #1](https://github.com/mootoday/google-docs-addon-svelte-template/pull/1/files)

1.  To start, let's create an empty folder and run `npm init` - use values of your choice to complete the wizard.
2.  Next, we need two dev dependencies:

```sh
npm i -D @google/clasp @types/google-apps-script
```

`clasp` is an [open-source](https://github.com/google/clasp/) tool, separate from the Apps Script platform, that lets you develop and manage Apps Script projects from your terminal rather than the Apps Script editor.  
The Apps Script types assist with autocomplete in editors and I highly recommend you install them as it makes navigating the API much simpler.

1.  Also create a `src/index.ts` file, mainly a placeholder for now, with the following content:

```ts
/**
 * @OnlyCurrentDoc
 */

const onOpen = (e) => {
	DocumentApp.getUi().createAddonMenu().addItem('Show sidebar', 'showSidebar').addToUi();
};

const onInstall = (e) => {
	onOpen(e);
};

const showSidebar = () => {
	// TODO: Display the sidebar
	Logger.log('TODO: Display the sidebar.');
};
```

1.  Later when we deploy the add-on, we want to publish only what's absolutely necessary - which isn't much. Let's instruct `clasp` accordingly with a `.claspignore` file:

```
**/**
!appsscript.json
!src/**/**
```

1.  Next up, create an `appsscript.json` file with information about the add-on:

```json
{
	"timeZone": "America/New_York",
	"dependencies": {},
	"exceptionLogging": "STACKDRIVER",
	"runtimeVersion": "V8",
	"oauthScopes": [
		"https://www.googleapis.com/auth/documents.currentonly",
		"https://www.googleapis.com/auth/script.container.ui"
	]
}
```

The two `oauthScopes` you see ask for permissions when users install the add-on. They're saying "I the add-on promise to only access the current document and I would like to show you a UI (the custom sidebar)".

1.  Lastly, a `.gitignore` file with `node_modules` as its content is a good idea ;-).

### Add the Svelte sidebar

[Files changed in pull request #2](https://github.com/mootoday/google-docs-addon-svelte-template/pull/2/files)

This is the fun part where we add a Svelte application, a few NPM scripts to build the application and a workflow to use the compiled Svelte app in the add-on custom sidebar. Let's go!

1.  Create the Svelte application in the `sidebar` folder:

```sh
npx degit sveltejs/template sidebar
cd sidebar
npm install
npm run dev
```

Standard Svelte commands as [documented](https://svelte.dev). Once you verified the app runs, cancel the `npm run dev` command.

1.  Base styles will be provided by a Google-defined CSS file (more on that later), so we want to delete the `sidebar/public/global.css` file and remove its reference in the `sidebar/public/index.html` file.
2.  It's time to automate a few steps with npm scripts. We need to `npm i -D npm-run-all` to simplify that. Next, add the following scripts to the root `package.json` file:

```json
"scripts:" {
  "build": "rm -fr ./sidebar/public/build && run-s build:ui build:ui:generate",
  "build:ui": "cd ./sidebar && npm run build",
  "build:ui:generate": "run-p build:ui:generate:*",
  "build:ui:generate:css": "echo '<style>' > ./src/stylesheet.html && cat ./sidebar/public/build/bundle.css >> ./src/stylesheet.html && echo '</style>' >> ./src/stylesheet.html",
  "build:ui:generate:js": "echo '<script>' > ./src/javascript.html && cat ./sidebar/public/build/bundle.js >> ./src/javascript.html && echo '</script>' >> ./src/javascript.html",
}
```

Alright... looks interesting... What's going on there?

- `build`: Deletes old artifacts and kicks off two build processes, sequentially.
- `build:ui`: Changes directory to the `sidebar`, our Svelte app, and runs the `build` command defined in `sidebar/package.json`. This command compiles the Svelte app into static assets in `sidebar/public/build`.
- `build:ui:generate`: Uses `npm-run-all` to execute all `build:ui:generate:*` commands in parallel.
- `build:ui:generate:css`: Not as fancy as it looks, it basically writes a `src/stylesheet.html` that contains a `<style>` tag with the Svelte-generated CSS.
- `build:ui:generate:js`: The same as above for CSS, but this time for JavaScript.  
  With that, we now have a `src/stylesheet.html` and a `src/javascript.html` file which we need to load into the custom sidebar HTML.

1.  Since these two files are generated, we don't want them in source control. The following two lines in `.gitignore` help with that:

```
src/javascript.html
src/stylesheet.html
```

1.  To create the `src/sidebar.html` file, we can start with the `sidebar/public/index.html` file. Copy its content to the new `src/sidebar.html` file.
2.  Next, remove the stylesheet link and the script tag.
3.  Before the closing `</head>` tag, insert the following code to load the previously generated stylesheet file:

```
<?!= include("src/stylesheet"); ?>
```

1.  In the `<body>` tag, insert the following:

```
<?!= include("src/javascript"); ?>
```

1.  So close, we're almost done! Next up we need to look at that `include` function. It's something we add to `src/index.ts` and it's a simple one-liner:

```ts
const include = (filename: string) => HtmlService.createHtmlOutputFromFile(filename).getContent();
```

1.  Still in `src/index.ts`, it's time to update the `showSidebar` function to actually show the sidebar:

```ts
const showSidebar = () => {
	const ui = HtmlService.createTemplateFromFile('src/sidebar')
		.evaluate()
		.setTitle('My Svelte Sidebar');
	DocumentApp.getUi().showSidebar(ui);
};
```

With all that in place, `npm run build` now builds the sidebar Svelte app, copies the generated CSS and JS to HTML files we can include in the sidebar HTML used by the Google Docs add-on.

Next up: Deploy and test!

## Create an Apps Script project & deploy the app

As mentioned earlier, `clasp` is our tool of choice to interact with Google Apps script. Let's start with three convenience NPM scripts, added to the root `package.json` file:

```json
"scripts": {
  "clasp:create": "clasp create",
  "clasp:login": "clasp login --no-localhost",
  "clasp:open": "clasp open",
}
```

They're all self-explanatory.

One note though, the `--no-localhost` flag is optional and only needed if your development environment is in the cloud. If you develop locally, you don't need that flag.

1.  `npm run clasp:login` guides you through the process of authenticating with your Google account.
2.  `npm run clasp:create` creates a new Apps Script project. This also generates a `.clasp.json` file in your source code with the script ID.
3.  `npm run clasp:open` opens the project, this is useful once the add-on is deployed and you want to test it or look at logs.

### Deployment

One more, absolutely last NPM script for today - I promise! Let's add the following to the root `package.json` file:

```json
"scripts": {
  "deploy": "run-s build && clasp push",
}
```

That's it. Run `npm run deploy` in your terminal, give it a moment and once completed, open the Apps Script project with `npm run clasp:open`.

### Testing

Once you followed the steps above and have the Apps Script project open, the following steps explain how to test the add-on:

1.  Click **Run**, then **Test as add-on...**
2.  Click **Select Doc** and choose a document you want to use for testing.
3.  Click **Save**
4.  In the _Execute Saved Test_ section that appeared at the top, select your document and click **Test**.
5.  With the document now open, navigate to **Add-ons** | **\[your-project-name\]** | **Show sidebar**

This opens the Svelte sidebar.

## Optional: Interact with the Google Doc content

This is out of scope for this blog post, but the template contains an example of how a button in the sidebar can insert text into the document. Please refer to [pull request #3](https://github.com/mootoday/google-docs-addon-svelte-template/pull/3/files) for details.

Please let me know what you think and if that's helpful. You can reach me on Twitter [@mikenikles](https://twitter.com/mikenikles).

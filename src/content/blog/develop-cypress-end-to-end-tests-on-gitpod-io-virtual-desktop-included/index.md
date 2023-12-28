---
title: 'Develop Cypress end-to-end tests on Gitpod.io - Virtual Desktop included'
slug: 'develop-cypress-end-to-end-tests-on-gitpod-io-virtual-desktop-included'
summary: 'Run the Cypress UI on Gitpod.io without the need of a local development environment.'
createdAt: 2020-05-02T00:00:00.000Z
tags: ['webdev', 'gitpod', 'cypress', 'sapper']
layout: blog
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

<!-- Photo by [Jessica Lewis](https://unsplash.com/@thepaintedsquare?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/virtual?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) -->

## Experience it for yourself

Before we go into the details, you can experience Cypress end-to-end tests running in a virtual environment in your browser with the following link:

> [https://gitpod.io/#https://github.com/mootoday/cypress-on-gitpod](https://gitpod.io/#https://github.com/mootoday/cypress-on-gitpod)

Click the "**Login with GitHub & Launch Workspace**" button, follow the instructions and you will be up and running in a moment.

Once `npm install` completes automatically, a development server starts in one terminal and Cypress starts in a second terminal. Besides that, a second browser tab will open with a virtual desktop where, after a minute or so, you will see the Cypress UI.

The first browser tab shows the editor (the errors in the console can safely be ignore):

![Gitpod editor]({assetsBasePath}/1.jpg)

Whereas the second browser tab provides the Cypress UI (in this case, it's a default [Sapper](https://sapper.svelte.dev/) application):

![Cypress UI]({assetsBasePath}/2.jpg)

## What is required to make it work? ([Pull Request](https://github.com/mootoday/cypress-on-gitpod/pull/1))

The source code is available at [https://github.com/mootoday/cypress-on-gitpod](https://github.com/mootoday/cypress-on-gitpod).

The first thing is to add `cypress` as a dev dependency with `npm i -D cypress`. This ensures it gets installed like any other dependency when `npm install` runs.

### Gitpod configuration

Next, we need a `.gitpod.yml` configuration file to configure a custom docker image (more on that in a minute), a few tasks to run when the development environment loads and some port definitions. Let's look at that file section by section:

```yaml
image:
  file: .gitpod.Dockerfile
```

This instructs Gitpod to use a custom Docker image, as defined in the specified file.

```yaml
tasks:
  - init: |
      touch /tmp/.npm-lock
      npm install
      rm /tmp/.npm-lock
    command: npm run dev
  - init: sleep 1 && while [ -f /tmp/.npm-lock ]; do sleep 1; done
    command: npm run cy:open
```

The two tasks (as seen by their `-`) tell Gitpod to open two terminals. In the first terminal, a temporary file is created, `npm install` executed and eventually, the temporary file is deleted.

In the second terminal, the `init` command waits until the temporary file is no longer available. When that's the case, we can be sure `npm install` completed in the first terminal and all dependencies are available. We then open Cypress with the provided `cy:open` NPM script.

To wrap up the `.gitpod.yml` file, we define three ports and instruct Gitpod what to do. `5900` and `10000` are ignored, `6080` is opened in a new tab - that's the virtual desktop.

```yaml
ports:
  - port: 5900
    onOpen: ignore
  - port: 6080
    onOpen: open-browser
  - port: 10000
    onOpen: ignore
```

### A custom Docker image

As defined in the `.gitpod.yml` configuration above, we define a custom Docker image in `.gitpod.Dockerfile` as follows:

```Dockerfile
FROM gitpod/workspace-full-vnc

# Install Cypress dependencies.
RUN sudo apt-get update \
 && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
   libgtk2.0-0 \
   libgtk-3-0 \
   libnotify-dev \
   libgconf-2-4 \
   libnss3 \
   libxss1 \
   libasound2 \
   libxtst6 \
   xauth \
   xvfb \
 && sudo rm -rf /var/lib/apt/lists/*
```

We use a base image [provided by Gitpod](https://github.com/gitpod-io/workspace-images/tree/master/full-vnc). Next, we install the dependencies required by Cypress [as documented](https://docs.cypress.io/guides/guides/continuous-integration.html#Dependencies).

## Conclusion

A few lines of configuration and we're up and running with Cypress on Gitpod.io. Make sure you have a look at the [pull request](https://github.com/mootoday/cypress-on-gitpod/pull/1) where I provided a few annotations in the code.

👋

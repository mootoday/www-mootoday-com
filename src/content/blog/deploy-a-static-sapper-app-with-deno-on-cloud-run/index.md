---
title: 'Deploy a static Sapper app with Deno on Cloud Run'
slug: 'deploy-a-static-sapper-app-with-deno-on-cloud-run'
summary: 'Deploy a static Sapper / Svelte application to Cloud Run, served by Deno.'
createdAt: 2020-05-14T00:00:00.000Z
tags: ['cloud', 'cloudrun', 'sapper', 'deno']
layout: blog
---

<script>
  export let data;
  const assetsBasePath = `/blog/${data.slug}`;
</script>

Yesterday, Deno 1.0 was released. If Deno does not sound familiar, don't worry this is fine at this point. Please head over to [https://deno.land/v1](https://deno.land/v1) and once you've read that, come back here to learn how we can use this to deploy a static Sapper / Svelte application to Cloud Run.

## Source code

The source code is available on my GitHub profile at [https://github.com/mikenikles/deno-sapper-cloud-run](https://github.com/mikenikles/deno-sapper-cloud-run). If you only care about the changes I made to the default Sapper template, please look at [PR #1](https://github.com/mikenikles/deno-sapper-cloud-run/pull/1).

## Code review

Let's review what changes are necessary and how you can apply it to your project, if you use Sapper to deploy a static web application. **It does not work if you use Sapper for server-side rendering**.

First, add a `.dockerignore` file with the following content:

```
/*
!/package.json
!/package-lock.json
!/rollup.config.js
!/src
!/static
```

It ignores everything, except the files and directories listed. To learn more about that, please review [my previous blog post](https://www.mikenikles.com/blog/sapper-google-cloud-run-continuous-deployment-a-boilerplate-template).

Next, here's the `Dockerfile` that does the following:

- Install NPM dependencies
- Export the Sapper web application as a static site
- Create a runtime Docker stage based on `hayd/alpine-deno`
- Use the `file_server.ts` to serve the static web app

```Dockerfile
# This stage exports the sapper application.
FROM mhart/alpine-node:12 AS export-app
WORKDIR /app
COPY . .
RUN npm install --no-audit --unsafe-perm
RUN npm run export

# This stage runs Deno and serves the static site
FROM hayd/alpine-deno:1.0.0
COPY --from=export-app /app/__sapper__/export .
CMD ["run", "--allow-read", "--allow-net", "https://deno.land/std/http/file_server.ts"]
```

I had to get a [tiny PR](https://github.com/denoland/deno/pull/5367) merged into Deno and within minutes, the team merged it. No need to wait for a new Deno release since the change is immediately available in the latest version of Deno's Standard Library at [https://deno.land/std/http/file_server.ts](https://deno.land/std/http/file_server.ts).

Lastly, to make deployment a bit more seamless, we let's use a `deploy.sh` file:

```bash
#!/bin/bash
GCP_PROJECT=$(gcloud config list --format 'value(core.project)')
IMAGE="deno-sapper-cloud-run"
REGION="us-central1"

gcloud builds submit --tag gcr.io/$GCP_PROJECT/$IMAGE
gcloud run deploy $IMAGE --image gcr.io/$GCP_PROJECT/$IMAGE --port 4507 --platform managed --allow-unauthenticated --region $REGION
```

Make sure you're satisfied with the environment variables before you run the script. Also, you need `gcloud` installed and configured with a default project to make this work.

When you deploy for the first time, you will be asked to enable a few GCP APIs.

Once the service is deployed, you will see a message similar to the following:

```
Done.
Service [deno-sapper-cloud-run] revision [deno-sapper-cloud-run-00002-zob] has been deployed and is serving 100 percent of traffic at https://deno-sapper-cloud-run-xbach7vf3a-uc.a.run.app
```

Your static Sapper app now runs on Cloud Run, served by Deno at [https://deno-sapper-cloud-run-xbach7vf3a-uc.a.run.app](https://deno-sapper-cloud-run-xbach7vf3a-uc.a.run.app)

👋

# Mike's blog

The source code for www.mikenikles.com. It consists of:

**A Ghost.org instance**
* Deployed to [Cloud Run](www.cloud.run)
* Backed with a [Cloud SQL](https://cloud.google.com/sql/docs/) database
* Assets hosted in [Google Cloud Storage](https://cloud.google.com/storage/) with a [Cloud CDN](https://cloud.google.com/cdn/) for better performance.

**A Svelte / Sapper static website**
* Deployed to [Firebase Hosting](https://firebase.google.com/docs/hosting) and available at www.mikenikles.com
* Developed with [Svelte](https://svelte.dev/), [Sapper](https://sapper.svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/).

# Development

This is a monorepo with all required source code available as services in `./services`. See each individual service's README for details.

## Install dependencies

1. `npm install`
1. `npm run bootstrap`

## Add a new service

Run the following command. Replace `your-service-name`:

```sh
SERVICE_NAME=your-service-name npm run add-new-service
```

# Deployment

Each service contains a `deploy` npm script.

## Continuous deployment of the website

The `./services/website` service deploys automatically on each push to the `master` branch. See the `./cloudbuild.yaml` for details.
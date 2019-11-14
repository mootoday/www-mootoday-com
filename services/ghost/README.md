# ghost

## Build, tag & deploy Ghost image

```sh
docker build -t www-mikenikles-com-ghost:latest .
docker tag www-mikenikles-com-ghost:latest gcr.io/www-mikenikles-com/ghost
docker push gcr.io/www-mikenikles-com/ghost
```

## Deploy new service

```sh
gcloud beta run deploy ghost --image gcr.io/www-mikenikles-com/ghost --allow-unauthenticated --platform managed --region us-east1 --add-cloudsql-instances www-mikenikles-com:us-east1:www-mikenikles-com-ghost
```
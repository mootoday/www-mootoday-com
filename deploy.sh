#!/bin/sh
for service in $(./node_modules/.bin/lerna changed --ndjson)
do
  servicesToDeploy="$servicesToDeploy --scope $(echo $service | jq -r '.name')"
done

if [ ! -z "$servicesToDeploy" ]
then
  echo "Deploying scopes: $servicesToDeploy"
  ./node_modules/.bin/lerna run deploy --parallel $servicesToDeploy
fi

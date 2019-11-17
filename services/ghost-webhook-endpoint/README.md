# `ghost-webhook-endpoint`

This service is used a Ghost's webhook endpoint.
See the [Webhook documentation](https://ghost.org/docs/api/v3/webhooks/) on the Ghost website for details.

## What triggers this service?

### `post.published` event

Ghost sends the newly published blog post in JSON format to the webhook endpoint. Once authenticated,
the request payload is published to a PubSub topic where other services can subscribe to. This allows
for workflows such as:
* Kick off a website rebuild to ensure the newly published blog post is visible at www.mikenikles.com.
* Publish the blog post to www.dev.to.
* Send a tweet with a link to the blog post.
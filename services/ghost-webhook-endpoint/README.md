# `ghost-webhook-endpoint`

This service is used a Ghost's webhook endpoint.
See the [Webhook documentation](https://ghost.org/docs/api/v3/webhooks/) on the Ghost website for details.

## What triggers this service?

In the Ghost settings, this service's URL is configured as the `post.published` event.

## Service objective

For each newly published blog post, Ghost sends the post's content and metadata in JSON format to the webhook endpoint.
Once authenticated, the request payload is published to a PubSub `ghost-new-posts` topic where other services can subscribe to.
This allows for workflows such as:
* Kick off a website rebuild to ensure the newly published blog post is available at www.mikenikles.com.
* Publish the blog post to www.dev.to.
    * See the [`ghost-new-posts-publish-to-devto`](../ghost-new-posts-publish-to-devto) service for details.
* Send a tweet with a link to the blog post.

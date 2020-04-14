# `ghost-new-posts-publish-to-devto`

This service is a subscriber of the `ghost-new-posts` PubSub topic.

## What triggers this service?

A new blog post message published to the `ghost-new-posts` topic.

## Service objective

Process each received message, convert it to an API payload that the Dev.to API understands
and publish the blog post to dev.to in DRAFT mode.

See the Dev.to API docs for details on the payload format: https://docs.dev.to/api/#operation/createArticle
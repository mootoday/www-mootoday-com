---
name: New blog post
about: A checklist to create a new blog post
title: ''
labels: blog post
assignees: ''

---

Follow these steps to publish a new blog post:
- [ ] Create branch
- [ ] Run `npm run generate` to create a new blog post
- [ ] Write post in Google Docs, use Markdown where necessary (e.g. headings, lists, etc.)
- [ ] Copy content to `src/routes/blog/{slug}/index.svx`
- [ ] Add jpg assets to `static/blog-posts/{slug}/`
- [ ] Run `npm run images` in the `services/website` directory to generate next-gen image formats
- [ ] Review blog post locally
- [ ] Open PR & review preview deployment
- [ ] Record the code review video and publish to the Software Architect's YouTube channel
- [ ] Link from the YouTube video to the PR
- [ ] Update the blog post and link to the YouTube video
- [ ] Merge PR
- [ ] Share on Twitter
- [ ] ? Cross-post to DEV. GitHub Actions step on master only. Update on DEV if post exists ?

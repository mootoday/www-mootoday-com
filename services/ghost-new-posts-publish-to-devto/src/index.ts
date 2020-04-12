import Turndown from "turndown";
import got from "got";

const turndownService = new Turndown();

const publishToDevto = async (apiPayload) => got.post("https://dev.to/api/articles", {
  headers: {
    "api-key": process.env.DEVTO_API_KEY
  },
  json: apiPayload
})

export const ghostNewPostsPublishToDevtoService = async (data, context) => {
  try {
    const ghostPayload = data.data ? JSON.parse(Buffer.from(data.data, "base64").toString()) : null;
    if (!ghostPayload) {
      return "";
    }
    await publishToDevto({
      title: ghostPayload.title,
      body_markdown: turndownService.turndown(ghostPayload.html),
      published: false,
      main_image: ghostPayload.feature_image,
      canonical_url: ghostPayload.url.replace("blog.mikenikles.com", "www.mikenikles.com/blog"),
      description: ghostPayload.custom_excerpt,
      tags: (ghostPayload.tags || []).map((tag) => tag.name)
    })
  } catch (error) {
    console.error(error);
  }
  return "";
};

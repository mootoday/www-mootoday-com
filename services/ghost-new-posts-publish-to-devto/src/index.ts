import got from "got";
import * as Turndown from "turndown";

const turndownService = new Turndown();

interface IDevToApiPayload {
  body_markdown: string;
  canonical_url: string;
  description: string;
  main_image: string;
  published: boolean;
  tags: string[];
  title: string;
}

interface IPubSubData {
  data: string;
}

const publishToDevto = async (apiPayload: IDevToApiPayload) => got.post("https://dev.to/api/articles", {
  headers: {
    "api-key": process.env.DEVTO_API_KEY,
  },
  json: apiPayload,
});

export const ghostNewPostsPublishToDevtoService = async (data: IPubSubData) => {
  try {
    const ghostPayload = data.data ? JSON.parse(Buffer.from(data.data, "base64").toString()) : null;
    if (!ghostPayload) {
      return "";
    }
    await publishToDevto({
      body_markdown: turndownService.turndown(ghostPayload.html),
      canonical_url: ghostPayload.url.replace("blog.mikenikles.com", "www.mikenikles.com/blog"),
      description: ghostPayload.custom_excerpt,
      main_image: ghostPayload.feature_image,
      published: false,
      tags: (ghostPayload.tags || []).map((tag: { name: string; }) => tag.name),
      title: ghostPayload.title,
    });
  } catch (error) {
    console.error(error);
  }
  return "";
};

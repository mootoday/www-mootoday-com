import got from "got";
import * as Turndown from "turndown";

const turndownService = new Turndown({
  codeBlockStyle: "fenced"
});

interface IDevToApiPayload {
  article: {
    body_markdown: string;
    canonical_url: string;
    description: string;
    main_image: string;
    published: boolean;
    tags: string[];
    title: string;
  };
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
      console.error(new Error("No Ghost payload received."));
      return "";
    }
    const ghostBlogPost = ghostPayload.post.current;
    await publishToDevto({
      article: {
        body_markdown: turndownService.turndown(ghostBlogPost.html),
        canonical_url: ghostBlogPost.url.replace("blog.mikenikles.com", "www.mikenikles.com/blog"),
        description: ghostBlogPost.custom_excerpt,
        main_image: ghostBlogPost.feature_image,
        published: false,
        tags: (ghostBlogPost.tags || []).map((tag: { name: string; }) => tag.name.replace(" ", "").toLowerCase()),
        title: ghostBlogPost.title,
      },
    });
  } catch (error) {
    console.error(error.response.body);
  }
  return "";
};

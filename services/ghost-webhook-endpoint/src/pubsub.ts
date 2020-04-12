import { PubSub } from "@google-cloud/pubsub";

const pubsub = new PubSub();

export const publishMessage = async (message: {}) => {
  try {
    const messageId = await pubsub
      .topic("ghost-new-posts")
      .publish(Buffer.from(JSON.stringify(message)));
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(new Error(`Message could not be published due to: ${error}`));
  }
};

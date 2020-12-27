import posts from "./_posts.js";

export default posts.filter(p => p.metadata.type === 'event')
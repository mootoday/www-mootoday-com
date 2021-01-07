import fs from "fs";
import frontMatter from "front-matter";
import readingTime from "reading-time";

export default (() => {
	const generatePost = (dirent, post_type_dir) => {
		const postContent = fs.readFileSync(
				`${post_type_dir}/${dirent.name}/index.svx`,
				{
					encoding: "utf-8",
				}
		);
		const postFrontMatter = frontMatter(postContent);

		return {
			metadata: {
				...postFrontMatter.attributes,
				readingTime: readingTime(postFrontMatter.body),
			},
		};
	};

	const getAllPosts = (post_type_dir) => {
		const names = fs.readdirSync(post_type_dir, { withFileTypes: true });
		return names
				.filter((dirent) => dirent.isDirectory())
				.map(dirent => generatePost(dirent, post_type_dir))
				.sort((a, b) =>
						a.metadata.createdAt > b.metadata.createdAt
								? -1
								: a.metadata.createdAt < b.metadata.createdAt
								? 1
								: 0
				);
	}
	return {
		getAllPosts
	}
})()
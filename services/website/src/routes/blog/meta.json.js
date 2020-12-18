import tags from './_tags'
import authors from './_authors'
import categories from './_category'

export const get = (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json",
	});
	const result = {
		tags,
		authors,
		categories
	}
	res.end(JSON.stringify(result));
};

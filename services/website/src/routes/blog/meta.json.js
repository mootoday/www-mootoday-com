import tags from './_tags'

export const get = (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json",
	});
	const result = {
		tags
	}
	res.end(JSON.stringify(result));
};

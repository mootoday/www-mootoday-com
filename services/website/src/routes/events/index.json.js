import events from "./_posts";

export const get = (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json",
	});
	const result = {
		events
	}
	res.end(JSON.stringify(result));
};

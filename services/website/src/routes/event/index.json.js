import events from "./_events";

export const get = (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json",
	});
	const result = {
		events
	}
	res.end(JSON.stringify(result));
};

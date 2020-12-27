import events from "../blog/_events.js";
console.log('posts', events)

export const get = (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json",
	});
	const result = {
		events
	}
	res.end(JSON.stringify(result));
};

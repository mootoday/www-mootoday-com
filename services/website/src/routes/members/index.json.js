import members from "../blog/_members.js";

export const get = (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json",
	});
	const result = {
		members
	}
	res.end(JSON.stringify(result));
};

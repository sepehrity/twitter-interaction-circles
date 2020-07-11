const fs = require("fs");
const {username, circles_count} = require("./env");
/**
 * Generate an text version of the circle data with the names of the users that are presented in the image
 * @param data
 * @returns {Promise<void>}
 */
async function renderText(data) {
	let output = "";

	// loop over each layer and add a header for the current one
	for (let i = 1; i < Number(circles_count); i++) {
		const layer = data[i - 1];
		output += "---- Circle " + i + " ---- \n";

		// For each user add a line with the username
		for (const user of layer) {
			output += "@" + user.screen_name + "\n";
		}

		output += "\n";
	}

	// output everything in a users file
	fs.writeFileSync(`${username} [${circles_count}].txt`, output);
}

module.exports = {renderText};

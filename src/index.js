const getInteractions = require("./data");
const render = require("./image");
const {getUser} = require("./api");
const {renderText} = require("./text");
const Twitter = require("twitter-lite");

// Load the environment variables from the .env file
const {
	consumer_key,
	consumer_secret,
	username,
	circles_count,
	text,
} = require("./env");

const {templates} = require("./constants");

/**
 * This is the main function of the app. It need to be a function because we can't have a top level await.
 */
async function main() {
	// Create an instance of the API client using the consumer keys for your app
	const client = new Twitter({
		consumer_key,
		consumer_secret,
	});

	// Use the previous client to fetch the bearer token
	// This method gives you an application-only token specifically for read-only access to public information.
	const bearer = await client.getBearerToken();

	// Create a new twitter client with this token.
	// We assign this client to a global variable so we can access it in the api module
	globalThis.TwitterClient = new Twitter({
		bearer_token: bearer.access_token,
	});

	// fetch the information of the logged in user
	// instead of getMe you could replace it with another method to get a third user to generate their circles
	const user = await getUser(username);

	// this is make how many circle layers we will have
	const circles = templates.slice(0, circles_count);

	// this is how many users we will have for each layer from the inside out
	const layers = circles.map((c) => c.count);
	// fetch the interactions
	const data = await getInteractions(user.screen_name.toLowerCase(), layers);

	// fill circles with users data
	const outerLayers = circles.map(({count, distance, radius}, index) => {
		return {distance, count, radius, users: data[index]};
	});

	// render the image
	await render([
		{distance: 0, count: 1, radius: 220, users: [user]},
		...outerLayers,
	]);

	// Look at the arguments passed to the cli. If one of them is --text then we want to render a text version of the image too
	if (text) await renderText(data);
}

// entry point
main();

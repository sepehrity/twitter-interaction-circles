const dotenv = require("dotenv");

dotenv.config();

const variables = {
	consumer_key: "CONSUMER_KEY",
	consumer_secret: "CONSUMER_SECRET",
	screen_name: "SCREEN_NAME",
	circles_count: "CIRCLES_COUNT",
};

const consumer_key = process.env[variables.consumer_key];

if (!consumer_key || consumer_key === "") {
	throw new Error(`Please define ${variables.consumer_key} in .env`);
}

const consumer_secret = process.env[variables.consumer_secret];

if (!consumer_secret || consumer_secret === "") {
	throw new Error(`Please define ${variables.consumer_secret} in .env`);
}

const circles_count = process.env[variables.circles_count];

if (!circles_count || circles_count === "") {
	throw new Error(`Please define ${variables.circles_count} in .env`);
} else if (circles_count === "0" || Math.floor(circles_count) > 4) {
	throw new Error(`Your ${variables.circles_count} must be between 0 and 5`);
}

const screen_name = process.env[variables.screen_name];

if (!screen_name || screen_name === "") {
	throw new Error(`Please define ${variables.screen_name} in .env`);
}

module.exports = {consumer_key, consumer_secret, circles_count, screen_name};

const dotenv = require("dotenv");

dotenv.config();

const variables = {
	consumer_key: "CONSUMER_KEY",
	consumer_secret: "CONSUMER_SECRET",
	screen_name: "SCREEN_NAME",
};

const consumer_key = process.env[variables.consumer_key];

if (!consumer_key || consumer_key === "") {
	throw new Error(`Please define ${variables.consumer_key} in .env`);
}

const consumer_secret = process.env[variables.consumer_secret];

if (!consumer_secret || consumer_secret === "") {
	throw new Error(`Please define ${variables.consumer_secret} in .env`);
}

const screen_name = process.env[variables.screen_name];

if (!screen_name || screen_name === "") {
	throw new Error(`Please define ${variables.screen_name} in .env`);
}

module.exports = {consumer_key, consumer_secret, screen_name};

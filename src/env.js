const dotenv = require("dotenv");
const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");

dotenv.config();

const variables = {
	consumer_key: "CONSUMER_KEY",
	consumer_secret: "CONSUMER_SECRET",
	layers: "LAYERS",
	username: "USERNAME",
};

const optionDefinitions = [
	{
		name: "text",
		alias: "t",
		type: Boolean,
		defaultOption: false,
	},
	{name: "username", alias: "u", type: String},
	{name: "layers", alias: "l", type: Number},
];

const options = commandLineArgs(optionDefinitions);

const sections = [
	{
		header: "Twitter Interaction Circle",
		content: "Make interaction circles for Twitter.",
	},
	{
		header: "Options",
		optionList: [
			{
				name: "username",
				typeLabel: "{underline string}",
				description: "Twitter username",
				alias: "u",
			},
			{
				name: "layers",
				typeLabel: "{underline number}",
				description: "Count of circle layers (default: 3)",
				alias: "l",
			},
			{
				name: "text",
				typeLabel: "{underline boolean}",
				description:
					"Generate a text version of the image. (default: false)",
				alias: "t",
			},
		],
	},
];
const usage = commandLineUsage(sections);

console.log(usage);

const consumer_key = process.env[variables.consumer_key];

if (!consumer_key || consumer_key === "") {
	throw new Error(`Please define ${variables.consumer_key} in .env`);
}

const consumer_secret = process.env[variables.consumer_secret];

if (!consumer_secret || consumer_secret === "") {
	throw new Error(`Please define ${variables.consumer_secret} in .env`);
}

const circles_count = options.layers || 3;

if (circles_count === "0" || Math.floor(circles_count) > 6) {
	throw new Error("Layers must be between 0 and 6.");
}

const username = options.username;

if (!username || username === "") {
	throw new Error(
		`Please define ${variables.username} => yarn build -u username`
	);
}

const text = options.text;

module.exports = {consumer_key, consumer_secret, circles_count, username, text};

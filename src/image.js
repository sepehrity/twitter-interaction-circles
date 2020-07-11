const {createCanvas, loadImage} = require("canvas");
const fs = require("fs");

const {circles_count, username} = require("./env");
const {image_size, background_color} = require("./constants");

const toRad = (x) => x * (Math.PI / 180);

/**
 *
 * @param config is an array with 4 entries
 * Each entry is an object with the following properties:
 * distance: from the middle of the image to the middle of the circle at the current layer. The bigger the number, the further is the layer from the center
 * count: circles in the current layer
 * radius: of the circles in this layer
 * users: list of users to render in the format {avatar:string}
 * @returns {Promise<void>}
 */
module.exports = async function render(config) {
	const size = image_size[circles_count];
	const width = size;
	const height = size;

	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext("2d");

	// fill the background
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, width, height);

	// loop over the layers
	for (const [layerIndex, layer] of config.entries()) {
		console.log(`Drawing Layer ${layerIndex}`);

		const {count, radius, distance, users} = layer;
		const angleSize = 360 / count;

		// loop over each circle of the layer
		for (let i = 0; i < count; i++) {
			// We need an offset or the first circle will always on the same line and it looks weird
			// Try removing this to see what happens
			const offset = layerIndex * 25;

			// i * angleSize is the angle at which our circle goes
			// We need to converting to radiant to work with the cos/sin
			const r = toRad(i * angleSize + offset);

			const centerX = Math.cos(r) * distance + width / 2;
			const centerY = Math.sin(r) * distance + height / 2;

			// if we are trying to render a circle but we ran out of users, just exit the loop. We are done.
			if (!users[i]) break;

			ctx.save();
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			ctx.clip();

			const defaultAvatarUrl =
				"https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png";
			const avatarUrl = users[i].avatar || defaultAvatarUrl;

			const img = await loadImage(avatarUrl);
			ctx.drawImage(
				img,
				centerX - radius,
				centerY - radius,
				radius * 2,
				radius * 2
			);

			ctx.restore();
		}
	}

	// write the resulting canvas to file
	const out = fs.createWriteStream(`./${username} [${circles_count}].png`);
	const stream = canvas.createPNGStream();
	stream.pipe(out);
	out.on("finish", () => console.log("Done!"));
};

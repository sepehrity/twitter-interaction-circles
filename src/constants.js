const templates = [
	{count: 8, distance: 200, radius: 64}, // Layer 1
	{count: 15, distance: 330, radius: 58}, // Layer 2
	{count: 26, distance: 450, radius: 50}, // Layer 3
	{count: 41, distance: 550, radius: 40}, // Layer 4
];

const image_size = {
	1: 600,
	2: 800,
	3: 1000,
	4: 1200,
};

const background_color = "#ccc"

module.exports = {templates, image_size, background_color};

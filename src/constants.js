const templates = [
	{count: 10, distance: 350, radius: 100}, // Layer 1
	{count: 18, distance: 560, radius: 90},  // Layer 2
	{count: 30, distance: 750, radius: 74},  // Layer 3
	{count: 42, distance: 910, radius: 62},  // Layer 4
	{count: 58, distance: 1045, radius: 52}, // Layer 5
	{count: 72, distance: 1165, radius: 46}, // Layer 6
];

const image_size = {
	1: 910,
	2: 1310,
	3: 1700,
	4: 1950,
	5: 2250,
	6: 2500,
};

const background_color = "#ccc"

module.exports = {templates, image_size, background_color};

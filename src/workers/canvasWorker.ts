import { ICropColorsResponseType, IMessageType } from "./types";

let canvas: OffscreenCanvas | null = null;

function makeChunks<T = unknown>(array: Array<T>, size: number) {
	const currentArray = [...array];

	const chunked: Array<Array<T>> = [];

	while (currentArray.length > 0) chunked.push(currentArray.splice(0, size));

	return chunked;
}

function rgbaToHex(rgba: Array<number>) {
	return (
		"#" +
		rgba
			.map((number) => number.toString(16)) // Converts numbers to hex
			.map((string) => (string.length === 1 ? "0" + string : string)) // Adds 0 when length of one number is 1
			.join("")
	);
}

function drawImage(image: ImageBitmap) {
	const ctx = canvas?.getContext("2d");

	if (ctx) {
		ctx.drawImage(image, 0, 0);
	}
}

function resizeCanvas({ width, height }: { width: number; height: number }) {
	if (canvas) {
		canvas.width = width;
		canvas.height = height;
	}
}

function cropColors({
	x,
	y,
	radius,
}: {
	x: number;
	y: number;
	radius: number;
}) {
	const ctx = canvas?.getContext("2d");

	if (!ctx) return;

	const cropSize = radius * 2 + 1;

	const pickerColors = ctx.getImageData(
		x - radius,
		y - radius,
		cropSize,
		cropSize,
	);

	const pickedColorsArray = Array.from(pickerColors.data);

	const rgbaGroupedColors = makeChunks(
		makeChunks(pickedColorsArray, 4),
		cropSize,
	);

	const centerColor = rgbaGroupedColors[radius][radius];

	const centerColorHex = rgbaToHex(centerColor);

	self.postMessage({
		type: "r-cropColors",
		data: { centerColor: centerColorHex, colors: rgbaGroupedColors },
	} satisfies ICropColorsResponseType);
}

self.onmessage = ({ data: { type, data } }: MessageEvent<IMessageType>) => {
	if (type === "s-init") {
		canvas = data.canvas;
	}

	switch (type) {
		case "s-init":
			canvas = data.canvas;
			break;
		case "s-drawImage":
			drawImage(data.image);
			break;
		case "s-cropColors":
			cropColors(data);
			break;
		case "s-resize":
			resizeCanvas(data);
	}
};

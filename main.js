import { calculateCanvasSize, drawGrid } from "./modules/canvas_setup.js";

function setup() {
	frameRate(60);
	const { canvasWidth, canvasHeight } = calculateCanvasSize();
	createCanvas(canvasWidth, canvasHeight);
	background(240);
	drawGrid();
}

function draw() {
	// put drawing code here
}

function windowResized() {
	const { canvasWidth, canvasHeight } = calculateCanvasSize();
	resizeCanvas(canvasWidth, canvasHeight);
	background(240);
	drawGrid();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;

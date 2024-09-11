import CanvasHelper from "./modules/canvas_helper.js";
import { TeaPot } from "./modules/array_coded_puzzles.js";

let ch = new CanvasHelper(TeaPot, false);

function setup() {
	ch.createCanvas();
}

function draw() {}

function windowResized() {
	ch.resizeCanvas();
}

function mouseClicked() {
	ch.progressCellStates();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.mouseClicked = mouseClicked;

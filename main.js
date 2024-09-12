import CanvasHelper, { GameState } from "./modules/canvas_helper.js";
import { Test10by15 } from "./modules/array_coded_puzzles.js";

let ch = new CanvasHelper(Test10by15);

function setup() {
	ch.createCanvas();
}

function draw() {}

function windowResized() {
	ch.resizeCanvas();
}

function mouseClicked() {
	if (ch.gameState == GameState.FINISHED) return;
	ch.progressCellStates();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.mouseClicked = mouseClicked;

import CanvasHelper, { GameState } from "./modules/canvas_helper.js";
import Puzzle from "./modules/puzzle.js";

const puzzle = await fetch("http://127.0.0.1:8000/nonogram")
	.then((response) => response.json())
	.then((json) => {
		return new Puzzle(json.nonogram);
	});

let ch = new CanvasHelper(puzzle);

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

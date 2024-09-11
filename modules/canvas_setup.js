import { Squirrel } from "./array_coded_puzzles.js";

const gridLineWidth = 2;
const margins = Math.max(window.innerHeight, window.innerWidth) * 0.02;

export function calculateCanvasSize() {
	const canvasWidth = window.innerWidth - 2 * margins;
	const canvasHeight = window.innerHeight - 2 * margins;
	return { canvasWidth, canvasHeight };
}

export function drawGrid() {
	const puzzle = Squirrel;
	const numGridRows = puzzle.numRows + puzzle.maxColSize;
	const numGridCols = puzzle.numCols + puzzle.maxRowSize;
	const gridWidthProportion = window.innerWidth / numGridCols;
	const gridHeightProportion = window.innerHeight / numGridRows;
	const minDim =
		gridWidthProportion < gridHeightProportion
			? window.innerWidth
			: window.innerHeight;
	const numCells =
		gridWidthProportion < gridHeightProportion ? numGridCols : numGridRows;
	const squareWidth =
		(minDim - 2 * margins - (numCells + 1) * gridLineWidth) / numCells;
	strokeWeight(gridLineWidth);
	const gridHeight = numGridRows * (squareWidth + gridLineWidth);
	const gridWidth = numGridCols * (squareWidth + gridLineWidth);
	for (let i = 0; i <= numGridRows; i++) {
		line(
			gridLineWidth / 2 + (squareWidth + gridLineWidth) * i,
			gridLineWidth / 2,
			gridLineWidth / 2 + (squareWidth + gridLineWidth) * i,
			gridHeight
		);
	}
	for (let i = 0; i <= numGridCols; i++) {
		line(
			gridLineWidth / 2,
			gridLineWidth / 2 + (squareWidth + gridLineWidth) * i,
			gridWidth,
			gridLineWidth / 2 + (squareWidth + gridLineWidth) * i
		);
	}
}

export const GameState = Object.freeze({
	NOTSTARTED: 0,
	INPROGRESS: 1,
	FINISHED: 2,
});

export default class CanvasHelper {
	gridLineWidth;
	offset;
	margins;
	numGridRows;
	numGridCols;
	gridWidthProportion;
	gridHeightProportion;
	minDim;
	numCells;
	squareWidth;
	cellWidth;
	gridHeight;
	gridWidth;
	cellStates;
	canvasWidth;
	canvasHeight;
	gameState;
	puzzle;

	constructor(puzzle) {
		this.gameState = GameState.INPROGRESS; // change to NOTSTARTED when implementing start
		this.gridLineWidth = 2;
		this.puzzle = puzzle;
		this.offset = this.gridLineWidth / 2;
		this.numGridRows = puzzle.numRows;
		this.numGridCols = puzzle.numCols;
		this.cellStates = Array(puzzle.numRows)
			.fill(null)
			.map(() => Array(puzzle.numCols).fill(0));
		this._calcCanvasDims();
	}

	_calcCanvasDims() {
		this.margins = Math.floor(window.innerHeight * 0.02);
		this.canvasWidth = window.innerWidth - 2 * this.margins;
		this.canvasHeight = window.innerHeight - 2 * this.margins;
		this.gridWidthProportion = window.innerWidth / this.numGridCols;
		this.gridHeightProportion = window.innerHeight / this.numGridRows;
		this.minDim =
			this.gridWidthProportion < this.gridHeightProportion
				? window.innerWidth
				: window.innerHeight;
		this.numCells =
			this.gridWidthProportion < this.gridHeightProportion
				? this.numGridCols
				: this.numGridRows;
		this.squareWidth = Math.floor(
			(this.minDim -
				2 * this.margins -
				(this.numCells + 2) * this.gridLineWidth) /
				this.numCells
		);
		this.cellWidth = this.squareWidth + this.gridLineWidth;
		this.gridHeight = this.numGridRows * this.cellWidth;
		this.gridWidth = this.numGridCols * this.cellWidth;
	}

	_drawGrid() {
		strokeWeight(this.gridLineWidth);
		this.cellStates.forEach((row, y) => {
			row.forEach((_, x) => {
				this._drawCell(y, x, true);
			});
		});
	}

	_drawCell(cellRow, cellCol, drawAsIs) {
		const cellState = this.cellStates[cellRow][cellCol];
		switch ((cellState + (drawAsIs ? 0 : 1)) % 3) {
			case 0: // draw a blank cell
				fill(255);
				square(
					this.offset + cellCol * this.cellWidth,
					this.offset + cellRow * this.cellWidth,
					this.cellWidth
				);
				break;
			case 1: // fill in the cell
				fill(0);
				square(
					this.offset + cellCol * this.cellWidth,
					this.offset + cellRow * this.cellWidth,
					this.cellWidth
				);
				break;
			case 2: // draw an x
				fill(255);
				square(
					this.offset + cellCol * this.cellWidth,
					this.offset + cellRow * this.cellWidth,
					this.cellWidth
				);
				line(
					this.offset +
						cellCol * this.cellWidth +
						this.gridLineWidth * 2,
					this.offset +
						cellRow * this.cellWidth +
						this.gridLineWidth * 2,
					this.offset +
						(cellCol + 1) * this.cellWidth -
						this.gridLineWidth * 2,
					this.offset +
						(cellRow + 1) * this.cellWidth -
						this.gridLineWidth * 2
				);
				line(
					this.offset +
						cellCol * this.cellWidth +
						this.gridLineWidth * 2,
					this.offset +
						(cellRow + 1) * this.cellWidth -
						this.gridLineWidth * 2,
					this.offset +
						(cellCol + 1) * this.cellWidth -
						this.gridLineWidth * 2,
					this.offset +
						cellRow * this.cellWidth +
						this.gridLineWidth * 2
				);
				break;
		}
		if (!drawAsIs) {
			this.cellStates[cellRow][cellCol] = (cellState + 1) % 3;
		}
	}

	createCanvas() {
		createCanvas(this.canvasWidth, this.canvasHeight);
		background(255);
		this._drawGrid();
	}

	resizeCanvas() {
		this._calcCanvasDims();
		resizeCanvas(this.canvasWidth, this.canvasHeight);
		background(255);
		this._drawGrid();
	}

	progressCellStates() {
		const mx = window.winMouseX;
		const my = window.winMouseY;
		if (mx > this.gridWidth || my > this.gridHeight) return;
		const cellRow = Math.floor(my / this.cellWidth);
		const cellCol = Math.floor(mx / this.cellWidth);
		this._drawCell(cellRow, cellCol, false);
		if (this._isGameWon()) this.gameState = GameState.FINISHED;
	}

	_isGameWon() {
		let sol = this.puzzle.solution;
		let state = this.cellStates;

		for (let i = 0; i < sol.length; i++) {
			for (let j = 0; j < sol[0].length; j++) {
				if (
					!(
						(sol[i][j] == 0 && state[i][j] == 2) ||
						sol[i][j] == state[i][j]
					)
				)
					return false;
			}
		}

		return true;
	}
}

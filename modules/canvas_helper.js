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

	constructor(puzzle, drawBoxesForNumbers) {
		this.gridLineWidth = 2;
		this.offset = this.gridLineWidth / 2;
		this.numGridRows =
			puzzle.numRows + (drawBoxesForNumbers ? puzzle.maxColSize : 0);
		this.numGridCols =
			puzzle.numCols + (drawBoxesForNumbers ? puzzle.maxRowSize : 0);
		this.cellStates = Array(puzzle.numCols)
			.fill(null)
			.map(() => Array(puzzle.numRows).fill(0));
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
		this.cellStates.forEach((col, x) => {
			col.forEach((_, y) => {
				this._drawCell(x, y, true);
			});
		});
	}

	_drawCell(cellRow, cellCol, drawAsIs) {
		const cellState = this.cellStates[cellRow][cellCol];
		switch ((cellState + (drawAsIs ? 0 : 1)) % 3) {
			case 0: // draw a blank cell
				fill(255);
				square(
					this.offset + cellRow * this.cellWidth,
					this.offset + cellCol * this.cellWidth,
					this.cellWidth
				);
				break;
			case 1: // fill in the cell
				fill(0);
				square(
					this.offset + cellRow * this.cellWidth,
					this.offset + cellCol * this.cellWidth,
					this.cellWidth
				);
				break;
			case 2: // draw an x
				fill(255);
				square(
					this.offset + cellRow * this.cellWidth,
					this.offset + cellCol * this.cellWidth,
					this.cellWidth
				);
				line(
					this.offset +
						cellRow * this.cellWidth +
						this.gridLineWidth * 2,
					this.offset +
						cellCol * this.cellWidth +
						this.gridLineWidth * 2,
					this.offset +
						(cellRow + 1) * this.cellWidth -
						this.gridLineWidth * 2,
					this.offset +
						(cellCol + 1) * this.cellWidth -
						this.gridLineWidth * 2
				);
				line(
					this.offset +
						(cellRow + 1) * this.cellWidth -
						this.gridLineWidth * 2,
					this.offset +
						cellCol * this.cellWidth +
						this.gridLineWidth * 2,
					this.offset +
						cellRow * this.cellWidth +
						this.gridLineWidth * 2,
					this.offset +
						(cellCol + 1) * this.cellWidth -
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
		const cellRow = Math.floor(mx / this.cellWidth);
		const cellCol = Math.floor(my / this.cellWidth);
		this._drawCell(cellRow, cellCol, false);
	}
}

export default class Puzzle {
	rowsArray;
	colsArray;
	numRows;
	numCols;
	maxRowSize;
	maxColSize;

	constructor(rowsArray, colsArray) {
		this.rowsArray = rowsArray;
		this.colsArray = colsArray;
		this.numRows = rowsArray.length;
		this.numCols = colsArray.length;
		this.maxRowSize = rowsArray.reduce(
			(acc, curr) => Math.max(acc, curr.length),
			0
		);
		this.maxColSize = rowsArray.reduce(
			(acc, curr) => Math.max(acc, curr.length),
			0
		);
	}
}

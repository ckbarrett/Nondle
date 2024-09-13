export default class Puzzle {
	solution;
	rowHints;
	colHints;
	maxRowSize;
	maxColSize;

	constructor(solution) {
		this.solution = solution;
		this.numRows = this.solution.length;
		this.numCols = this.solution[0].length;
		this._calcHints();
		this.maxRowSize = this.rowHints.reduce(
			(acc, curr) => Math.max(acc, curr.length),
			0
		);
		this.maxColSize = this.colHints.reduce(
			(acc, curr) => Math.max(acc, curr.length),
			0
		);
	}

	_calcHints() {
		this.rowHints = [];
		this.colHints = [];
		this.solution.forEach((row) => {
			let count = 0;
			let hintArr = [];
			row.forEach((val) => {
				if (val == 0) {
					if (count != 0) {
						hintArr.push(count);
						count = 0;
					}
				} else {
					count += 1;
				}
			});
			if (count != 0) hintArr.push(count);
			this.rowHints.push(hintArr.length == 0 ? [0] : hintArr);
		});
		for (let i = 0; i < this.numCols; i++) {
			let count = 0;
			let hintArr = [];
			for (let j = 0; j < this.numRows; j++) {
				let val = this.solution[j][i];
				if (val == 0) {
					if (count != 0) {
						hintArr.push(count);
						count = 0;
					}
				} else {
					count += 1;
				}
			}
			if (count != 0) hintArr.push(count);
			this.colHints.push(hintArr.length == 0 ? [0] : hintArr);
		}
	}
}

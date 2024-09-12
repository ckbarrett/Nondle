export default class Puzzle {
	solution;
	constructor(solution) {
		this.solution = solution;
		this.numRows = this.solution.length;
		this.numCols = this.solution[0].length;
	}
}

import Puzzle from "./puzzle.js";

let test10by15 = Array(10)
	.fill(null)
	.map(() => Array(15).fill(0));

test10by15[0][1] = 1;
test10by15[0][2] = 1;
test10by15[0][4] = 1;
test10by15[4][14] = 1;
test10by15[3][14] = 1;

export const Test10by15 = new Puzzle(test10by15);

/*
// Squirrel
const squirrelRows = [
	[3],
	[4, 2, 1],
	[3, 1, 1, 1],
	[3, 1, 2, 1],
	[2, 1, 2],
	[4, 2, 2],
	[2, 2, 2],
	[1, 3, 1],
	[2, 2, 1],
	[4, 3],
	[1, 1, 2, 2],
	[1, 1, 1],
	[1, 1, 1],
	[5, 2],
	[3, 2, 3],
];

const squirrelCols = [
	[2],
	[3],
	[1, 1],
	[1, 1, 2, 1],
	[2, 2, 1, 1],
	[2, 6, 2],
	[1, 2, 2],
	[1, 3, 2],
	[3, 2, 5],
	[2, 1, 1],
	[1, 1],
	[4, 2, 1],
	[2, 2, 2, 2],
	[1, 1, 2, 5],
	[2, 5],
];

// Tea pot
const teaPotRows = [
	[1],
	[3],
	[1, 2],
	[7],
	[5],
	[2, 2],
	[1, 2, 4],
	[2, 5, 2],
	[3, 8, 1],
	[2, 8, 1],
	[2, 2, 3, 1],
	[2, 2, 3, 1],
	[3, 2, 3, 1],
	[6, 3, 2],
	[5, 3, 1],
	[4, 3, 1],
	[3, 4],
	[3, 4],
	[9],
	[7],
];
const teaPotCols = [
	[2],
	[8],
	[7],
	[4],
	[6],
	[1, 2, 12],
	[18],
	[1, 2, 3, 2],
	[2, 2, 4, 2],
	[4, 14],
	[18],
	[1, 2, 12],
	[2, 3],
	[1, 3],
	[7],
];

export const Squirrel = new Puzzle(squirrelRows, squirrelCols);
export const TeaPot = new Puzzle(teaPotRows, teaPotCols);*/

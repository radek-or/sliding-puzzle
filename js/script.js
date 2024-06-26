const gameTiles = document.querySelectorAll(".tile");
// console.log(gameTiles)

const gameBoard = document.querySelector("#game-board");
// console.log(gameBoard);

const gameState = [
	[gameTiles[0], gameTiles[1], gameTiles[2]],
	[gameTiles[3], gameTiles[4], gameTiles[5]],
	[gameTiles[6], gameTiles[7], gameTiles[8]],
];

function render(gameBoard, gameState) {
	gameState.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			column.style.top = `${rowIndex * 100}px`;
			column.style.left = `${columnIndex * 100}px`;

			column.style.backgroundPositionY = `-${rowIndex * 100}px`;
			column.style.backgroundPositionX = `-${columnIndex * 100}px`;

			gameBoard.appendChild(column);
		});
	});
}

function moveElement(element1, element2) {
	const tempTop = element1.style.top;
	const tempLeft = element1.style.left;

	element1.style.top = element2.style.top;
	element1.style.left = element2.style.left;

	element2.style.top = tempTop;
	element2.style.left = tempLeft;
}

render(gameBoard, gameState);

gameBoard.addEventListener("click", (event) => {
	// console.log('Click')
	const target = event.target;
	// console.log(target)

	let x, y;

	gameState.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			if (column === target) {
				x = rowIndex;
				y = columnIndex;
			}
		});
	});
	let emptyX, emptyY;

	gameState.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			if (column.innerText === "") {
				emptyX = rowIndex;
				emptyY = columnIndex;
			}
		});
	});

	// console.log(x, y);
	// console.log(emptyX, emptyY);

	if (
		(y === emptyY && (x + 1 === emptyX || x - 1 === emptyX)) ||
		(x === emptyX && (y + 1 === emptyY || y - 1 === emptyY))
	) {
		moveElement(gameState[x][y], gameState[emptyX][emptyY]);
		const temp = gameState[x][y];
		gameState[x][y] = gameState[emptyX][emptyY];
		gameState[emptyX][emptyY] = temp;
	}
});


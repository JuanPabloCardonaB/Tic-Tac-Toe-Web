const statusText = document.getElementById('status') 
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.restartButton');
const winConditon = [
    [0, 1, 2], //row
    [3, 4, 5], //row
    [6, 7, 8], //row
    [0, 4, 8], //diagonal
    [2, 4, 6], //diagonal
    [0, 3, 6], //column
    [1, 4, 7], //column
    [2, 5, 8] //column
];

let options = ["", "", "", "", "", "", "", "", ""]; //valid options to mark in the board
let currentPlayer = 'X';
let runningGame = false;

runGame();

function runGame() {

    cells.forEach(cell => cell.addEventListener('click', cellClicked)) //adding click event listener for each cell and then a callback to cellClicked function
    restartButton.addEventListener("click", restartGame); //adding click event listener to restart button and then a callback to restarGame function
    statusText.textContent = `${currentPlayer}'s turn`;
    runningGame = true;
}

function cellClicked() {

    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !runningGame) {

        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;

}

function checkWinner() {

    let roundWon = false;

    for( let i = 0; i < winConditon.length; i++) {

        const condition = winConditon[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }   
    }

    if (roundWon) {

        statusText.textContent = `${currentPlayer}' wins`;
        runningGame = false

    }

    else if (!options.includes("")) {

        statusText.textContent = `Draw!!`;
        runningGame = false;
    }

    else{

        changePlayer();
    }
    
}

function restartGame() {

    currentPlayer = 'X';
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    runningGame = true;

}


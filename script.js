const gameboard = (function () {

    const gameboard = [".", ".", ".", ".", ".", ".", ".", ".", "."];

    return { gameboard };
})();

const playerFactory = (name, symbol) => {

    let myTurn = false;
    let shift = 0;
    let mySymbol = symbol;
    const getShift = () => shift;
    const incrementShift = () => { ++shift; };
    const getSymbol = () => mySymbol;
    const positionSymbol = (position) => {
        if(gameboard.gameboard[position] === ".") {
            gameboard.gameboard[position] = mySymbol;
            return true;
        }
            return false;
    };
    const setTurn = (bool) => myTurn = bool;

    return { name, getShift, getSymbol, positionSymbol, setTurn };
};

const displayController = (function () {

    const player_1 = playerFactory("Mario", "X");
    const player_2 = playerFactory("Laura", "O");

    let turn = player_1; 
    renderPlaying(); 

    namePlayer = (player_1, player_2) => {
        document.querySelector(".player_1").textContent = player_1.name;
        document.querySelector(".player_2").textContent = player_2.name;
    };

    function renderBoard(positions) {

        let row_1 = document.querySelector(".row_1");
        let row_2 = document.querySelector(".row_2");
        let row_3 = document.querySelector(".row_3");

        row_1.firstElementChild.textContent = positions[0];
        row_1.childNodes[3].textContent = positions[1];
        row_1.lastElementChild.textContent = positions[2];

        row_2.firstElementChild.textContent = positions[3];
        row_2.childNodes[3].textContent = positions[4];
        row_2.lastElementChild.textContent = positions[5];

        row_3.firstElementChild.textContent = positions[6];
        row_3.childNodes[3].textContent = positions[7];
        row_3.lastElementChild.textContent = positions[8];

    }

    function renderPlaying() {
        const divPlaying = document.querySelector(".playing");
        const msg = `${turn.name} is your shift`;
        divPlaying.textContent = msg;
    }

    let boxes = document.querySelectorAll("[data-index]");
    for(let box of boxes) {
        box.addEventListener("click", playShift);   
    }

    function playShift(event) {
        
        let position = event.target.dataset.index;
                
        if (moveAvailable) { //&& !isWinner(turn.getSymbol())
            let bool = turn.positionSymbol(position);
            if (!bool) return;
        }

        renderBoard(gameboard.gameboard);

        if ( isWinner(turn.getSymbol()) ) {
            gameOver(true);
        } 
        else if(moveAvailable()) {
            swapPlayer();
        }
        else {
            gameOver(false);
        }   
        
    }

    function isWinner(c) {
        const tris = c + c + c;
        const arr = gameboard.gameboard;

        // rows
        let row = arr[0] + arr[1] + arr[2];
        if(row === tris) return true;
        row = arr[3] + arr[4] + arr[5];
        if(row === tris) return true;
        row = arr[6] + arr[7] + arr[8];
        if(row === tris) return true;

        // columns
        let column = arr[0] + arr[3] + arr[6];
        if(column === tris) return true;
        column = arr[1] + arr[4] + arr[7];
        if(column === tris) return true;
        column = arr[2] + arr[5] + arr[8];
        if(column === tris) return true;

        // diagonals
        let diagonal = arr[0] + arr[4] + arr[8];
        if(diagonal === tris) return true;
        diagonal = arr[2] + arr[4] + arr[5];
        if(diagonal === tris) return true;

        return false;
    }

    function swapPlayer() {
        if(turn === player_1) turn = player_2
        else    
            turn = player_1;
        renderPlaying();
    }

    function moveAvailable() {
        return gameboard.gameboard.some( box => box === ".");
    }

    function gameOver(winner) {
        for(let box of boxes) {
            box.removeEventListener("click", playShift);
        }

        const divGameOver = document.querySelector(".gameOver");
        const msg = winner ? `The winner is ${turn.name}` : `nobody wins`;
        divGameOver.textContent = msg;
    }


    return { renderBoard, player_1, player_2, namePlayer };
})();

displayController.namePlayer(displayController.player_1, displayController.player_2);

displayController.renderBoard(gameboard.gameboard);
const generateGameComponent = function () {
    
    let board = [
        [" ", " ", " "], 
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    let turn = 1;


    
    let checkWinRows = function(playerMove) {
        let check;
        for (let i = 0; i < 3; i++) {
            check = 0;
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === playerMove) {
                    check++;
                }
            }
            if(check === 3) {
                return true;
            }
        }
        return false;
    }

    let checkWinCollums = function(playerMove) {
        let check;
        for (let i = 0; i < 3; i++) {
            check = 0;
            for (let j = 0; j < 3; j++) {
                if (board[j][i] === playerMove) {
                    check++;
                }
            }
            if(check === 3) {
                return true;
            }
        }
        return false;
    }

    let checkWinDiagonal = function(playerMove) {
        if (board[0][0] === playerMove && board[1][1] === playerMove && board[2][2] === playerMove || board[2][0] === playerMove && board[1][1] === playerMove && board[0][2] === playerMove) {
            return true;
        }
        return false;
    }

    return {
        playRound : function(x, y) {
            if (board[x][y] === " ") {
                if (turn%2!==0) {
                    board[x][y] = "x";
                    if (checkWinCollums("x") && checkWinRows("x") && checkWinDiagonal("x")) {
                        return "x"
                    }
                } else {
                    board[x][y] = "o";
                    if (checkWinCollums("o") && checkWinRows("o") && checkWinDiagonal("o")) {
                        return "o"
                    }
                }
            } 
            turn++
            return undefined
        },
        getBoard : function () {
            let formatBoard = "     |     |      \n  " + board[0][0] + "  |  " + board[0][1] + "  |  " + board[0][2] + "  \n_____|_____|_____\n     |     |      \n  " + board[1][0] + "  |  " + board[1][1] + "  |  " + board[1][2] + "  \n     |     |      \n_____|_____|_____\n     |     |      \n  " + board[2][0] + "  |  " + board[2][1] + "  |  " + board[2][2] + "  \n     |     |      "
            return formatBoard;
        }
    }
}

export default generateGameComponent;
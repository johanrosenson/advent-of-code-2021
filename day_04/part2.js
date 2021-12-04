require('../array');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    // .map((input) => parseInt(input))

const numbers = input.shift().split(',').map(n=>parseInt(n));

let boards = [];

const parseBoardRow = function (row) {
    return row.split(/\s+/g)
        .filter(function (cell) {
            return cell !== '';
        })
        .map(function (cell) {
            return parseInt(cell);
        });
};

for (let i = 0; i < input.length; i+=6) {
    const board = [
        parseBoardRow(input[i+1]),
        parseBoardRow(input[i+2]),
        parseBoardRow(input[i+3]),
        parseBoardRow(input[i+4]),
        parseBoardRow(input[i+5]),
    ];

    boards.push(board);
}

const checkNumbers = function (numbersDrawn, numbers) {
    for (let i = 0; i < numbers.length; i++) {
        if (! numbersDrawn.includes(numbers[i])) {
            return false;
        }
    }

    return true;
};

const isWinner = function (numbersDrawn, board) {
    // check rows
    for (let i = 0; i < 5; i++) {
        const numbers = board[i];

        if (checkNumbers(numbersDrawn, numbers)) {
            return true;
        }
    }

    // check columns
    for (let i = 0; i < 5; i++) {
        const numbers = [
            board[0][i],
            board[1][i],
            board[2][i],
            board[3][i],
            board[4][i],
        ];

        if (checkNumbers(numbersDrawn, numbers)) {
            return true;
        }
    }

    return false;
};

const findWinningBoard = function (numbersDrawn, boards) {
    return boards.find(function (board) {
        return isWinner(numbersDrawn, board);
    });
};

const calculateScore = function (board, numbersDrawn, lastNumberDrawn) {
    const unmarkedNumbers = [
        ...board[0],
        ...board[1],
        ...board[2],
        ...board[3],
        ...board[4],
    ].filter(function (number) {
        return ! numbersDrawn.includes(number);
    });

    return unmarkedNumbers.sum() * lastNumberDrawn;
};

let numbersDrawn = [];

const winners = [];

for (let i = 0; i < numbers.length; i++) {
    const numberDrawn = numbers[i];

    numbersDrawn.push(numbers[i]);

    while (true) {
        let winningBoard = findWinningBoard(numbersDrawn, boards);

        if (winningBoard) {
            winners.push([winningBoard, [...numbersDrawn], numberDrawn]);

            boards = boards.filter(function (board) {
                return board !== winningBoard;
            });
        } else {
            break;
        }
    }

    if (boards.length === 0) {
        break;
    }
}

const [lastWinningBoard, lastNumbersDrawn, lastNumberDrawn] = winners.pop();

const score = calculateScore(lastWinningBoard, lastNumbersDrawn, lastNumberDrawn);

console.log(score);

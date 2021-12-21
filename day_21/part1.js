require('../array');

console.time('part1');

const fs = require('fs');

const [start1, start2] = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    .map(str => parseInt(str.substring(str.lastIndexOf(' ') + 1)))

let nextDiceRoll = 1;

const boardSize = 10;

const roll = function () {
    const currentRoll = nextDiceRoll;

    nextDiceRoll = nextDiceRoll === 100
        ? 1
        : nextDiceRoll + 1;

    return currentRoll;
};

const move = function (position, steps) {
    const endPosition = position + steps;

    if ((endPosition % boardSize) === 0) {
        return boardSize;
    }

    return endPosition % boardSize;
};

let player = 0;
let scores = [0, 0];
let players = [start1, start2];

let totalRolls = 0;

while (scores.max() < 1000) {
    const rolls = [
        roll(),
        roll(),
        roll(),
    ];

    const sum = rolls.sum();

    totalRolls += rolls.length;

    players[player] = move(players[player], sum);
    scores[player] += players[player];

    player = (player + 1) % players.length;
}

const [winner, loser] = players[0] > players[1]
    ? [scores[0], scores[1]]
    : [scores[1], scores[0]];

const answer = loser * totalRolls;

console.log({answer});

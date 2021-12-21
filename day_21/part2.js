require('../array');

console.time('part2');

const fs = require('fs');

const [start1, start2] = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    .map(str => parseInt(str.substring(str.lastIndexOf(' ') + 1)))

const boardSize = 10;

const move = function (position, steps) {
    const endPosition = position + steps;

    if ((endPosition % boardSize) === 0) {
        return boardSize;
    }

    return endPosition % boardSize;
};

const winningScore = 21;

const memory = new Map;

let runs = 0;

// should return number of wins per player
const play = function (player, positions, scores) {
    const state = player + ':' + positions.join('-') + ':' + scores.join('-');

    if (scores[0] >= 21) {
        return [1, 0];
    } else if (scores[1] >= 21) {
        return [0, 1];
    } else if (memory.has(state)) {
        return memory.get(state);
    }

    runs++;

    const wins = [0, 0];

    for (const d1 of range(1, 3)) {
        for (const d2 of range(1, 3)) {
            for (const d3 of range(1, 3)) {
                const sum = d1 + d2 + d3;

                const newPositions = [...positions];
                const newScores = [...scores];

                newPositions[player] = move(newPositions[player], sum);
                newScores[player] += newPositions[player];

                const newWins = play(
                    player === 1 ? 0 : 1,
                    newPositions,
                    newScores,
                );

                wins[0] += newWins[0];
                wins[1] += newWins[1];
            }
        }
    }

    memory.set(state, wins);

    return wins;
};

const wins = play(0, [start1, start2], [0, 0]);

console.log({wins, runs});

console.log(wins.max());

console.timeEnd('part2');

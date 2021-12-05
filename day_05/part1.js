require('../array');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8')
    .split('\n')

const grid = [];

input.forEach(function (line) {
    const [start, end] = line.split(' -> ');
    const [x1, y1] = start.split(',').map(n=>parseInt(n));
    const [x2, y2] = end.split(',').map(n=>parseInt(n));

    if (x1 === x2) {
        let x = x1;

        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            if (typeof grid[y] === 'undefined') {
                grid[y] = [];
            }

            grid[y][x] = typeof grid[y][x] !== 'undefined'
                ? grid[y][x] + 1
                : 1;
        }
    } else if (y1 === y2) {
        let y = y1;

        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            if (typeof grid[y] === 'undefined') {
                grid[y] = [];
            }

            grid[y][x] = typeof grid[y][x] !== 'undefined'
                ? grid[y][x] + 1
                : 1;
        }
    }
});

let answer = 0;

grid.forEach(function (row) {
    const danger = row.filter(function (cell) {
        return cell > 1;
    });

    answer += danger.length;
});

console.log(answer);

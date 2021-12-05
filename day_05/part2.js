require('../array');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8')
    .split('\n')

const grid = [];

input.forEach(function (line) {
    const [start, end] = line.split(' -> ');
    const [x1, y1] = start.split(',').map(n=>parseInt(n));
    const [x2, y2] = end.split(',').map(n=>parseInt(n));

    const [yrange, xrange] = ((x1, y1, x2, y2) => {
        if (x1 === x2) {
            const yrange = range(y1, y2);
            const xrange = Array(yrange.length).fill(x1);

            return [
                yrange,
                xrange,
            ];
        } else if (y1 === y2) {
            const xrange = range(x1, x2);
            const yrange = Array(xrange.length).fill(y1);

            return [
                yrange,
                xrange,
            ];
        } else {
            const yrange = range(y1, y2);
            const xrange = range(x1, x2);

            return [
                yrange,
                xrange,
            ];
        }
    })(x1, y1, x2, y2);

    while ((y = yrange.shift()) !== undefined) {
        let x = xrange.shift();

        if (typeof grid[y] === 'undefined') {
            grid[y] = [];
        }

        grid[y][x] = typeof grid[y][x] !== 'undefined'
            ? grid[y][x] + 1
            : 1;
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

require('../array');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    // .map(n=>parseInt(n))

let grid = [];

const dots = input
    .filter(function (input) {
        return ! input.startsWith('fold') && input !== '';
    })
    .map(function (dot) {
        return dot.split(',').map(n=>parseInt(n));
    });

const folds = input
    .filter(function (input) {
        return input.startsWith('fold');
    })
    .map(function (fold) {
        const [axis, value] = fold.substring(fold.lastIndexOf(' ') + 1).split('=');

        return [axis, parseInt(value)];
    });

let maxX = 0;

for (dot of dots) {
    const x = dot[0];
    const y = dot[1];

    if (typeof grid[y] === 'undefined') {
        grid[y] = [];
    }

    grid[y][x] = '#';

    maxX = Math.max(maxX, x);
}

// fix the grid, fill in empty spots
for (let y = 0; y < grid.length; y++) {
    if (typeof grid[y] === 'undefined') {
        grid[y] = [];
    }

    for (let x = 0; x <= maxX; x++) {
        if (typeof grid[y][x] === 'undefined') {
            grid[y][x] = '.';
        }
    }
}

const displayGrid = function (grid) {
    for (let y = 0; y < grid.length; y++) {
        console.log(grid[y].join(''));
    }
};

// console.log({grid});

for (fold of folds) {
    const [axis, value] = fold;

    const newGrid = [];

    if (axis === 'y') {
        console.log(grid.length);
        // loop up until Y value and just add as normal
        for (let y = 0; y < value; y++) {
            console.log({y});

            const newRow = [];

            for (let x = 0; x <= grid[y].length; x++) {
                if (typeof grid[y] === 'undefined') {
                    newRow[x] = '.';
                } else {
                    newRow[x] = grid[y][x] === '#'
                        ? '#'
                        : '.';
                }
            }

            newGrid.push(newRow);
        }

        // loop for the rest of the grid, and merge backwards
        for (let y = value + 1; y < grid.length; y++) {
            const newY = value - (y - value);

            console.log({y, newY});

            const newRow = newGrid[newY];

            for (let x = 0; x <= grid[y].length; x++) {
                if (typeof grid[y] === 'undefined') {
                    newRow[x] = '.';
                } else {
                    newRow[x] = newRow[x] === '#' || grid[y][x] === '#'
                        ? '#'
                        : '.';
                }
            }

            newGrid[newY] = newRow;
        }
    } else if (axis === 'x') {
        // console.log({grid});
        // loop up until X value and just add as normal
        for (let y = 0; y < grid.length; y++) {
            const newRow = [];

            for (let x = 0; x <= value; x++) {
                if (typeof grid[y] === 'undefined') {
                    newRow[x] = '.';
                } else {
                    newRow[x] = grid[y][x] === '#'
                        ? '#'
                        : '.';
                }
            }

            newGrid.push(newRow);
        }

        // loop for the rest of grid and merge columns backwards
        for (let y = 0; y < grid.length; y++) {
            const newRow = newGrid[y];

            for (let x = value + 1; x <= maxX; x++) {
                const newX = value - (x - value);

                if (typeof grid[y] === 'undefined') {
                    newRow[newX] = '.';
                } else {
                    newRow[newX] = newRow[newX] === '#' || grid[y][x] === '#'
                        ? '#'
                        : '.';
                }
            }

            newGrid[y] = newRow;
        }
    }

    grid = newGrid;
}

displayGrid(grid);

const countDots = function (grid) {
    let dots = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '#') {
                dots++;
            }
        }
    }

    return dots;
};

const answer = countDots(grid);

console.log(answer);

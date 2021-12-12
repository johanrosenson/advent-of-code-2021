require('../array');

const fs = require('fs');

const grid = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    .map(function (row) {
        return row.split('').map(v=>parseInt(v));
    })

const increase = function (value) {
    return value === 9
        ? 0
        : value + 1;
};

const increaseAfterFlash = function (value) {
    return value === 9 || value === 0
        ? 0
        : value + 1;
};

const performCycle = function () {
    let flashed = new Map;

    // First, the energy level of each octopus increases by 1.
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x] = increase(grid[y][x]);
        }
    }

    // Then, any octopus with an energy level greater than 9 flashes.
    do {
        foundFlashing = false;

        for (let y = 0, ymax = grid.length; y < ymax; y++) {
            for (let x = 0, xmax = grid[y].length; x < xmax; x++) {
                if (grid[y][x] === 0) {
                    let key = y+'x'+x;

                    if (! flashed.has(key)) {
                        foundFlashing = true;
                        flashed.set(key, true);

                        flashes++;

                        // up any neighbours
                        if (y > 0) {
                            if (x > 0) {
                                grid[y-1][x-1] = increaseAfterFlash(grid[y-1][x-1]);
                            }
                            grid[y-1][x] = increaseAfterFlash(grid[y-1][x]);
                            if (x < xmax - 1) {
                                grid[y-1][x+1] = increaseAfterFlash(grid[y-1][x+1]);
                            }
                        }

                        if (x > 0) {
                            grid[y][x-1] = increaseAfterFlash(grid[y][x-1]);
                        }
                        if (x < xmax - 1) {
                            grid[y][x+1] = increaseAfterFlash(grid[y][x+1]);
                        }

                        if (y < ymax - 1) {
                            if (x > 0) {
                                grid[y+1][x-1] = increaseAfterFlash(grid[y+1][x-1]);
                            }
                            grid[y+1][x] = increaseAfterFlash(grid[y+1][x]);
                            if (x < xmax - 1) {
                                grid[y+1][x+1] = increaseAfterFlash(grid[y+1][x+1]);
                            }
                        }

                        console.log('flash ' + key);
                    }
                }
            }
        }
    } while (foundFlashing === true);

    return flashed;
};

let flashes = 0;
let step = 0;

while (true) {
    step++;

    console.log('step ' + step);

    const flashed = performCycle();

    if (flashed.size === 100) {
        break;
    }
}

for (let y = 0; y < grid.length; y++) {
    console.log(grid[y].join(''));
}

console.log(step);

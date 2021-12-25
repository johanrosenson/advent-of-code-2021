require('../array');

console.time('part1');

const fs = require('fs');

let grid = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    .map(function (row) {
        return row.split('');
    })

const displayGrid = function (grid) {
    for (row of grid) {
        console.log(row.join(''));
    }
};

const performStep = function (grid) {
    const newGrid = [];
    let moved = 0;

    // move east first
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        const newRow = [];

        for (let j = 0; j < row.length; j++) {
            const value = row[j];

            if (value === '.') {
                newRow.push(value);

                continue;
            }

            if (value === 'v') {
                // ignore for now, set to empty
                newRow.push('.');

                continue;
            }

            if (value === '>') {
                // check if it can move
                const nextIndex = (j + 1) % row.length;
                const nextValue = row[nextIndex];

                if (nextValue === '.') {
                    moved++;
                    newRow.push('.');
                    j++;

                    if (nextIndex === 0) {
                        newRow[0] = value;
                    } else {
                        newRow.push(value);
                    }
                } else {
                    // can't move
                    newRow.push(value);
                }
            }
        }

        newGrid.push(newRow);
    }

    // move south last
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];

        for (let j = 0; j < row.length; j++) {
            const value = row[j];

            if (value !== 'v') {
                // ignore
                continue;
            }

            // check if it can move
            const nextRowIndex = (i + 1) % grid.length;

            const canMove = grid[nextRowIndex][j] !== 'v' && newGrid[nextRowIndex][j] === '.';

            if (canMove) {
                newGrid[nextRowIndex][j] = 'v';
                moved++;
            } else {
                newGrid[i][j] = 'v';
            }
        }
    }

    return [newGrid, moved];
};

let steps = 0;

do {
    [grid, moved] = performStep(grid);

    steps++;
} while (moved > 0);

displayGrid(grid);
console.log({steps});

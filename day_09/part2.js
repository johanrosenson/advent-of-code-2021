require('../array');

const fs = require('fs');

const rows = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(function (row) {
        return row.split('').map(v=>parseInt(v));
    });

const lowpoints = [];
const basins = new Map;

const findAdjacents = function (i, j) {
    const imax = rows.length;
    const jmax = rows[i].length;

    const adjacents = new Map;

    if (i > 0) {
        // top
        adjacents.set((i-1)+'x'+j, rows[i-1][j]);
    }

    if (j > 0) {
        // left
        adjacents.set(i+'x'+(j-1), rows[i][j-1]);
    }

    if (j < jmax-1) {
        // right
        adjacents.set(i+'x'+(j+1), rows[i][j+1]);
    }

    if (i < imax-1) {
        // bottom
        adjacents.set((i+1)+'x'+j, rows[i+1][j]);
    }

    return adjacents;
};

const findBasin = function (i, j, basin) {
    // find adjacents
    const adjacents = findAdjacents(i, j);

    for (const [key, value] of adjacents.entries()) {
        const currentValue = rows[i][j];

        if (value < 9 && value > currentValue) {
            const [newI, newJ] = key.split('x').map(v=>parseInt(v));

            // console.log({i, j, currentValue, newI, newJ, value});

            if (! basin.has(key)) {
                basin.set(key, value);

                findBasin(newI, newJ, basin);
            }
        }
    }

    return basin;
};

for (let i = 0, imax = rows.length; i < imax; i++) {
    for (let j = 0, jmax = rows[i].length; j < jmax; j++) {
        const value = rows[i][j];

        const adjacents = findAdjacents(i, j);

        const lowerAdjacents = Array.from(adjacents.values()).filter(function (adjacent) {
            return adjacent <= value;
        });

        if (lowerAdjacents.length === 0) {
            lowpoints.push(value);

            // create a new basin for this lowpoint
            const basin = findBasin(i, j, new Map);

            basins.set(i+'x'+j, basin);
        }
    }
}

const largestBasins = Array.from(basins.values()).sort(function (a, b) {
    if (a.size === b.size) {
        return 0;
    }

    return a.size < b.size
        ? 1
        : -1;
}).slice(0, 3);


console.log(basins);

console.log(largestBasins.map(basin=>basin.size+1).product());
// console.log(lowpoints.sum() + lowpoints.length);

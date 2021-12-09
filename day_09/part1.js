require('../array');

const fs = require('fs');

const rows = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(function (row) {
        return row.split('').map(v=>parseInt(v));
    });

const lowpoints = [];

for (let i = 0, imax = rows.length; i < imax; i++) {
    for (let j = 0, jmax = rows[i].length; j < jmax; j++) {
        const value = rows[i][j];

        const adjacents = [
            // top
            i > 0 ? rows[i-1][j] : null,
            // left
            j > 0 ? rows[i][j-1] : null,
            // right
            j < jmax-1 ? rows[i][j+1] : null,
            // bottom
            i < imax-1 ? rows[i+1][j] : null,
        ].filter(v => v !== null);

        const lowerAdjacents = adjacents.filter(function (adjacent) {
            return adjacent <= value;
        });

        if (lowerAdjacents.length === 0) {
            lowpoints.push(value);
        }
    }
}

console.log(lowpoints.sum() + lowpoints.length);

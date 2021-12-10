require('../array');

const fs = require('fs');

const rows = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    // .map(function (row) {
    //     return row.split('').map(v=>parseInt(v));
    // })

const corrupt = [];

const isIncomplete = function (row) {
    if (row.length === 0) {
        return false;
    }

    // if only opening, then incomplete
    return row.match(/^[\(\[\{\<]+$/) !== null;
};

const isCorrupt = function (row) {
    return row.length > 0 && ! isIncomplete(row);
};

const parsed = rows.map(function (row) {
    const originalRow = row;

    while (row.length > 0) {
        const newRow = row.replace(/(\(\))|(\[\])|(\{\})|(<>)/g, '');

        if (newRow === row) {
            // no match found
            break;
        }

        row = newRow;
    }

    if (isCorrupt(row)) {
        corrupt.push(row);
    }

    return row;
});

const findFirstCorrupt = function (row) {
    const match = row.match(/[^\(\[\{\<]/);

    return match[0];
};

let score = 0;

for (row of corrupt) {
    firstCorrupt = findFirstCorrupt(row);

    switch (firstCorrupt) {
        case ')':
            score += 3;
            break;
        case ']':
            score += 57;
            break;
        case '}':
            score += 1197;
            break;
        case '>':
            score += 25137;
            break;
    }
}

console.log(score);

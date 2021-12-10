require('../array');

const fs = require('fs');

const rows = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    // .map(function (row) {
    //     return row.split('').map(v=>parseInt(v));
    // })

const corrupt = [];
const incomplete = [];

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
    } else if (isIncomplete(row)) {
        incomplete.push(row);
    }

    return row;
});

const findCompletion = function (row) {
    let output = '';

    for (let i = row.length - 1; i >= 0; i--) {
        const char = row.charAt(i);

        switch (char) {
            case '(':
                output += ')';
                break;
            case '[':
                output += ']';
                break;
            case '{':
                output += '}';
                break;
            case '<':
                output += '>';
                break;
        }
    }

    return output;
};

const getScore = function (completion) {
    let score = 0;

    for (let i = 0; i < completion.length; i++) {
        const char = completion.charAt(i);

        score *= 5;

        switch (char) {
            case ')':
                score += 1;
                break;
            case ']':
                score += 2;
                break;
            case '}':
                score += 3;
                break;
            case '>':
                score += 4;
                break;
        }
    }

    return score;
};

let scores = [];

for (row of incomplete) {
    const completion = findCompletion(row);

    scores.push(getScore(completion));
}

scores = scores.sort(function (a, b) {
    if (a === b) return 0;

    return a < b
        ? -1
        : 1;
});

console.log(scores[Math.floor(scores.length / 2)]);

require('../array');

console.time('part1');

const fs = require('fs');

const grid = fs.readFileSync('example.txt', 'utf8').trim()
    .split('\n')
    .map(function (row) {
        return row.split('').map(n=>parseInt(n));
    })

const displayPath = async function (path) {
    console.clear();

    for (let y = 0; y < grid.length; y++) {
        let row = '';

        for (let x = 0; x < grid[y].length; x++) {
            if (pointIsInPath(bestPath, x, y)) {
                row += '\x1b[32m' + String(grid[y][x]) + '\x1b[0m';
            } else if (pointIsInPath(path, x, y)) {
                row += '\x1b[31m' + String(grid[y][x]) + '\x1b[0m';
            } else {
                row += String(grid[y][x]);
            }
        }

        console.log(row);
    }
};

const getInitialPath = function () {
    const path = [];

    for (let i = 0; i < grid.length; i++) {
        if (i < (grid.length - 1)) {
            path.push([i, i+1]);
        }

        path.push([i, i]);
    }

    return path;
};

const getAdjacents = function (x, y) {
    const maxX = grid[0].length - 1;
    const maxY = grid.length - 1;

    const adjacents = [];

    if (y > 0) {
        adjacents.push([x, y - 1]);
    }

    if (x < maxX) {
        adjacents.push([x + 1, y]);
    }

    if (y < maxY) {
        adjacents.push([x, y + 1]);
    }

    if (x > 0) {
        adjacents.push([x - 1, y]);
    }

    return adjacents;
};

const pointIsInPath = function (path, x, y) {
    return path.find(function (point) {
        const [pointX, pointY] = point;

        return x === pointX && y === pointY;
    }) !== undefined;
};

const getRisk = function (path) {
    let risk = 0;

    for (point of path.slice(1)) {
        const [x, y] = point;
        risk += grid[y][x];
    }

    return risk;
};

let bestPath = getInitialPath();
let lowestRisk = getRisk(bestPath);

const traverse = function (path) {
    // last index is where we just come from
    const [currentX, currentY] = path[path.length - 1];

    const endX = grid[0].length - 1;
    const endY = grid.length - 1;

    if (currentX === endX && currentY === endY) {
        const risk = getRisk(path);

        if (risk < lowestRisk) {
            lowestRisk = risk;
            bestPath = [...path];
        }

        return;
    }

    const options = getAdjacents(currentX, currentY)
        .filter(function (option) {
            // remove any adjacent points we have already visited
            const [x, y] = option;

            return ! pointIsInPath(path, x, y);
        })
        .filter(function (option) {
            // remove any adjacent points which would be higher risk than current lower risk
            const newPath = [
                ...path,
                option,
            ];

            const risk = getRisk(newPath);

            return risk < lowestRisk;
        });

    console.log({options});

    if (options.length === 0) {
        // dead end, stop here
        return;
    }

    // only valid options remaining
    for (option of options) {
        const newPath = [
            ...path,
            option,
        ];

        displayPath(newPath);

        traverse(newPath);
    }
};

traverse([
    [0, 0],
]);

console.log({
    lowestRisk,
    bestPath,
});

console.timeEnd('part1');

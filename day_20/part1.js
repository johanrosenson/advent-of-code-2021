require('../array');

console.time('part1');

const fs = require('fs');

const [algoritm, input] = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n\n')

let image = input
    .split('\n')
    .map(row=>row.split(''))

console.log({algoritm, image});

const getImageValue = function (input, x, y) {
    const gridSize = input.length;

    const yrange = range(y - 1, y + 1);
    const xrange = range(x - 1, x + 1);

    const pixels = [];

    for (yPos of yrange) {
        for (xPos of xrange) {
            if (yPos < 0 || xPos < 0) {
                pixels.push(currentFill === '.' ? '0' : '1');
            } else if (yPos >= gridSize || xPos >= gridSize) {
                pixels.push(currentFill === '.' ? '0' : '1');
            } else {
                pixels.push(input[yPos][xPos] === '.' ? '0' : '1');
            }
        }
    }

    const binary = pixels.join('');
    const decimal = parseInt(binary, 2);

    return decimal;
};

const getNewPixel = function (input, x, y) {
    const decimalValue = getImageValue(input, x, y);

    return algoritm.charAt(decimalValue);
};

const enhance = function (input) {
    output = [];

    const gridSize = input.length;

    for (let y = -1; y <= gridSize; y++) {
        const row = [];

        for (let x = -1; x <= gridSize; x++) {
            const newPixel = getNewPixel(input, x, y);

            row.push(newPixel);
        }

        output.push(row);
    }

    currentFill = algoritm.charAt(0) === '.'
        ? '.'
        : currentFill === '#' ? '.' : '#';

    return output;
};

let currentFill = '.';

// const tests = [
//     [-1, -1, '.'],
//     [0, -1, '#'],
//     [1, -1, '#'],
//     [2, -1, '.'],
//     [3, -1, '#'],
//     [4, -1, '#'],
//     [5, -1, '.'],
//     [0, 1, '#'],
//     [5, 2, '#'],
//     [4, 4, '.'],
//     [5, 4, '#'],
//     [5, 5, '.'],
//     [4, 5, '#'],
// ];

// for (test of tests) {
//     const [x, y, expected] = test;
//     const actual = getNewPixel(image, x, y);
//     const pass = actual === expected;

//     console.log({x, y, actual, expected, pass})
// }

// return;

let times = 2;

while (times-- > 0) {
    image = enhance(image);
}

// for (row of image) {
//     console.log(row.join(''));
// }

const lightPixels = image
    .map(row => row.filter(cell => cell === '#').length)
    .sum()

console.log({lightPixels});

console.timeEnd('part1');

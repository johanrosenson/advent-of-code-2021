require('../array');

const fs = require('fs');

const inputs = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    // .map((input) => parseInt(input))

let mostCommon = '';
let leastCommon = '';

for (let i = 0; i < inputs[0].length; i++) {
    let counts = [0, 0];

    for (let j = 0; j < inputs.length; j++) {
        const bit = inputs[j][i];

        counts[parseInt(bit)]++;
    }

    mostCommon += counts[0] > counts[1]
        ? '0'
        : '1';
    leastCommon += counts[0] < counts[1]
        ? '0'
        : '1';
}

console.log(parseInt(mostCommon, 2) * parseInt(leastCommon, 2));

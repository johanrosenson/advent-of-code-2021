require('../array');

const fs = require('fs');

const inputs = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    // .map((input) => parseInt(input))

let mostCommon = '';
let leastCommon = '';

const findMostCommonBit = function (inputs, position) {
    let counts = [0, 0];

    for (let j = 0; j < inputs.length; j++) {
        const bit = inputs[j][position];

        counts[parseInt(bit)]++;
    }

    return counts[0] > counts[1]
        ? '0'
        : '1';
}

const findLeastCommonBit = function (inputs, position) {
    let counts = [0, 0];

    for (let j = 0; j < inputs.length; j++) {
        const bit = inputs[j][position];

        counts[parseInt(bit)]++;
    }

    return counts[0] <= counts[1]
        ? '0'
        : '1';
}

const filterInputs = function(inputs, position, required) {
    return inputs.filter(function (input) {
        return input.charAt(position) === required;
    });
}

const findOxygenGeneratorRating = function (inputs) {
    let candidates = [...inputs];

    while (candidates.length > 1) {
        for (let i = 0; i < candidates[0].length; i++) {
            const mostCommonBit = findMostCommonBit(candidates, i);

            candidates = filterInputs(candidates, i, mostCommonBit);

            if (candidates.length === 0) {
                break;
            }
        }
    }

    return candidates[0];
};

const findScrubberRating = function (inputs) {
    let candidates = [...inputs];

    while (candidates.length > 1) {
        for (let i = 0; i < candidates[0].length; i++) {
            const leastCommonBit = findLeastCommonBit(candidates, i);

            candidates = filterInputs(candidates, i, leastCommonBit);

            if (candidates.length === 1) {
                break;
            }
        }
    }

    return candidates[0];
};

const oxygenGeneratorRating = findOxygenGeneratorRating(inputs);
const scrubberRating = findScrubberRating(inputs);

console.log(parseInt(oxygenGeneratorRating, 2) * parseInt(scrubberRating, 2));

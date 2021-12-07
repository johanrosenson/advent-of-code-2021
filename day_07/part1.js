require('../array');

const fs = require('fs');

const crabs = fs.readFileSync('input.txt', 'utf8')
    // .split('\n')
    .split(',').map(v=>parseInt(v))

let answer = 0;

let bestPosition = null;
let leastFuel = null;

for (let position = Math.min(...crabs), position_max = Math.max(...crabs); position <= position_max; position++) {
    let fuelSum = 0;

    for (let j = 0; j < crabs.length; j++) {
        const crab = crabs[j];
        const fuel = Math.abs(position - crab);

        fuelSum += fuel;
    }

    if (leastFuel === null || fuelSum < leastFuel) {
        leastFuel = fuelSum;
        bestPosition = position;
    }
}

console.log(
    leastFuel,
);

require('../array');

const fs = require('fs');

const crabs = fs.readFileSync('input.txt', 'utf8')
    // .split('\n')
    .split(',').map(v=>parseInt(v))

let answer = 0;

let bestPosition = null;
let leastFuel = null;

const calculateFuel = function (position, crab) {
    let fuel = 0;
    let currentFuel = 1;

    let currentPosition = Math.min(position, crab);
    const end = Math.max(position, crab);

    while (currentPosition < end) {
        fuel += currentFuel++;

        currentPosition++;
    }

    return fuel;
};

for (let position = Math.min(...crabs), position_max = Math.max(...crabs); position <= position_max; position++) {
    let fuelSum = 0;

    for (let j = 0; j < crabs.length; j++) {
        const crab = crabs[j];
        const fuel = calculateFuel(position, crab);

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

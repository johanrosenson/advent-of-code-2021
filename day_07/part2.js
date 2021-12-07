require('../array');

const fs = require('fs');

const crabs = fs.readFileSync('input.txt', 'utf8')
    // .split('\n')
    .split(',').map(v=>parseInt(v))

// get the range of positions
const fuel = range(Math.min(...crabs), Math.max(...crabs))
    // get total fuel consumption for each position
    .map(function (position) {
        // map each grab to fuel consumtion to move into position and sum all fuel consumptions
        return crabs.map(crab => {
            let distance = Math.abs(crab - position);

            return (distance * (distance + 1)) / 2;
        }).sum();
    })
    // get the least fuel consumption
    .min();

console.log(fuel);

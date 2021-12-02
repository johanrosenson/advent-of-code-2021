require('../array');

const fs = require('fs');

const instructions = fs.readFileSync('input.txt', 'utf8')
    .split('\n');

let depth = 0;
let horizontal = 0;

instructions.forEach(function (instruction) {
    const [direction, number] = instruction.split(' ');

    if (direction === 'up') {
        depth = depth - parseInt(number);
    } else if (direction === 'down') {
        depth = depth + parseInt(number);
    } else if (direction === 'forward') {
        horizontal = horizontal + parseInt(number);
    }
});

console.log(depth * horizontal);

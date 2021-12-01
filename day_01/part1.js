const fs = require('fs');

const numbers = fs.readFileSync('input.txt', 'utf8').split('\n').map((number) => parseInt(number));

let previous = null;
let increments = 0;

numbers.forEach(function (number) {
    if (previous !== null && number > previous) {
        increments++;
    }

    previous = number;
});

console.log({increments});

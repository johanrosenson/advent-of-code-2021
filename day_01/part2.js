require('../array');

const fs = require('fs');

const numbers = fs.readFileSync('input.txt', 'utf8').split('\n').map((number) => parseInt(number));

const sums = [];

const windowSize = 3;

for (let i = 0, imax = numbers.length - windowSize + 1; i < imax; i++) {
    // console.log(numbers.slice(i, i + windowSize).sum());
    sums.push(numbers.slice(i, i + windowSize).sum());
}

// console.log({sums});

let previous = null;
let increments = 0;

sums.forEach(function (sum) {
    if (previous !== null && sum > previous) {
        increments++;
    }

    previous = sum;
});

console.log({increments});

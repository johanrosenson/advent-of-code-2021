require('../array');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8')
    .split(',')
    .map(v => parseInt(v));

const fishes = range(0, 8)
    .map(function (index) {
        return input.filter(timer => timer === index).length;
    });

let days = 256;

while (days-- > 0) {
    const fish = fishes.shift();

    fishes.push(fish);
    fishes[6] += fish;
}

console.log(fishes.sum());

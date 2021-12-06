require('../array');

const fs = require('fs');

const fishes = fs.readFileSync('input.txt', 'utf8')
    .split(',').map(v=>parseInt(v));

let days = 80;

while (days > 0) {
    for (let i = 0, imax = fishes.length; i < imax; i++) {
        if (fishes[i] === 0) {
            fishes[i] = 6;
            fishes.push(8);
        } else {
            fishes[i] = fishes[i] - 1;
        }
    }

    days--;
}

console.log(
    fishes.length,
);

require('../array');

const fs = require('fs');

const initial = fs.readFileSync('input.txt', 'utf8')
    .split(',').map(v=>parseInt(v));

let fishes = [];

for (let i = 0; i < 9; i++) {
    fishes[i] = initial.filter(function (fish) {
        return fish === i;
    }).length;
}

let days = 256;

while (days > 0) {
    let newFishes = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 9; i++) {
        if (i === 0) {
            newFishes[6] = fishes[i];
            newFishes[8] = fishes[i];
        } else {
            newFishes[i-1] = newFishes[i-1] + fishes[i];
        }
    }

    fishes = newFishes;

    days--;
}

console.log(
    fishes.sum(),
);

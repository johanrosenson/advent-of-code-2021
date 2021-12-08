require('../array');

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    // .split(',').map(v=>parseInt(v))

let answer = 0;

lines.forEach(function (line) {
    const [input, output] = line.split(' | ');

    const numbers = output.split(' ');

    const wanted = numbers.filter(function (number) {
        if (number.length === 2) {
            return true; // 1
        }

        if (number.length === 4) {
            return true; // 4
        }

        if (number.length === 7) {
            return true; // 8
        }

        if (number.length === 3) {
            return true; // 7
        }

        return false;
    });

    answer += wanted.length;
});

console.log(answer);

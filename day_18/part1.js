require('../array');

console.time('part1');

const fs = require('fs');

const inputs = fs.readFileSync('example.txt', 'utf8').trim()
    .split('\n')

let numbers = [];

const parseNumber = function (stack) {
    const number = [];

    while ((char = stack.shift()) !== undefined) {
        if (char === '[') {
            number.push(parseNumber(stack));
        } else if (char === ']') {
            return number;
        } else if (char !== ',') {
            number.push(parseInt(char));
        }
    }

    return number;
};

for (input of inputs) {
    const stack = input.split('');

    numbers.push(
        parseNumber(stack).pop(),
    );
}

const reduceNumber = function (number) {
    //
};

reduceNumber(numbers[0]);

console.log(JSON.stringify(numbers));

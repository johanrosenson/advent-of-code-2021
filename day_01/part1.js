const fs = require('fs');

const numbers = fs.readFileSync('input.txt', 'utf8').split('\n').map((number) => parseInt(number));

numbers.forEach(function (num1, index) {
    console.log(num1);
});

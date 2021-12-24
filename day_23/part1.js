require('../array');

console.time('part1');

const fs = require('fs');

const inputs = fs.readFileSync('example.txt', 'utf8').trim()
    .split('\n')

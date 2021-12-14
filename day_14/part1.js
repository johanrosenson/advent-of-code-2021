require('../array');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    // .map(n=>parseInt(n))

const template = input.shift();

const rules = new Map;

input.slice(1).forEach(function (rule) {
    const [pair, insertion] = rule.split(' -> ');

    rules.set(pair, insertion);
});

console.log({rules});

let output = template;

let steps = 10;

const performInsert = function (input, rules) {
    const output = [];

    for (let i = 0; i < input.length - 1    ; i++) {
        const pair = input.slice(i, i + 2);

        const insertion = rules.get(pair);

        const result = (i === 0 ? pair.charAt(0) : '') + insertion + pair.charAt(1);

        output.push(result);
    }

    return output.join('');
};

while (steps-- > 0) {
    output = performInsert(output, rules);
}

let grouped = new Map;

output.split('').forEach(function (char) {
    const count = grouped.has(char)
        ? grouped.get(char) + 1
        : 1;

    grouped.set(char, count);
});

const counts = Array.from(grouped.values()).numsort();

const least = counts.shift();
const most = counts.pop();

console.log(most - least);

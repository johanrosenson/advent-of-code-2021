require('../array');

console.time('part2');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')

let template = input.shift();

const rules = new Map;

input.slice(1).forEach(function (rule) {
    const [pair, insertion] = rule.split(' -> ');

    rules.set(pair, insertion);
});

// will keep the current counts of each pair
const pairs = new Map;
// will keep the counts of each element
const elements = new Map;

const incrementPairCount = function (pairs, pair, by) {
    const newCount = pairs.has(pair)
        ? pairs.get(pair) + by
        : by;

    pairs.set(pair, newCount);
};

const decrementPairCount = function (pairs, pair, by) {
    const newCount = pairs.get(pair) - by;

    pairs.set(pair, newCount);
};

const incrementElementCount = function (elements, element, by) {
    const newCount = elements.has(element)
        ? elements.get(element) + by
        : by;

    elements.set(element, newCount);
};

// initial pair counts
for (let i = 0; i < template.length - 1; i++) {
    const pair = template.slice(i, i + 2);

    incrementPairCount(pairs, pair, 1);
}

// initial element counts
template.split('').forEach(element => incrementElementCount(elements, element, 1));

let steps = 40;

while (steps-- > 0) {
    for (const [pair, count] of new Map(pairs)) {
        if (count === 0) {
            continue;
        }

        const newElement = rules.get(pair);

        const [newPair1, newPair2] = [
            pair.charAt(0) + newElement,
            newElement + pair.charAt(1),
        ];

        incrementPairCount(pairs, newPair1, count);
        incrementPairCount(pairs, newPair2, count);
        decrementPairCount(pairs, pair, count);

        incrementElementCount(elements, newElement, count);
    }
}

const elementCounts = Array.from(elements.values()).numsort();
// const polymerLength = Array.from(elements.values()).sum();

const least = elementCounts.shift();
const most = elementCounts.pop();

console.log(most - least);

console.timeEnd('part2');

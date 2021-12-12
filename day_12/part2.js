require('../array');

const fs = require('fs');

console.time('part2');

const input = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')

const map = new Map;

input.forEach(function (path) {
    const [a, b] = path.split('-');

    if (! map.has(a)) {
        map.set(a, []);
    }

    if (! map.has(b)) {
        map.set(b, []);
    }

    const pathsA = map.get(a);

    if (b !== 'start') {
        pathsA.push(b);
    }

    const pathsB = map.get(b);

    if (a !== 'start') {
        pathsB.push(a);
    }

    map.set(a, pathsA.unique());
    map.set(b, pathsB.unique());
});

console.log({map});

const paths = [];

const traverse = function (from, visited) {
    const options = map.get(from)
        .filter(function (option) {
            if (option.toLowerCase() === option) {
                const smallCavesVisited = visited
                    .filter(cave => cave.toLowerCase() === cave);

                const fromSmallCave = from.toLowerCase() === from;

                const smallCaveVisitedTwice = (fromSmallCave && visited.includes(from)) || smallCavesVisited.unique().length < smallCavesVisited.length;

                const canVisit = ! smallCaveVisitedTwice
                    ? true // have not visited any small caves twice, hence any small cave can be visited
                    : ! visited.includes(option); // a small cave have been visisted twice, small caves can now only be visisted if previously not visited

                return canVisit;
            }

            return true;
        });

    if (options.length === 0) {
        // dead end, stop here
        return;
    }

    for (option of options) {
        const path = [
            ...visited,
            from,
        ];

        if (option === 'end') {
            path.push(option);

            paths.push(path);
        } else {
            traverse(option, path);
        }
    }
};

traverse('start', []);

console.log(paths.length);

console.timeEnd('part2');

require('../array');

console.time('part1');

const fs = require('fs');

const region = {
    'x': [-50, 50],
    'y': [-50, 50],
    'z': [-50, 50],
};

const inputs = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')
    .map(function (input) {
        const [action, coords] = input.split(' ');
        const [xrange, yrange, zrange] = coords.split(',')
            .map(function (range_input) {
                const [axis, start_end] = range_input.split('=');
                const [start, end] = start_end.split('..').map(n => parseInt(n));

                if (start > region[axis][1] || end < region[axis][0]) {
                    // out of bounds
                    return null;
                }

                return range(
                    Math.max(region[axis][0], start),
                    Math.min(region[axis][1], end),
                );
            });

        if (xrange === null || yrange === null || zrange === null) {
            return null;
        }

        return [
            action,
            xrange,
            yrange,
            zrange,
        ];
    })
    // remove out of bounds ranges
    .filter(input => input !== null);

const cubes = new Map;

for (input of inputs) {
    const [action, xrange, yrange, zrange] = input;

    for (const x of xrange) {
        for (const y of yrange) {
            for (const z of zrange) {
                const key = [x, y, z].join('x');

                if (action === 'on') {
                    cubes.set(key, 'on');
                } else {
                    cubes.delete(key);
                }
            }
        }
    }
}

// console.log({cubes});
console.log(cubes.size);

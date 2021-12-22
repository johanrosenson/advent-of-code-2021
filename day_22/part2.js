require('../array');

console.time('part2');

const fs = require('fs');

const inputs = fs.readFileSync('example.txt', 'utf8').trim()
    .split('\n')
    .map(function (input) {
        const [action, coords] = input.split(' ');
        const [xrange, yrange, zrange] = coords.split(',')
            .map(function (range_input) {
                const [axis, start_end] = range_input.split('=');
                const [start, end] = start_end.split('..').map(n => parseInt(n));

                return range(start, end);
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

const createCuboids = function (cuboids, xrange, yrange, zrange) {
    const newCuboids = [];

    const candidates = [
        [xrange, yrange, zrange],
    ];

    while ((candidate = candidates.shift()) !== undefined) {
        // find first overlapping cuboid
        // if no overlapping
            // newCuboids.push(...);
        // else
            // split candidate into new cuboids so it doesn't overlap
            // candidates.push(new cuboids)
            // these new cuboids needs to be checked again to find if they overlap any other cuboids
    }

    return newCuboids;
};

// will store all "on-ranges"
let cuboids = [];

for (input of inputs) {
    const [action, xrange, yrange, zrange] = input;

    if (action === 'on') {
        // calculate the overlap with each "on-range"
        // re-calculate the box being added so it only adds boxes that doesnt overlap
        const newCuboids = createCuboids(boxes, xrange, yrange, zrange);
    } else {
        // calculate the overlap with each "on-range"
        // re-calculate the "on-range" to exclude the portion being turned off
        // find cuboids overlapping the area to be removed
        const overlappingCuboids = [];
        // remove them from cuboids
        // re-calculate each found cuboid
        for (overlappingOvercuboid of overlappingCuboids) {
            const newCuboids = createCuboids(areaToRemove, xrange, yrange, zrange);

            // add them to cuboids
        }
    }
}

// calculate the size of all "on-ranges"

console.log('calculate...');
const turnedOn = 0;

console.log({turnedOn});
console.log(turnedOn === 2758514936282235);

console.timeEnd('part2')

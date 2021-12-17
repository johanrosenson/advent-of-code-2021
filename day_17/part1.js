require('../array');

console.time('part1');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim()

const parseInput = function (input) {
    const [x, y] = input.replace(/^target area: /, '').split(', ');

    const [x1, x2] = x.replace(/^x=/, '').split('..').map(n=>parseInt(n));
    const [y1, y2] = y.replace(/^y=/, '').split('..').map(n=>parseInt(n));

    return {x1, x2, y1, y2};
};

const target = parseInput(input);

const sleep = function (ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const isInsideTarget = function (x, y) {
    if (x < target.x1) {
        return false;
    }

    if (x > target.x2) {
        return false;
    }

    if (y < target.y1) {
        return false;
    }

    if (y > target.y2) {
        return false;
    }

    return true;
};

const hitTarget = function (trace) {
    const points = Array.from(trace.values());

    for (point of points) {
        if (isInsideTarget(point[0], point[1])) {
            return true;
        }
    }

    return false;
};

const getPeakY = function (trace) {
    return Array.from(trace.values())
        .map(point => point[1])
        .max();
};

const drawMap = async function (trace, maxY, highestPeakY, initialXV, initialYV) {
    // console.log({trace});

    const xstart = 0;
    const xend = target.x2 + 2; // stop drawing 2 beyond the target

    const ystart = maxY; // max possible Y
    const yend = target.y1 - 2; // stop drawing 2 below the target

    // console.log({ystart, yend});

    // return;

    console.clear();

    for (let y = ystart; y >= yend; y--) {
        let row = '';

        for (let x = xstart; x <= xend; x++) {
            const key = x + ',' + y;

            if (trace.has(key)) {
                if (x === 0 && y === 0) {
                    row += 'S';
                } else {
                    row += '#';
                }
            } else if (isInsideTarget(x, y)) {
                row += 'T';
            } else {
                row += '.';
            }
        }

        console.log(row);
    }

    console.log('Highest peak Y: ' + String(highestPeakY) + ' (' + initialXV + '/' + initialYV + ')');

    await sleep(10);
}

const calculateVelocity = function (x, y) {
    return [
        // Due to drag, the probe's x velocity changes by 1 toward the value 0;
        // that is, it decreases by 1 if it is greater than 0,
        // increases by 1 if it is less than 0, or does not change if it is already 0.
        Math.max(0, x - 1),
        // Due to gravity, the probe's y velocity decreases by 1.
        y - 1,
    ];
};

const missedTarget = function (xp, yp, xv) {
    if (xv === 0 && xp < target.x1) {
        return true; // will always be to the left of the target
    }

    if (xp > target.x1 + target.x2) {
        return true; // will always be to the right of the target
    }

    if (yp < target.y1 + target.y2) {
        return true; // is already below the target
    }

    return false;
}

const run = async function () {
    const targetWidthOffset = target.x2;
    const targetHeightOffset = Math.abs(target.y1);

    // needs proper calculations
    const minXV = 1;
    const maxXV = target.x2 + 1;

    // needs proper calculations
    const minYV = 1;
    const maxYV = targetHeightOffset;

    let highestPeakY = 0;

    for (let initialYV = minYV; initialYV <= maxYV; initialYV++) {
        // calculate the max Y this trajectory can reach
        const maxY = (initialYV * (initialYV + 1)) / 2;

        if (maxY <= highestPeakY) {
            continue;
        }

        for (let initialXV = minXV; initialXV <= maxXV; initialXV++) {
            let [xv, yv] = [initialXV, initialYV];

            // starting position
            let [xp, yp] = [0, 0];

            const trace = new Map;

            trace.set(xp + ',' + yp, [xp, yp]);

            while (! missedTarget(xp, yp, xv)) {
                xp += xv;
                yp += yv;

                trace.set(xp + ',' + yp, [xp, yp, xv, yv]);

                // await drawMap(trace, maxY, highestPeakY, initialXV, initialYV);

                if (hitTarget(trace)) {
                    const peakY = getPeakY(trace);

                    highestPeakY = Math.max(highestPeakY, peakY);

                    break;
                }

                [xv, yv] = calculateVelocity(xv, yv);
            }

            // console.log({trace});
        }
    }

    console.log({highestPeakY});
};

run();

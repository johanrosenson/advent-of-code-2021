require('../array');

console.time('part2');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim()

const parseInput = function (input) {
    const [x, y] = input.replace(/^target area: /, '').split(', ');

    const [x1, x2] = x.replace(/^x=/, '').split('..').map(n=>parseInt(n));
    const [y1, y2] = y.replace(/^y=/, '').split('..').map(n=>parseInt(n));

    return {x1, x2, y1, y2};
};

const target = parseInput(input);

const getMaxX = function (xv) {
    return (xv * (xv + 1)) / 2;
};

const calculateMinXV = function () {
    const horizontalDistanceToTarget = target.x1;

    let minXV = 1;

    while (true) {
        let maxX = getMaxX(minXV);

        if (maxX >= horizontalDistanceToTarget) {
            break;
        }

        minXV++;
    }

    return minXV;
};

const calculateXPosition = function (xv, steps) {
    if (steps > xv) {
        return getMaxX(xv);
    }

    let xPosition = 0;
    let xvCurrent = xv;

    while (steps-- > 0) {
        xPosition += xvCurrent;

        xvCurrent--;
    }

    return xPosition;
};

const run = async function () {
    const verticalHitThreshold = target.y2;
    const verticalMissThreshold = target.y1 - 1;

    const xvMin = calculateMinXV();
    const xvMax = target.x2;
    const yvMin = Math.abs(target.y1) * -1;
    const yvMax = Math.abs(target.y1) - 1;

    let trajectories = 0;
    let iterations = 0;

    for (let yv = yvMin; yv <= yvMax; yv++) {
        const roundtripSteps = yv > 0
            ? (yv * 2) + 1
            : 0;
        const velocityAfterRoundtrip = yv > 0
            ? (yv * -1) - 1
            : yv;

        let yMinSteps = null;
        let yMaxSteps = null;
        let ySteps = 0;

        let yPosition = 0;
        let yvCurrent = velocityAfterRoundtrip;

        while (yPosition > verticalMissThreshold) {
            yPosition += yvCurrent;
            yvCurrent--;
            ySteps++;

            iterations++;

            if (yPosition <= verticalHitThreshold && yPosition > verticalMissThreshold) {
                yMinSteps = yMinSteps === null
                    ? ySteps
                    : yMinSteps;
                yMaxSteps = ySteps;
            }
        }

        if (yMinSteps === null) {
            continue;
        }

        yMinSteps += roundtripSteps;
        yMaxSteps += roundtripSteps;

        for (let xv = xvMin; xv <= xvMax; xv++) {
            for (steps of range(yMinSteps, yMaxSteps)) {
                iterations++;

                const xPosition = calculateXPosition(xv, steps);

                if (xPosition >= target.x1 && xPosition <= target.x2) {
                    trajectories++;

                    break;
                }
            }
        }
    }

    console.log({
        trajectories,
        iterations,
    });

    console.timeEnd('part2');
};

run();

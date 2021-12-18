require('../array');

console.time('part2');

const fs = require('fs');

const input = fs.readFileSync('example.txt', 'utf8').trim()

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

const validate = function (trajectories, expected) {
    for (expectedTrajectory of expected) {
        let found = false;
        for (trajectory of trajectories) {
            const key = trajectory[0] + ',' + trajectory[1];

            if (key === expectedTrajectory) {
                found = true;
                break;
            }
        }

        if (! found) {
            return false;
        }
    }

    return true;
};

const run = async function () {
    const verticalHitThreshold = target.y2;
    const verticalMissThreshold = target.y1 - 1;

    const xvMin = calculateMinXV();
    const xvMax = target.x2;

    const yvMin = Math.abs(target.y1) * -1;
    const yvMax = Math.abs(target.y1) - 1;

    const trajectories = [];
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
            break;
        }

        yMinSteps += roundtripSteps;
        yMaxSteps += roundtripSteps;

        for (let xv = xvMin; xv <= xvMax; xv++) {
            for (steps of range(yMinSteps, yMaxSteps)) {
                iterations++;

                const xPosition = calculateXPosition(xv, steps);

                if (xPosition >= target.x1 && xPosition <= target.x2) {
                    trajectories.push([
                        xv,
                        yv,
                    ]);

                    break;
                }
            }
        }
    }

    const expected = 112;

    console.log({trajectories});
    console.log([trajectories.length, expected, trajectories.length === expected]);
    console.log({iterations});

    const validated = validate(
        trajectories,
        [
            '23,-10', '25,-9', '27,-5', '29,-6', '22,-6', '21,-7', '9,0', '27,-7', '24,-5', '25,-7', '26,-6',
            '25,-5', '6,8', '11,-2', '20,-5', '29,-10', '6,3', '28,-7', '8,0', '30,-6', '29,-8', '20,-10', '6,7',
            '6,4', '6,1', '14,-4', '21,-6', '26,-10', '7,-1', '7,7', '8,-1', '21,-9', '6,2', '20,-7', '30,-10',
            '14,-3', '20,-8', '13,-2', '7,3', '28,-8', '29,-9', '15,-3', '22,-5', '26,-8', '25,-8', '25,-6',
            '15,-4', '9,-2', '15,-2', '12,-2', '28,-9', '12,-3', '24,-6', '23,-7', '25,-10', '7,8', '11,-3',
            '26,-7', '7,1', '23,-9', '6,0', '22,-10', '27,-6', '8,1', '22,-8', '13,-4', '7,6', '28,-6', '11,-4',
            '12,-4', '26,-9', '7,4', '24,-10', '23,-8', '30,-8', '7,0', '9,-1', '10,-1', '26,-5', '22,-9', '6,5',
            '7,5', '23,-6', '28,-10', '10,-2', '11,-1', '20,-9', '14,-2', '29,-7', '13,-3', '23,-5', '24,-8',
            '27,-9', '30,-7', '28,-5', '21,-10', '7,9', '6,6', '21,-5', '27,-10', '7,2', '30,-9', '21,-8',
            '22,-7', '24,-9', '20,-6', '6,9', '29,-5', '8,-2', '27,-8', '30,-5', '24,-7',
        ],
    );

    console.log({validated});

    console.timeEnd('part2');
};

run();

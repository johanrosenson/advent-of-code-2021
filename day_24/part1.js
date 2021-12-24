require('../array');

console.time('part1');

const fs = require('fs');

const instructions = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\n')

const resolveArgument = function (arg, variables) {
    if (Array.from(variables.keys()).includes(arg)) {
        return variables.get(arg);
    }

    return parseInt(arg);
};

const run = function (inputs, instructions) {
    const variables = new Map([
        ['w', 0],
        ['x', 0],
        ['y', 0],
        ['z', 0],
    ]);

    for (const instruction of instructions) {

        const command = instruction.substr(0, 3);
        const [a, b] = instruction.substr(4).split(' ');

        switch (command) {
            case 'ret':
                return variables;

            case 'inp':
                // inp a - Read an input value and write it to variable a.

                const input = inputs.shift();

                if (typeof input === 'undefined') {
                    throw new Error('no more inputs to give');
                }

                variables.set(a, input);

                break;

            case 'add':
                // add a b - Add the value of a to the value of b, then store the result in variable a.

                variables.set(a, resolveArgument(a, variables) + resolveArgument(b, variables));

                break;

            case 'mul':
                // mul a b - Multiply the value of a by the value of b, then store the result in variable a.

                variables.set(a, resolveArgument(a, variables) * resolveArgument(b, variables));

                break;

            case 'div':
                // div a b - Divide the value of a by the value of b, truncate the result to an integer
                // then store the result in variable a. (Here, "truncate" means to round the value toward zero.)

                variables.set(a, Math.floor(resolveArgument(a, variables) / resolveArgument(b, variables)));

                break;

            case 'mod':
                // mod a b - Divide the value of a by the value of b, then store the remainder in variable a.
                // (This is also called the modulo operation.)

                variables.set(a, resolveArgument(a, variables) % resolveArgument(b, variables));

                break;

            case 'eql':
                // eql a b - If the value of a and b are equal, then store the value 1 in variable a.
                // Otherwise, store the value 0 in variable a.

                variables.set(a, resolveArgument(a, variables) === resolveArgument(b, variables) ? 1 : 0);

                break;

            default:
                throw new Error(`unsupported command ${command}`);
        }
    }

    return variables;
};

// DIGIT #06 MUST BE -7 COMPARED TO DIGIT #05
// DIGIT #07 MUST BE -8 COMPARED TO DIGIT #04
// DIGIT #09 MUST BE +7 COMPARED TO DIGIT #08
// DIGIT #11 MUST BE +5 COMPARED TO DIGIT #10
// DIGIT #12 MUST BE +2 COMPARED TO DIGIT #03
// DIGIT #13 MUST BE -3 COMPARED TO DIGIT #02
// DIGIT #14 MUST BE -2 COMPARED TO DIGIT #01

const numbers = [
    99799212949967,
    34198111816311,
];

for (number of numbers) {
    const inputs = String(number).split('').map(n => parseInt(n));

    if (inputs.includes(0)) {
        continue;
    }

    const output = run(inputs, instructions);

    if (output.get('z') === 0) {
        console.log({number});
    }
}

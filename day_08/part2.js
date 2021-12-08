require('../array');

const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    // .split(',').map(v=>parseInt(v))

const updateWires = function (decoded, wires) {
    if (! wires.has('a') && decoded.has(1) && decoded.has(7)) {
        // if we have 7 and 1 - then we can solve 'aaaa'
        const one = decoded.get(1);
        const seven = decoded.get(7);
        // a => whatever not in '1'
        for (let i = 0; i < seven.length; i++) {
            if (! one.includes(seven.charAt(i))) {
                wires.set('a', seven.charAt(i));
                break;
            }
        }
    }

    // if (! wires.has('d') && decoded.has(4) && decoded.has(6)) {
    //     const four = decoded.get(4);
    //     const six = decoded.get(6);

    //     console.log({four, six});
    // }
};

const isSix = function (candidate, one) {
    for (let i = 0; i < one.length; i++) {
        if (! candidate.includes(one.charAt(i))) {
            return true;
        }
    }

    return false;
};

const isNine = function (candidate, four) {
    for (let i = 0; i < four.length; i++) {
        if (! candidate.includes(four.charAt(i))) {
            return false;
        }
    }

    return true;
};

const isThree = function (candidate, one) {
    for (let i = 0; i < one.length; i++) {
        if (! candidate.includes(one.charAt(i))) {
            return false;
        }
    }

    return true;
};

const isTwo = function (candidate, nine) {
    // remove everything from the candiate that also exists in nine
    const segments = candidate.split('').filter(function (char) {
        return ! nine.includes(char);
    });

    // if empty, it's 5, if not empty, it's 2
    return segments.length > 0 ? true : false;
};

const decode = function (decoded, numbers) {
    console.log({decoded, numbers});

    const mappings = new Map;

    for (const [key, value] of decoded) {
        mappings.set(value.split('').sort().join(''), key);
    }

    return parseInt(numbers.map(function (number) {
        return mappings.get(number.split('').sort().join(''));
    }).join(''));
};

const answers = lines.map(function (line) {
    const decoded = new Map;
    const wires = new Map;

    const [input, output] = line.split(' | ');

    const encoded = input.split(' ').sort(function (a, b) {
        const al = a.length;
        const bl = b.length;

        if (al === bl) {
            return 0;
        }

        return al > bl
            ? 1
            : -1;
    });

    // decode all input

    while (encoded.length > 0) {
        // find the easy numbers first
        const value = encoded.shift();

        // try to decode it, if not possible yet, put it back onto encoded

        if (value.length === 2) {
            decoded.set(1, value);
        } else if (value.length === 4) {
            decoded.set(4, value);
        } else if (value.length === 7) {
            decoded.set(8, value);
        } else if (value.length === 3) {
            decoded.set(7, value);
        } else {
            if (value.length === 6) {
                // lenght of 6 can be either 0, 6 or 9
                // six can be solved if we have 1
                // six is the only not containing the wires used by 1
                if (decoded.has(1) && isSix(value, decoded.get(1))) {
                    decoded.set(6, value);
                } else if(decoded.has(6) && decoded.has(4)) {
                    // if we already have the 6, and the 4, we can figure out 9
                    // only 0 and 9 remaining, only 9 contains all of 4
                    if (isNine(value, decoded.get(4))) {
                        decoded.set(9, value);
                    } else {
                        decoded.set(0, value);
                    }
                } else {
                    encoded.push(value);
                }
            } else {
                // length is 5 (number is 2, 3 or 5)
                if (decoded.has(1) && isThree(value, decoded.get(1))) {
                    decoded.set(3, value);
                } else if(decoded.has(9)) {
                    if (isTwo(value, decoded.get(9))) {
                        decoded.set(2, value);
                    } else {
                        decoded.set(5, value);
                    }
                } else {
                    encoded.push(value);
                }
            }
            // encoded.push(value);
        }

        // calculate wires
        // updateWires(decoded, wires);
    }

    // console.log({encoded, decoded});

    // answer += wanted.length;

    return decode(decoded, output.split(' '));
});

console.log(answers.sum());

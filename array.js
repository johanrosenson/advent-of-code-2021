String.prototype.rows = function (delimiter = '\n') {
    return this.split(delimiter);
};

range = function (start, stop, step = 1) {
    const arrayLike = {
        length: (Math.max(start, stop) - Math.min(start, stop)) / step + 1
    };

    return Array.from(arrayLike, function (element, index) {
        return start < stop
            ? start + (index * step)
            : start - (index * step);
    });
};

Array.prototype.sum = function () {
    // the sum of the array
    return [...this].reduce((n, carry) => n + carry, 0);
};

Array.prototype.product = function () {
    // the product of the array
    return [...this].reduce((n, carry) => n * carry, 1);
};

Array.prototype.min = function () {
    // the min value of the array
    return this.length === 0
        ? null
        : [...this].numsort()[0];
};

Array.prototype.max = function () {
    // the max value of the array
    return this.length === 0
        ? null
        : [...this].numsort()[this.length - 1];
};

Array.prototype.numeric = function () {
    // cast all values to integers
    return [... this].map((n) => parseInt(n));
};

Array.prototype.numsort = function () {
    // sort array numerical
    return [... this].sort((a, b) => a - b);
};

Array.prototype.consecutiveAddends = function (sum, minNumbers, maxNumbers = null) {
    // any X[-X] consecutive numbers that add to a specific sum, returns array of those numbers
    const input = [...this];

    for (let i = 0, imax = input.length; i < imax; i++) {
        const numbers = [];

        while (numbers.sum() < sum && numbers.length < (maxNumbers || input.length - i)) {
            numbers.push(input[i + numbers.length]);

            if (numbers.sum() === sum && numbers.length >= minNumbers) {
                return numbers;
            }
        }
    }

    return null;
};

// Array.prototype.addends = function (sum, minNumbers, maxNumbers = null) {
//     // any X(-X) numbers that add to a specific sum, returns array
//     [...this].forEach(function (num1, index1) {
//         numbers.slice(index1).forEach(function (num2, index2) {

//         });
//     });

//     return numbers;

//     const permutate = function (input) {
//         let allPermutations = [];

//         console.log({
//             input: input,
//         });

//         for (let i = 0, imax = input.length - 1; i < imax; i++) {
//             const permutations = permutate([...input].slice(i + 1));

//             console.log({
//                 permutations: permutations,
//             });

//             allPermutations.push(permutations);
//         }

//         return allPermutations;
//     };

//     for (let i = 0, imax = (this.length - minNumbers + 1); i < imax; i++) {
//         const permutations = [this[i], ...permutate([...this].slice(i))];

//         console.log([
//             this[i],
//             permutations,
//         ]);
//     }
// };

Array.prototype.unique = function () {
    // only keep unique values of the array
    return [...this].filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
};

Array.prototype.all = function (callback) {
    // if all values of the array pass a truth test
    return ! [...this].some((value) => ! callback(value));
};

// const test = [
//     2, 1, 3, 4,
// ];

// console.log([
//     test,
//     test.addends(5, 2, 2),
// ]);

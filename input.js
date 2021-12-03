const fs = require('fs');
const path = require('path');
const https = require('https');

const getInput = async function (day) {
    const url = `https://adventofcode.com/2021/day/${day}/input`;

    // console.log({response});

    return [];
};

const getExample = function (day) {
    console.log('get example');
};

const getCookie = function () {
    return fs.readFileSync(path.resolve('../session.cookie'), 'utf8');
};

const parseInput = function (input) {
    return fs.readFileSync(input, 'utf8')
        .split('\n');
};

exports.getInput = getInput;
exports.getExample = getExample;

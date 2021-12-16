require('../array');

console.time('part2');

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim()

console.log({input});

// The first step of decoding the message is to convert the hexadecimal representation into binary.
// Each character of hexadecimal corresponds to four bits of binary data

const HexToBinary = function (input) {
    return input.split('')
        .map(function (c) {
            return parseInt(c, 16).toString(2).padStart(4, '0');
        })
        .join('');
};

const getNextBits = function (packet, bits) {
    const output = [];

    while (bits-- > 0) {
        output.push(packet.shift());
    }

    return output;
};

const parseHeader = function (header) {
    const version = parseInt(getNextBits(header, 3).join(''), 2);
    const typeId = parseInt(getNextBits(header, 3).join(''), 2);

    return [
        version,
        typeId,
    ];
};

const getPacketHeader = function (packet) {
    return getNextBits(packet, 6);
};

const TYPE_SUM = 0;
const TYPE_PRODUCT = 1;
const TYPE_MINIMUM = 2;
const TYPE_MAXIMUM = 3;
const TYPE_LITERAL_VALUE = 4;
const TYPE_GREATER_THAN = 5;
const TYPE_LESS_THAN = 6;
const TYPE_EQUAL_TO = 7;

const parsePacket = function (packet) {
    const header = getPacketHeader(packet);

    const [version, typeId] = parseHeader(header);

    // console.log({
    //     packet,
    //     version,
    //     typeId,
    // });

    if (typeId === TYPE_LITERAL_VALUE) {
        const groups = [];

        let groupPrefix;

        do {
            const group = getNextBits(packet, 5);

            groupPrefix = getNextBits(group, 1).pop();
            const groupBody = getNextBits(group, 4); // the remaining bits

            groups.push(groupBody.join(''));
        } while (groupPrefix !== 0);

        return parseInt(groups.join(''), 2);
    } else { // operator package
        const lengthTypeId = getNextBits(packet, 1).pop();

        const subPackets = [];

        if (lengthTypeId === 0) {
            // If the length type ID is 0, then the next 15 bits are a number that represents
            // the total length in bits of the sub-packets contained by this packet.

            const lengthOfSubPackets = parseInt(getNextBits(packet, 15).join(''), 2);

            const subPacketsBits = getNextBits(packet, lengthOfSubPackets);

            while (subPacketsBits.length > 0) {
                subPackets.push(
                    parsePacket(subPacketsBits),
                );
            }
        } else {
            // If the length type ID is 1, then the next 11 bits are a number that represents
            // the number of sub-packets immediately contained by this packet.

            const numberOfSubPackets = parseInt(getNextBits(packet, 11).join(''), 2);

            for (let i = 0; i < numberOfSubPackets; i++) {
                subPackets.push(
                    parsePacket(packet),
                );
            }
        }

        switch (typeId) {
            case TYPE_SUM:
                return subPackets.sum();

            case TYPE_PRODUCT:
                return subPackets.product();

            case TYPE_MINIMUM:
                return subPackets.min();

            case TYPE_MAXIMUM:
                return subPackets.max();

            case TYPE_GREATER_THAN:
                return subPackets[0] > subPackets[1]
                    ? 1
                    : 0;

            case TYPE_LESS_THAN:
                return subPackets[0] < subPackets[1]
                    ? 1
                    : 0;

            case TYPE_EQUAL_TO:
                return subPackets[0] === subPackets[1]
                    ? 1
                    : 0;
        }
    }
};

const packet = HexToBinary(input).split('').map(n=>parseInt(n));

const output = parsePacket(packet);

console.log({
    output,
});

console.timeEnd('part2');

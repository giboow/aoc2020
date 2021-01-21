import dirname from "es-dirname";
import fs from "fs";
import {resolve} from "path";

/**
 * Advent of code 2020
 * Day4 : https://adventofcode.com/2020/day/4
 * Input source : https://adventofcode.com/2020/day/4/input
 * @author Philippe Gibert <philippe.gibert@gmail.com> aka giboow
 */

// Read file and create a array contains data
const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8');

const keysTofind = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let validCounter = 0;
fileInput.split('\n\n').map(value => {
    const keysArray = value.replaceAll('\n', ' ')
        .split(' ')
        .map(v => v.split(':')[0])
        .filter(v => keysTofind.includes(v));
    const unique = [...new Set(keysArray)];

    if (unique.length == keysTofind.length) {
        validCounter++;
    }

});

console.log(validCounter);


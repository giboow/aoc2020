import fs from "fs";
import {resolve} from "path";
import dirname from "es-dirname";

/**
 * Advent of code 2020
 * Day6 : https://adventofcode.com/2020/day/6
 * Input source : https://adventofcode.com/2020/day/6/input
 * @author Philippe Gibert <philippe.gibert@gmail.com> aka giboow
 */

// Read file and create a array contains data
const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8');
const group = fileInput.split('\n\n').filter(value => value.length > 0);

let counter = 0;
group.forEach(value => {
    const differentValues = new Set();
    value.replaceAll('\n', '').split('').forEach(v => differentValues.add(v));

    counter += differentValues.size;
});

console.log('Result part 1 :', counter);

let counter2 = 0;
group.forEach(value => {
    const nbLines = value.split('\n').filter(value => value.length > 0).length;
    const results = new Map();
    value.replaceAll('\n', '')
        .split('')
        .forEach(v => results.set(v, (results.get(v) || 0) + 1));


    let countValid = 0;
    results.forEach(v => {
        if (v === nbLines) {
            countValid++
        }
    });
    counter2 += countValid;

});

console.log('Result part 2 :', counter2);





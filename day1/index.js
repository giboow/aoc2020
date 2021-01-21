import fs from 'fs';
import {resolve} from 'path'
import dirname from 'es-dirname';

/**
 * Advent of code 2020
 * Day1 : https://adventofcode.com/2020/day/1
 * Input source : https://adventofcode.com/2020/day/2/input
 * @author Philippe Gibert <philippe.gibert@gmail.com> aka giboow
 */

// Read file and create a array contains data
const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8')
const data = fileInput.split("\n").map(value => parseInt(value, 10));

// For each data, search a number wich sum with data is equal to 2020, then display the multiplication of the two numbers
const targetNumber = 2020;
for(const d of data) {
    const searchNumber = targetNumber - d;
    if (data.includes(searchNumber)) {
        const result = d * searchNumber;
        console.log("Result is : ", result);
        break;
    }
}
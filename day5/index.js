import fs from "fs";
import {resolve} from "path";
import dirname from "es-dirname";

/**
 * Advent of code 2020
 * Day5 : https://adventofcode.com/2020/day/5
 * Input source : https://adventofcode.com/2020/day/5/input
 * @author Philippe Gibert <philippe.gibert@gmail.com> aka giboow
 */

// Read file and create a array contains data
const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8');
const seats = fileInput.split('\n').filter(value => value.length > 0);

const maxCol = 64;
const maxRow = 127;

const calcValues = [];
seats.forEach(value => {
    let colMax = 7;
    let colMin = 0;
    let rowMax = 127;
    let rowMin = 0;

    const sequence = value.split('');
    sequence.forEach((cmd) => {
        switch (cmd) {
            case 'F' :
                rowMax = Math.floor((rowMax - rowMin) / 2) + rowMin;
                break;
            case 'B' :
                rowMin = Math.ceil((rowMax - rowMin) / 2) + rowMin;
                break;
            case 'R' :
                colMin = Math.ceil((colMax - colMin) / 2) + colMin;
                break;
            case 'L' :
                colMax = Math.floor((colMax - colMin) / 2) + colMin;
                break;
        }
    });
    const calc = rowMax * 8 + colMin;
    calcValues.push(calc);
});

console.log("Result :", Math.max(...calcValues));

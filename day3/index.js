import dirname from "es-dirname";
import fs from "fs";
import {resolve} from "path";

/**
 * Advent of code 2020
 * Day3 : https://adventofcode.com/2020/day/3
 * Input source : https://adventofcode.com/2020/day/3/input
 * @author Philippe Gibert <philippe.gibert@gmail.com> aka giboow
 */

// Read file and create a array contains data
const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8')
const map = fileInput.split("\n").map(value => value.split(''));

const func = (incCol, incRow) => {
    let pointer = 0;
    let treeCounter = 0;
    const mapWidth = map[0].length;
    map.forEach((value, idx) => {
        if(idx % incRow !== 0) {
           // console.log(value.join(''))
            return;
        }

        // If the pointer is on a tree, inc the tree counter
        if (value[pointer] === '#') {
            treeCounter++;
        }

        // Increment pointer,
        // if the pointer is out of map width, restart a the good position of the next line
        pointer += incCol;
        if (pointer >= mapWidth) {
            pointer = pointer - mapWidth;
        }

    });
    console.log(incCol, incRow, treeCounter);
    return treeCounter;
};
console.log(func(3, 1));
console.log(
    func(1, 1) *
    func(3, 1) *
    func(5, 1) *
    func(7, 1) *
    func(1, 2)
);


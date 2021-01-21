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

let pointer = 0;
let treeCounter = 0;
const mapWidth = map[0].length;
map.forEach(value => {

    // If the pointer is on a tree, inc the tree counter
    if (value[pointer] === '#') {
        treeCounter++;
        value[pointer] = 'X';
    } else {
        value[pointer] = '0';
    }

    // Increment pointer,
    // if the pointer is out of map width, restart a the good position of the next line
    pointer +=3;
    if (pointer >= mapWidth) {
       pointer = pointer - mapWidth;
    }

    console.log(value.join(''))
});

console.log(treeCounter);
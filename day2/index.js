import dirname from "es-dirname";
import fs from "fs";
import {resolve} from "path";

/**
 * Advent of code 2020
 * Day2 : https://adventofcode.com/2020/day/2
 * Input source : https://adventofcode.com/2020/day/2/input
 * @author Philippe Gibert <philippe.gibert@gmail.com> aka giboow
 */

// Read file and create a array contains data
const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8')

let countValid = 0; // Valid passwords
let countLineProcessed = 0; // Line processed

// Split line into params (min)-(max) (char): (value) : "15-19 k: kkkkkkkkkkkkzkkkkkkk" => {min:15, max:19, char:k, value: "kkkkkkkkkkkkzkkkkkkk"}
// see Regex analyse : https://regex101.com/r/VLfDBm/2
// And check if password is valid
let resultLine; // Regex result line
const regex = /(?<min>\d*)-(?<max>\d*)\s(?<char>[a-z]):\s(?<value>.*)/gm;
while (( resultLine = regex.exec(fileInput)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (resultLine.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    const {min, max, char, value} = resultLine.groups;

    // If password is valid, increment counter
    const countOccurence = value.match(new RegExp(char, 'gi'))?.length || 0;
    if(countOccurence >= min && countOccurence <= max) {
       countValid++;
    }

    // Increment counter of lines processed
    countLineProcessed++;
}


console.log("Passwords verified: ", countLineProcessed)
console.log("Valid passwords: ", countValid)
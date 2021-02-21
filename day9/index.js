import fs from "fs";
import {resolve} from "path";
import dirname from "es-dirname";

const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8');
const lines = fileInput.split("\n").filter(value => value.length > 0).map(value => parseInt(value, 10));


/**
 * Test value part 1
 */
const isValidValue = (valueToTest, preambleValues) => {
    for (const [index, value] of preambleValues.entries()) {
        if (valueToTest > value) {
            const diff = valueToTest - value;
            if (preambleValues.includes(diff)) {
                return true;
            }
        }
    }
    return false;
}


// Part 1
let resultPart1;
const preambleLenght = 25;
for (const [i, v] of lines.entries()) {
    if (i < preambleLenght) {
        continue;
    }
    const preambleValues = lines.slice(i - preambleLenght, i);

    if (!isValidValue(v, preambleValues)) {
        resultPart1 = v;
        break;
    }
}

console.log(resultPart1);


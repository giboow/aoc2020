import fs from 'fs';
import {dirname, resolve} from 'path'
import { fileURLToPath } from 'url';

// Read file and create a array contains data
const __dirname = dirname(fileURLToPath(import.meta.url));
const fileInput = fs.readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
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
import fs from 'fs';
import {dirname, resolve} from 'path'
import { fileURLToPath } from 'url';

// Read file and create a array contains data
export const __dirname = dirname(fileURLToPath(import.meta.url));
const fileInput = fs.readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
const data = fileInput.split("\n").map(value => parseInt(value, 10));

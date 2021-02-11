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

console.log("Part 1 : ", validCounter);


// Part 2
const specif = {
    'byr': (val) => val >= 1920 && val <= 2002,
    'iyr': (val) => val >= 2010 && val <= 2020,
    'eyr': (val) => val >= 2020 && val <= 2030,
    'hgt': (val) => {
        const regex = /(?<mesure>\d.*)(?<unit>cm|in)/gm;
        const rgxRes = regex.exec(val);
        if (rgxRes != null) {
            const {mesure, unit} = rgxRes.groups;
            const mesureInt = parseInt(mesure, 10);
            if (unit === 'cm') {
                return mesureInt >= 150 && mesureInt <= 193;
            } else if (unit === 'in') {
                return mesureInt >= 59 && mesureInt <= 76;
            }
        }
        return false;
    },
    'hcl': (val) => /^\#[0-9a-f]{6}$/gm.exec(val) !== null,
    'ecl': (val) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
    'pid': (val) => /^(?=.{9}$)([0-9]*)$/gm.exec(val) !== null,
    'cid': (val) => true,

}
let validCounter2 = 0;
fileInput.split('\n\n').map(value => {
    const keysArray = value.replaceAll('\n', ' ')
        .split(' ')
        .filter(v => {
            const [key, val] = v.split(':');
            return keysTofind.includes(key) && specif[key](val)
        });
    const unique = [...new Set(keysArray)];

    if (unique.length == keysTofind.length) {
        validCounter2++;
    }

});

console.log("Part 2 : ", validCounter2);

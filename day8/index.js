import fs from "fs";
import {resolve} from "path";
import dirname from "es-dirname";
import _ from 'lodash';

const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8');
const lines = fileInput.split("\n").filter(value => value.length > 0);

let data = lines.map(value => {
    const res = /^(?<inst>[a-z]{3}) (?<op>(\+|\-))(?<val>\d*)$/gm.exec(value);
    const {inst, op, val} = res.groups;
    return {inst, op, val: parseInt(val, 10), visit: 0};
});


let index = 0;
let d = data[index];
let value = 0;
let visit = 0;
do {
    d.visit++;
    visit = d.visit;
    if (d.inst === 'nop') {
        index++;
    } else if (d.inst === 'jmp') {
        if (d.op === '+') {
            index += d.val;
        } else {
            index -= d.val;
        }
    } else if (d.inst === "acc") {
        if (d.op === '+') {
            value += d.val;
        } else {
            value -= d.val;
        }
        index++;
    }
    d = data[index];
} while (visit <= 1)

console.log("Par 1 : ", value);


// PART 2 - Brut force method, test all solutions

const search = (dataArray) => {
    let indexSearch = 0;
    let d = dataArray[indexSearch];
    let value = 0;
    let visited = [];
    do {
        visited.push(indexSearch);

        if (d.inst === 'nop') {
            indexSearch++;
        } else if (d.inst === 'jmp') {
            if (d.val === 0) {
                break;
            }
            if (d.op === '+') {
                indexSearch += d.val;
            } else {
                indexSearch -= d.val;
            }
        } else if (d.inst === "acc") {
            if (d.op === '+') {
                value += d.val;
            } else {
                value -= d.val;
            }
            indexSearch++;
        }
        try {
            d = dataArray[indexSearch];
        } catch (e) {
            consol.log(e);
            d = null
        }

    } while (!visited.includes(indexSearch) && d != null)

    if(indexSearch === dataArray.length) {
        return value;
    } else {
        return null;
    }
}


let data2 = lines.map(value => {
    const res = /^(?<inst>[a-z]{3}) (?<op>(\+|\-))(?<val>\d*)$/gm.exec(value);
    const {inst, op, val} = res.groups;
    return {inst, op, val: parseInt(val, 10)};
});

for (const d in data2) {
    if(['nop', 'jmp'].includes(data2[d].inst)) {
        const dataToTest = _.cloneDeep(data2);

        dataToTest[d].inst = dataToTest[d].inst  === 'nop' ? 'jmp' : 'nop';
        const result = search(dataToTest);
        if (result != null ) {
            console.log("Par 2 : ", result);
            break;
        }
    }
}

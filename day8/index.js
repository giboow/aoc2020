import fs from "fs";
import {resolve} from "path";
import dirname from "es-dirname";

const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8');
const lines = fileInput.split("\n").filter(value => value.length >0);

const data = lines.map(value => {
   const res = /^(?<inst>[a-z]{3}) (?<op>(\+|\-))(?<val>\d*)$/gm.exec(value);
    const {inst, op, val} = res.groups;
    return {inst, op, val : parseInt(val, 10), visit: 0};
});



let index = 0;
let d = data[index];
let value = 0;
let visit = 0;
do {
    const currentD = d;
    d.visit++;
    visit = d.visit;
    if (d.inst === 'nop') {
        index++;
    } else if(d.inst === 'jmp') {
        if(d.op === '+') {
            index += d.val;
        } else {
            index -= d.val;
        }
    } else if(d.inst === "acc") {
        if (d.op === '+') {
            value += d.val;
        } else {
            value -= d.val;
        }
        index++;
    }
    d = data[index];
    console.log(currentD, value);
} while (visit <=1)

console.log(value);
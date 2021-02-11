import fs from "fs";
import {resolve} from "path";
import dirname from "es-dirname";

const fileInput = fs.readFileSync(resolve(dirname(), 'input.txt'), 'utf-8');
const lines = fileInput.split("\n");

const rules = {};

lines.filter(value => value.length > 0).forEach(value => {
    const [colorBag, bagsDef] = value.split(' contain ');
    const bags = bagsDef && bagsDef.split(", ").map(b => {
        const regexRes = /^(?<num>\d)\s(?<descr>(\w|\s)*)\.?$/gm.exec(b);
        if (regexRes) {
            const {num, descr} = regexRes.groups;
            return {num: parseInt(num, 10), descr: descr.trim().replace("bags", "bag")};
        } else {
            return;
        }
    }).filter(value1 => value1 != undefined);
    const key = colorBag.replace('bags', 'bag');
    rules[key] = bags;
});


//const canCarry = rules.filter(value => value.bags.length && value.bags.filter(b => b.descr === 'xf').length).map(value => value.colorBag);

const hasShinyFunc = (value) => {

    if (!value || !value.length) {
        return false;
    } else {

        return value.map(v => v.descr).includes('shiny gold bag') || value.filter(v => {
            return hasShinyFunc(rules[v.descr])
        }).length > 0;
    }
}
// Count bags wich contains at least one shiny gold bag
const countShinyGoldBag = Object.entries(rules).reduce((acc, [key, value]) => {
    const isValid = hasShinyFunc(value);

    if (isValid) {
        acc++;
    }
    return acc;
}, 0);

console.log("Part 1", countShinyGoldBag);



const countDescedentBags = (value) => {

    if (!value || !value.length) {
        return 1;
    } else {
        return value.reduce((acc, cur) => {
            return acc + cur.num  * countDescedentBags(rules[cur.descr]);
        }, 1);
    }
}
// Count bags wich contains at least one shiny gold bag
const mainRule = rules['shiny gold bag'];
const countDescendantOfShinyGoldBag = countDescedentBags(mainRule) - 1; // the shiny gold bag is not taken into account.


console.log("Part 2", countDescendantOfShinyGoldBag);
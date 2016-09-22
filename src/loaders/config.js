import fs from "fs";
import path from "path";
import dot from "dot";
import snakeToCamel from 'lib/snake-to-camel';

const dir = `${__dirname}/../config`;
const ext = '.json';

dot.templateSettings.varname = 'env';

function filter(filename) {
    return path.extname(filename) === ext;
}

function mapping(filename) {
    var module = fs.readFileSync(`${dir}/${filename}`);

    return {
        name: snakeToCamel(path.basename(filename, ext)),
        module: JSON.parse(dot.template(module)(process.env))
    };

}

function reduce(prev, curr) {
    prev[curr.name] = curr.module;
    return prev;
}

module.exports = fs.readdirSync(dir).filter(filter).map(mapping).reduce(reduce, {});

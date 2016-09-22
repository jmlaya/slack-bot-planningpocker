import fs from "fs";
import path from "path";
import snakeToCamel from 'lib/snake-to-camel';

const dir = `${__dirname}/../middlewares`;
const ext = '.js';

function filter(filename) {
    return path.extname(filename) === ext;
}

function mapping(filename) {
    return {
        name: snakeToCamel(path.basename(filename, ext)),
        module: require(`${dir}/${filename}`)
    };
}

function reduce(prev, curr) {
    prev[curr.name] = curr.module;
    return prev;
}

module.exports = fs.readdirSync(dir).filter(filter).map(mapping).reduce(reduce, {});

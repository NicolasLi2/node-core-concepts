const fs = require('node:fs');

const content = fs.readFileSync('./text.txt');

console.log(content); // <Buffer 54 68 69 73 20 69 73 20 73 6f 6d 65 20 72 61 6e 64 6f 6d 20 74 65 78 74 2e>
console.log(content.toString()); // This is some random text.

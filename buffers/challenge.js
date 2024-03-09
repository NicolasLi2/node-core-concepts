// write "0100 1000 0110 1001 0010 0001" to buffer and using utf-8 encoding, print the string
const { Buffer } = require('node:buffer');

// first way
const buff1 = Buffer.alloc(3);
// buff1[0] = 0b01001000;
// buff1[1] = 0b01101001;
// buff1[2] = 0b00100001;
buff1[0] = 0x48;
buff1[1] = 0x69;
buff1[2] = 0x21;

console.log(buff1.toString('utf-8')); // Hi!

// second way
const buff2 = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff2.toString('utf-8')); // Hi!

// third way
const buff3 = Buffer.from('486921', 'hex');
console.log(buff3.toString('utf-8')); // Hi!

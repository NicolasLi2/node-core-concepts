const { Buffer } = require('node:buffer');

const memoryContainer = Buffer.alloc(4); // 4 bytes (32 bits)

console.log(memoryContainer); // <Buffer 00 00 00 00>

memoryContainer[0] = 0xf4;
memoryContainer[1] = -34; // 0010 0010 reverse the bits and add 1
memoryContainer.writeInt8(-34, 2); // more intuitive way to write the negative number to the buffer

console.log(memoryContainer); // <Buffer f4 de de 00>
console.log(memoryContainer[0]); // 244 (0xf4 in decimal)
console.log(memoryContainer[1]); // 222 (0xde in decimal)
console.log(memoryContainer.readInt8(2)); // -34 (0xde in decimal)
console.log(memoryContainer.toString('hex')); // f4dede00

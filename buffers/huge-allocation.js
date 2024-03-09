const { Buffer, constants } = require('node:buffer');

const buff = Buffer.alloc(0.3e9); // 300MB

console.log(constants.MAX_LENGTH); // 4294967296 (4GB)

setInterval(() => {
  // for (let i = 0; i < buff.length; i++) {
  //   buff[i] = 0x22
  // }

  buff.fill(0x22); // faster than the for loop
}, 5000);

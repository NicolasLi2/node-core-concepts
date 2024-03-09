const { Buffer } = require('node:buffer');

const buff = Buffer.alloc(10000, 0);

const unsafeBuff = Buffer.allocUnsafe(10000); // faster than Buffer.alloc() but it's not safe because it can contain sensitive data from other processes

for (let i = 0; i < unsafeBuff.length; i++) {
  if (unsafeBuff[i] !== 0) {
    console.log(
      `Element at index ${i} is not empty: ${unsafeBuff[i].toString(2)}`
    );
    break;
  }
}

console.log(Buffer.poolSize >>> 1); // 8192 / 2 = 4096

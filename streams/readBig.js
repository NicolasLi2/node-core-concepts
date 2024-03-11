const fs = require('node:fs/promises');

(async () => {
  const fileHandleRead = await fs.open('test.txt', 'r');

  const stream = fileHandleRead.createReadStream();

  stream.on('data', (chunk) => {
    console.log('---------------------------------');
    console.log(chunk.length); // 65536 bytes (64 * 1024)
  });
})();

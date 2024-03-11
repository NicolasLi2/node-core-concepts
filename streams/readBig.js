const fs = require('node:fs/promises');

(async () => {
  const fileHandleRead = await fs.open('test.txt', 'r');
  const fileHandleWrite = await fs.open('dest.txt', 'w');

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  // when read a very large file, you computer may crash
  streamRead.on('data', (chunk) => {
    streamWrite.write(chunk);
  });

  // the best practice to read a very large file is to use pause and resume
  streamRead.on('data', (chunk) => {
    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }
  });
  streamWrite.on('drain', () => {
    streamRead.resume();
  });
})();

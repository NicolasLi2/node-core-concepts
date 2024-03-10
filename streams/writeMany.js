// Write 1 million numbers to a file using async/await and callback version
// using stream version to write 1 million numbers to a file, faster but uses more memory

// Execution time: 10s
// CPU usage: 100% (one core)
// Memory usage: 45MB
const fs = require('node:fs/promises');
(async () => {
  console.time('writeMany');
  const fileHandler = await fs.open('test.txt', 'w');
  for (let i = 0; i < 1000000; i++) {
    await fileHandler.write(` ${i} `);
  }
  console.timeEnd('writeMany');
})();

// Using callback version
// Execution time: 1.8s
// CPU usage: 100% (one core)
// Memory usage: 22MB
const fs2 = require('node:fs');
(async () => {
  console.time('writeMany');
  fs2.open('test.txt', 'w', (err, fd) => {
    for (let i = 0; i < 1000000; i++) {
      fs2.writeSync(fd, ` ${i} `);
      // fs2.write(fd, ` ${i} `, () => {}); // callback version, output not in order, 762MB memory usage!
    }
    console.timeEnd('writeMany');
  });
})();

// Using stream version
// DON'T DO IT THIS WAY!
// Execution time: 250ms
// CPU usage: 100% (one core)
// Memory usage: 200MB!!!
const fs3 = require('node:fs/promises');
(async () => {
  console.time('writeMany');
  const fileHandler = await fs3.open('test.txt', 'w');
  const stream = fileHandler.createWriteStream();
  for (let i = 0; i < 1000000; i++) {
    const buff = Buffer.from(` ${i} `, 'utf-8');
    stream.write(buff);
  }
  console.timeEnd('writeMany');
})();

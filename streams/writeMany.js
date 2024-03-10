// Write 1 million numbers to a file using async/await and callback version

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

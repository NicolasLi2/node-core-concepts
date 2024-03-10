// fs module watch method
// Call back version can be found in official documentation. https://nodejs.org/docs/latest/api/fs.html#fswatchfilename-options-listener

const fs = require('node:fs/promises');

(async () => {
  const watcher = fs.watch('./'); // Can also change to watch a specific file

  for await (const event of watcher) {
    console.log(event);
  }
})();

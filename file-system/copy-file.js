// Three ways to copy a file using the fs module: the Promise API, the Callback API, and the Synchronous API.

// ****** Promise API ****** //
const fs1 = require('node:fs/promises'); // Must manually add ";" at the end of the line
(async () => {
  try {
    await fs1.copyFile('file.txt', 'copied-promise.txt');
  } catch (error) {
    console.log(error);
  }
})();

// ****** Callback API ****** //
const fs2 = require('node:fs');
fs2.copyFile('file.txt', 'copied-callback.txt', (error) => {
  if (error) console.log(error);
});

// ****** Synchronous API ****** //
const fs3 = require('node:fs');
fs3.copyFileSync('file.txt', 'copied-sync.txt');

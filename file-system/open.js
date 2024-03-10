// using the open method of the fs module to create a filehandle instance to read the contents of a file.

const fs = require('node:fs/promises');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      console.log('The file was changed');

      // get the size of the file
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);

      const offset = 0;
      const length = buff.byteLength;
      const position = 0;

      // const content = await commandFileHandler.read(Buffer.alloc(size)); // no data in the buffer

      // read from the first character to the end of the file
      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
      console.log(content);
    }
  }
})();

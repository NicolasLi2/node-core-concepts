// because "All <FileHandle> objects are <EventEmitter>s.", refactoring the code to use the EventEmitter API
const fs = require('node:fs/promises');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    // get the size of the file
    const size = (await commandFileHandler.stat()).size;
    // allocate our buffer with the size of the file
    const buff = Buffer.alloc(size);
    // the location at which we want to start filling out buffer
    const offset = 0;
    // how many bytes we want to read
    const length = buff.byteLength;
    // the position that we want to start reading the file from
    const position = 0;

    // read from the first character to the end of the file
    await commandFileHandler.read(buff, offset, length, position); // after executing this line, the buffer is filled with the file content

    // decoder 01 => meaningful
    // encoder meaningful => 01
    // Node.js only works on character encoder and decoder

    console.log(buff.toString('utf-8'));
  });

  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();

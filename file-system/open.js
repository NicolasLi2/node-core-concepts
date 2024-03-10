// using the fs module to open a file and create a new file if it doesn't exist
const fs = require('node:fs/promises');

(async () => {
  const createFile = async (path) => {
    try {
      // we want to check whether or not we already have that file
      const existingFileHandle = await fs.open(path, 'r');
      existingFileHandle.close();

      // we already have that file...
      return console.log(`The file ${path} already exists`);
    } catch (error) {
      // we don't have the file, now we should create it
      const newFileHandle = await fs.open(path, 'w');
      console.log('A new file has been created');
      newFileHandle.close();
    }
  };
  // commands
  const CREATE_FILE = 'create a file';

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

    const command = buff.toString('utf-8');

    // create a file:
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  // watcher...
  const watcher = fs.watch('./command.txt');
  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();

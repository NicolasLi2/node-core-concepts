// using the fs module to open a file and create a new file if it doesn't exist
const fs = require('node:fs/promises');

(async () => {
  // commands
  const CREATE_FILE = 'create a file';
  const DELETE_FILE = 'delete the file';
  const RENAME_FILE = 'rename the file';
  const ADD_TO_FILE = 'add to the file';

  const createFile = async (path) => {
    try {
      // we want to check whether or not we already have that file
      const existingFileHandle = await fs.open(path, 'r');
      existingFileHandle.close();

      // we already have that file...
      return console.log(`The file ${path} already exists`);
    } catch (error) {
      if (e.code === 'ENOENT') {
        // we don't have the file, now we should create it
        const newFileHandle = await fs.open(path, 'w');
        console.log('A new file has been created');
        newFileHandle.close();
      } else {
        console.log('An error occurred while creating the file');
        console.log(error);
      }
    }
  };

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log('The file was removed');
    } catch (error) {
      if (e.code === 'ENOENT') {
        console.log('No such file');
      } else {
        console.log('An error occurred while removing the file');
        console.log(error);
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log(`Rename ${oldPath} to ${newPath}`);
    } catch (error) {
      if (e.code === 'ENOENT') {
        console.log(
          "No file at this path to rename, or the destination doesn't exist"
        );
      } else {
        console.log('An error occurred while renaming the file');
        console.log(error);
      }
    }
  };

  let addedContent;

  const addToFile = async (path, content) => {
    if (addedContent === content) return;
    try {
      // await fs.appendFile(path, content);
      const fileHandle = await fs.open(path, 'a');
      fileHandle.write(content);
      addedContent = content;
      console.log('Added to file');
    } catch (error) {
      console.log('Failed to add to file');
    }
  };

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

    // delete a file:
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename a file:
    // rename the file <path> to <newPath>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);
      renameFile(oldPath, newPath);
    }

    // add to a file:
    // add to the file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(' this content: ');
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      addToFile(filePath, content);
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

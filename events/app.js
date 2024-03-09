const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on('foo', () => {
  console.log('An event occurred 1.');
});
myE.on('foo', () => {
  console.log('An event occurred 2.');
});
myE.on('foo', (x) => {
  console.log('An event with a parameter occurred.');
  console.log(x);
});
myE.once('bar', () => {
  console.log('bar');
});

myE.emit('foo', 'Hello World!');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');

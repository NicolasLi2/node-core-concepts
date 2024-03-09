```sh
for i in {1..50}; do touch "index$i.html"; done
# create 50 html files
```

```sh
mv *.html html
# move all the html files into the html folder 
```

```sh
nvm alias default 20
# change the default node version

nvm ls-remote
# list all the available node version

node -v > .nvmrc
nvm use
# use the specific node version for the specific project
```

```js
console.log('A');
setTimeout(() => {
  console.log('B');
}, 0);
console.log('C');
console.log('D');
console.log('E');
// The order of the output is A C D E B

console.log('A');
process.nextTick(() => {
  console.log('B');
});
console.log('C');
console.log('D');
console.log('E');
// Same as the previous example, when the main process is done, the event loop will execute the nextTick queue.
```

```js
90 >>> 1  
// shift 90 to the right by 1 bit, the result is (90 / 2) = 45
```


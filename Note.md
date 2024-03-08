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


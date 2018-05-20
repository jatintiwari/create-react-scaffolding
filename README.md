# Node CLI app

* package.json
  * `preferGlobal` indicates that the module is designed to be installed globally, otherwise there will be a warning.
  * `bin` entry adds a mapping between the command used in terminal and the actual JavaScript file that will be run each time this command is invoked
  * `npm link` to symlink the script to `/user/loca/bin/node-cli`

* current versions 
  * `react` => 16.1.0, 16.0.0
  * `redux` => 4.0.0, 3.7.1
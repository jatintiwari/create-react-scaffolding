# Node CLI app

* package.json
  * `preferGlobal` indicates that the module is designed to be installed globally, otherwise there will be a warning.
  * `bin` entry adds a mapping between the command used in terminal and the actual JavaScript file that will be run each time this command is invoked
  * `npm link` to symlink the script to `/user/loca/bin/node-cli`

* API (currently non persistant)
  * `get` => gets contact from the map
  * `add` => adds contact to the map
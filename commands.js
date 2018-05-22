#!/usr/bin/env node

// dependencies
const command = require('node-cmd');
const terminal = require('terminal-kit').terminal;

/* private */
const execAsync = (cmd) => {
  console.log('cmd =>', cmd);
  return new Promise((resolve, reject) => {
    command.get(cmd, resolve);
  });
}
const getAppName = () => {
  return process.argv[2] ? process.argv[2] : 'myapp';
}
/* private end */

// module
const commandsModule = {
  exec: execAsync,
  createFile(fileName) {
    return execAsync(`touch ${fileName}`)
  },
  createDir(dirName) {
    return execAsync(`mkdir ${dirName}`)
  },
  npmInstall(package, version, dev = false) {
    terminal.green(`install: ${package}@${version}\n`);
    return execAsync(`
      cd ${getAppName()} 
      npm i ${dev ? '--save-dev' : '--save'} ${package}@${version}`
    );
  }
}

// exports
module.exports = commandsModule;
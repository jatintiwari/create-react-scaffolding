#!/usr/bin/env node

// dependencies
const command = require('node-cmd');
const terminal = require('terminal-kit').terminal;

// module
const commandsModule = {
  createFile(fileName){
    return new Promise((resolve, reject) => {
      command.get(`touch ${fileName}`, resolve);
    })
  },
  createDir(dirName){
    return new Promise((resolve, reject) => {
      command.get(`mkdir ${dirName}`, resolve);
    })
  },
  npmInstall(package, version){
    terminal.green(`install: ${package}@${version}\n`);
    return new Promise((resolve, reject) => {
      command.get(`npm i --save-dev ${package}@${version}`, resolve);
    })
  }
}

// exports
module.exports = commandsModule;
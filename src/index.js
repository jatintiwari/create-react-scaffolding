#!/usr/bin/env node
"use strict";

/* dependencies */
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');

/* imports */
const { createApp, createAppSubFolderSchema } = require('./createApp');
const { askForVersions, installVersions } = require('./install');
/* imports end*/

/* module */
const init = () => {
  return Promise.resolve();
};

init()
  .then(createApp)
  .then(askForVersions)
  .then(installVersions)
  .then(createAppSubFolderSchema)
  .then(response => terminal.yellow('\n*** end ***') && process.exit())
  .catch((error) => {
    terminal.red('\nSomething went wrong\n')
    console.error(error.message, error.stack);
    process.exit();
  });
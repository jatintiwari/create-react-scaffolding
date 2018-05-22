#!/usr/bin/env node
"use strict";
// dependencies
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');
const { createApp, createAppSubFolderStructure } = require('./createApp');

// constants
const versionMap = {
  'react': ['16.1.0', '16.0.0'],
  'redux': ['4.0.0', '3.7.1']
}
const globalOptions = {};

// Module

/**
 * 
 * @param {String} service 
 * @param {[]} availableVersions 
 * @param {{}} options 
 * @param {function} cb 
 */
const askForVersion = (service = undefined, availableVersions = [], options = {}) => {
  return new Promise((resolve, reject) => {
    terminal.green(`Select ${service} version`);
    terminal.singleColumnMenu(availableVersions, options,  (error, response) => {
      return error ? reject() : resolve({ [service]: response.selectedText });
    })
  });
};

const askForVersions = (previousSelectedValues) => {
  return Object.keys(versionMap).reduce((pr, service) => {
    let versions = versionMap[service];
    return pr.then((selectedVersions) => {
      return askForVersion(service, versions, globalOptions)
      .then((response) => Object.assign({}, selectedVersions, response));
    })
  }, Promise.resolve(previousSelectedValues));
};

const executeCommands = (selectedVersions) => {
  return Object.keys(selectedVersions).reduce((pr, service) => {
    let version = selectedVersions[service];
    return pr.then(() => {
      return new Promise((resolve, reject) => {
        commands.npmInstall(service, version)
          .then(resolve)
          .catch(reject);
      })
    });
  }, Promise.resolve());
};

const init = () => {
  const selectedVersions = {
    react: null,
    redux: null
  }
  return Promise.resolve(selectedVersions);
};

init()
  .then(createApp)
  // .then(askForVersions)
  // .then(executeCommands)
  .then(createAppSubFolderStructure)
  .then(response => terminal.yellow('\n*** end ***') && process.exit())
  .catch((error) => {
    terminal.red('Something went wrong', error.message)
    process.exit();
  });
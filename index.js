#!/usr/bin/env node
"use strict";
// dependencies
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');

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
const askForVersion = (service = undefined, availableVersions = [], options = {}, cb) => {
  terminal.green(`Select ${service} version`);
  terminal.singleColumnMenu(availableVersions, options, cb)
};

const askForVersions = (previousSelectedValues) => {
  return Object.keys(versionMap).reduce((pr, service) => {
    let versions = versionMap[service];
    return pr.then((selectedVersions) => {
      return new Promise((resolve, reject) => {
        askForVersion(service, versions, globalOptions, (error, response) => {
          resolve(Object.assign({}, selectedVersions, { [service]: response.selectedText }))
        });
      });
    })
  }, Promise.resolve(previousSelectedValues));
};

const executeCommands = (selectedVersions) => {
  console.log('Executing commands');
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

const init = function () {
  const selectedVersions = {
    react: null,
    redux: null
  }
  return Promise.resolve(selectedVersions);
};

init()
  .then(askForVersions)
  .then(executeCommands)
  .then(response => process.exit())
  .catch((error) => {
    terminal.red('Something went wrong', error.message)
    process.exit();
  });
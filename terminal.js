#!/usr/bin/env node
"use strict";
// dependencies
const terminal = require('terminal-kit').terminal;

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

const init = function () {
  const selectedVersions = {
    react: null,
    redux: null
  }
  return Promise.resolve(selectedVersions);
};

init()
  .then(askForVersions)
  .then((selectedVersions) => {
    console.log(selectedVersions);
    process.exit();
  }).catch((error) => {
    terminal.red(error.message)
    process.exit();
  });
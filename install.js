/* dependencies */
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');

/* constants */
const versionMap = {
  'react': ['16.1.0', '16.0.0'],
  'redux': ['4.0.0', '3.7.1']
}
const globalOptions = {};

const selectedVersions = {
  react: null,
  redux: null
}

/**
 * @param {String} service 
 * @param {[]} availableVersions 
 * @param {{}} options 
 * @param {function} cb 
 */
const askForVersion = (service = undefined, availableVersions = [], options = globalOptions) => {
  return new Promise((resolve, reject) => {
    terminal.green(`Select ${service} version`);
    terminal.singleColumnMenu(availableVersions, options, (error, response) => {
      return error ? reject() : resolve({ [service]: response.selectedText });
    })
  }).catch(error => {
    terminal.bgRed(error.stack);
  });
};

exports.askForVersions = () => {
  return Object.keys(versionMap).reduce((pr, service) => {
    let versions = versionMap[service];
    return pr.then((selectedVersions) => {
      return askForVersion(service, versions)
        .then((response) => Object.assign({}, selectedVersions, response));
    })
  }, Promise.resolve(selectedVersions)).catch(error => {
    terminal.bgRed(error.stack);
  });
};

exports.installVersions = (selectedVersions) => {
  return Object.keys(selectedVersions).reduce((pr, service) => {
    let version = selectedVersions[service];
    return pr.then(() => {
      return new Promise((resolve, reject) => {
        commands.npmInstall(service, version)
          .then(resolve)
          .catch(reject);
      })
    });
  }, Promise.resolve()).catch(error => {
    terminal.bgRed(error.stack);
  });
};
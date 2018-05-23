/* dependencies */
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');

/* constants */
const versionMap = {
  "react": ["16.0.0", "16.1.0"],
  "redux": ["3.7.1", "4.0.0"],
  "redux-logger": ["3.0.6"],
  "redux-thunk": ["2.2.0"],
  "react-dom": ["16.3.2"],
  "webpack": ["3.11.0", "4.8.3"],
  "webpack-dev-server": ["3.1.4"],
  "react-router-dom": ["4.2.2"]
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
    if(availableVersions.length === 1) return resolve({ [service]: availableVersions[0] });
    terminal.green(`\n Select ${service} version`);
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
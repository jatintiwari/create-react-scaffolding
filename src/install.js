/* dependencies */
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');

/* constants */
const versionMap = {
  "react": {
    versions: ["16.0.0", "16.1.0"],
    dev: false
  },
  "redux": {
    versions: ["3.7.1", "4.0.0"],
    dev: false
  },
  "redux-logger": {
    versions: ["3.0.6"],
    dev: false
  },
  "redux-thunk": {
    versions: ["2.2.0"],
    dev: false
  },
  "react-dom": {
    versions: ["16.3.2"],
    dev: false
  },
  "webpack": {
    versions: ["3.11.0", "4.8.3"],
    dev: false
  },
  "webpack-dev-server": {
    versions: ["3.1.4"],
    dev: false
  },
  "react-router-dom": {
    versions: ["4.2.2"],
    dev: false
  },
  "babel-core": {
    versions: ["6.26.3"],
    dev: true
  },
  "babel-jest": {
    versions: ["22.4.3"],
    dev: true
  },
  "babel-loader": {
    versions: ["7.1.4"],
    dev: true
  },
  "babel-preset-env": {
    versions: ["1.6.1"],
    dev: true
  },
  "babel-preset-react": {
    versions: ["6.24.1"],
    dev: true
  }
}

const globalOptions = {};

/**
 * @param {String} service 
 * @param {[]} availableVersions 
 * @param {{}} options 
 * @param {function} cb 
 */
const askForVersion = (service = undefined, availableVersions = [], options = globalOptions) => {
  return new Promise((resolve, reject) => {
    if (availableVersions.length === 1) return resolve({ [service]: availableVersions[0] });
    terminal.eraseLineBefore().green(`\n select ${service} version`);
    terminal.singleColumnMenu(availableVersions, options, (error, response) => {
      return error ? reject() : resolve({ [service]: response.selectedText });
    })
  }).catch(error => {
    terminal.bgRed(error.stack);
  });
};

exports.askForVersions = () => {
  const selectedVersions = {};
  return Object.keys(versionMap).reduce((pr, serviceName) => {
    let service = versionMap[serviceName];
    let versions = service.versions;
    return pr.then((selectedVersions) => {
      return askForVersion(serviceName, versions)
        .then((response) => Object.assign(selectedVersions, response));
    })
  }, Promise.resolve(selectedVersions)).catch(error => {
    terminal.bgRed(error.stack);
  });
};

exports.installVersions = (selectedVersions) => {
  return Object.keys(selectedVersions).reduce((pr, serviceName) => {
    let version = selectedVersions[serviceName];
    let serv = versionMap[serviceName];
    return pr.then(() => commands.npmInstall(serviceName, version, serv.dev));
  }, Promise.resolve())
    .catch(error => {
      terminal.bgRed(error.stack);
    });
};
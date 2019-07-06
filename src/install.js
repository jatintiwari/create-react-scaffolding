/* dependencies */
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');
const versionMap = require('./versions.json');

/* constants */
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
const askForVersions = (bundleName) => {
  const selectedVersions = {};
  const bundleVersions = Object.keys(versionMap).filter(serviceName => versionMap[serviceName].bundle === bundleName);
  return bundleVersions.reduce((pr, serviceName) => {
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

const installVersions = (selectedVersions) => {
  return Object.keys(selectedVersions).reduce((pr, serviceName) => {
    let version = selectedVersions[serviceName];
    let serv = versionMap[serviceName];
    return pr.then(() => commands.npmInstall(serviceName, version, serv.dev));
  }, Promise.resolve())
    .catch(error => {
      terminal.bgRed(error.stack);
    });
};

exports.askForVersions = askForVersions;

exports.installVersions = installVersions;

exports.checkForExpress = () => {
  return new Promise((resolve, reject) => {
    terminal.white('\nInstall Express?[Y|n]\n')
      .yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, (error, result) => {
        if(result){
          return askForVersions('express-app').then(installVersions).then(resolve.bind(null, result));
        }
      });
  })
}
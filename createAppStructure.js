
// dependencies
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');

// helpers
const getAppName = () => {
  return process.argv[2] ? process.argv[2] : 'myapp';
}

// module
const appConstruct = [{
  name: getAppName(),
  subFolders: [{
    name: 'assets',
    subFolders: [{
      name: 'js',
      files: [{
        name: 'index.js'
      }]
    }, {
      name: 'images'
    }, {
      name: 'css'
    }]
  }]
}];

const checkForDirSubFolders = (dir, dirPath) => {
  if (dir.subFolders && dir.subFolders.length) {
    return createAppStructure(dir.subFolders, dirPath);
  }
  if (dir.files && dir.files.length) {
    return checkForDirFiles(dir, dirPath);
  }
  return false;
}

const checkForDirFiles = (dir, dirPath) => {
  terminal.yellow(`***********************\n`);
  return dir.files.reduce((pr, file) => {
    let filePath = [dirPath, file.name].join("/");
    terminal.green(`[creating] ${filePath}`);
    return commands.createFile(filePath);
  }, Promise.resolve());
}

const createAppStructure = (construct, parentDirName = undefined) => {
  return construct.reduce((pr, dir) => {
    const dirPath = parentDirName !== undefined ? [parentDirName, dir.name].join("/") : dir.name;
    terminal.green(`[creating] ${dirPath} \n`);
    return pr.then(() => {
      return commands.createDir(dirPath)
        .then(checkForDirSubFolders.bind(null, dir, dirPath))
        // .then(resolve)
        .catch(error => {
          terminal.bgRed(` ${error.message} \n ${error.stack}`);
          reject(error);
        });
    })
  }, Promise.resolve());
};

module.exports = createAppStructure.bind(null, appConstruct, undefined)
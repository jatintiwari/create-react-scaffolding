
// dependencies
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');
const { defaultJS, gitIgnore, defaultCSS } = require('./content');

// helpers
const getAppName = () => {
  return process.argv[2] ? process.argv[2] : 'myapp';
}

/* constants */
const CHANGE_FOLDER_CMD = `cd ${getAppName()}`;
const NPM_INIT = `npm init -y`;

const appConstruct = [{
  name: getAppName(),
  cmdPrefix: CHANGE_FOLDER_CMD,
  files: [{
    name: '.gitignore',
    content: [gitIgnore]
  }],
  commandSeries: [NPM_INIT]
}];

const appSubFolderConstruct = [{
  name: 'assets',
  subFolders: [{
    name: 'js',
    files: [{
      name: 'index.js',
      content: [defaultJS]
    }],
    subFolders: [{
      name: 'store',
      files: [{
        name: 'index.js',
        content: [defaultJS]
      }]
    }, {
      name: 'reducers',
      files: [{
        name: 'index.js',
        content: [defaultJS]
      }]
    }, {
      name: 'actions',
      files: [{
        name: 'index.js',
        content: [defaultJS]
      }]
    }]
  }, {
    name: 'images'
  }, {
    name: 'css',
    files: [{
      name: 'index.css',
      content: [defaultCSS]
    }],
  }]
}];
/* constants end */

/* module */
const checkForDirSubFolders = (dir, dirPath) => {
  if (dir.subFolders && dir.subFolders.length) {
    return createConstruct(dir.subFolders, dirPath);
  }
  return false;
}

const checkForDirFiles = (dir, dirPath) => {
  if (!dir.files) return true;
  terminal.yellow(`\n***********************\n`);
  return dir.files.reduce((pr, file) => {
    let filePath = [dirPath, file.name].join("/");
    terminal.green(`[creating] ${filePath}\n`);
    return commands.createFile(filePath)
      .then(() => {
        if (file.content === undefined) return Promise.resolve();
        return commands.addContentToFile(filePath, file.content.join('\n'));
      });
  }, Promise.resolve());
}

const checkForCommandSeries = (dir) => {
  if (dir.commandSeries === undefined) return Promise.resolve();
  return dir.commandSeries.reduce((pr, cmd) => {
    return pr.then((data, error) => {
      let _cmd = [dir.cmdPrefix, cmd].join(' \n ');
      return commands.exec(_cmd);
    })
  }, Promise.resolve());
}

const createConstruct = (construct, parentDirName) => {
  return construct.reduce((pr, dir) => {
    const dirPath = parentDirName !== undefined ? [parentDirName, dir.name].join("/") : dir.name;
    terminal.green(`[creating] ${dirPath} \n\n`);
    return pr.then(() => {
      return commands.createDir(dirPath)
        .then(checkForDirSubFolders.bind(null, dir, dirPath))
        .then(checkForDirFiles.bind(null, dir, dirPath))
        .then(checkForCommandSeries.bind(null, dir))
        .catch(error => {
          terminal.bgRed(`${error.message} \n ${error.stack}`);
          reject(error);
        });
    });
  }, Promise.resolve());
}
/* module ends */
exports.createAppSubFolderStructure = () => {
  return createConstruct(appSubFolderConstruct, getAppName());
};

exports.createApp = () => {
  return createConstruct(appConstruct, undefined);
};

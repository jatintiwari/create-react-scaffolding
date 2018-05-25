
// dependencies
const terminal = require('terminal-kit').terminal;
const commands = require('./commands');
const { CHANGE_FOLDER_CMD, NPM_INIT } = commands;
const { defaults:{ js, css, webpackConfig}, gitIgnore, imports } = require('./content');

// helpers
const getAppName = () => {
  return process.argv[2] ? process.argv[2] : 'myapp';
}

/* constants */
const appConstruct = [{
  name: getAppName(),
  cmdPrefix: CHANGE_FOLDER_CMD,
  files: [{
    name: '.gitignore',
    content: [gitIgnore]
  }, {
    name: 'webpack.config.js',
    content: [webpackConfig]
  }, {
    name: 'README.md',
    content: [`# ${getAppName()}`]
  }],
  commandSeries: [NPM_INIT]
}];

const appSubFolderConstruct = [{
  name: 'src',
  subFolders: [{
    name: 'js',
    files: [{
      name: 'index.js',
      content: [js]
    }],
    subFolders: [{
      name: 'components',
      files: [{
        name: 'index.js',
        content: [js]
      }]
    }, {
      name: 'store',
      files: [{
        name: 'index.js',
        content: [js]
      }]
    }, {
      name: 'reducers',
      files: [{
        name: 'index.js',
        content: [js]
      }]
    }, {
      name: 'actions',
      files: [{
        name: 'index.js',
        content: [js]
      }]
    }]
  }, {
    name: 'images'
  }, {
    name: 'css',
    files: [{
      name: 'index.css',
      content: [css]
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
  return dir.files.reduce((pr, file) => {
    let filePath = [dirPath, file.name].join("/");
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

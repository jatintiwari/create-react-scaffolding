/* contants */
const { CHANGE_FOLDER_CMD, NPM_INIT } = require('./../commands');
const { defaults:{ js, css, webpackConfig}, gitIgnore, imports } = require('./../content');

/* helpers */
const getAppName = () => {
  return process.argv[2] ? process.argv[2] : 'myapp';
}

/* exports */
exports.appSchema = {
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
};

exports.appSubFolderSchema = [{
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
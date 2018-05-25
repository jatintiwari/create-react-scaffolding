// dependencies
const command = require('node-cmd');
const terminal = require('terminal-kit').terminal;

/* private */
const execAsync = (cmd) => {
  // console.log('cmd =>', cmd);
  return new Promise((resolve, reject) => {
    command.get(cmd, resolve);
  });
}
const getAppName = () => {
  return process.argv[2] ? process.argv[2] : 'myapp';
}
/* private end */

// module
const commandsModule = {
  exec: execAsync,
  CHANGE_FOLDER_CMD: `cd ${getAppName()}`,
  NPM_INIT: `npm init -y`,
  createFile(fileName) {
    terminal.cyan(`\n[creating] `).green(`${fileName}`);
    return execAsync(`touch ${fileName}`)
  },
  createDir(dirName) {
    terminal.yellow(`\n[creating] `).green(`${dirName}`);
    return execAsync(`mkdir ${dirName}`)
  },
  npmInstall(package, version, dev = false) {
    terminal.white(`install${dev ? '-dev' : ''}`).green(` ${package}@${version}\n`);
    return execAsync(`
      cd ${getAppName()} 
      npm i ${dev ? '--save-dev' : '--save'} ${package}@${version}`
    );
  },
  addContentToFile(file, content) {
    terminal.white("\n[adding-content] ").blue(`to file: ${file}`);
    return execAsync(`
      echo '${content}' > ${file}
    `)
  }
}

// exports
module.exports = commandsModule;
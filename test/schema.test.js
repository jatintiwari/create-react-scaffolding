/* dependencies */
const fs = require('fs');
const path = require('path');
/**
 * source
 */
const { appSchema, appSubFolderSchema } = require('./../src/schema');

/* helpers */
const getAppName = () => {
  return process.argv[3] ? process.argv[3] : 'myapp';
}


/**
 * tests
 */
const appPath = path.resolve(getAppName());

test('Verify app folder exits', () => {
  const dir = fs.statSync(appPath);
  expect(dir.isDirectory()).toBeTruthy();
});

test('Verify app root files', () => {
  const appSchemaFiles = appSchema.files.map(file => file.name);
  const dirContent = fs.readdirSync(appPath);
  appSchemaFiles.forEach(fileName => expect(dirContent.indexOf(fileName)).toBeGreaterThanOrEqual(0));
});


test('Verify app schema', () => {
  expect.assertions(1);
  const _reduce = (subFolders, pathName) => {
    return subFolders.reduce((pr, subFolder) => {
      let subPathName = path.resolve(pathName, subFolder.name);
      return pr.then(() => {
        if (subFolder.subFolders) {
          return _reduce(subFolder.subFolders, subPathName)
        }
        let dir = fs.statSync(subPathName);

        return dir.isDirectory() ? Promise.resolve(true) : Promise.reject(`'${subPathName}' not found!`);
      });
    }, Promise.resolve());
  }
  return _reduce(
    appSubFolderSchema,
    path.resolve(getAppName())
  ).then((data) => {
    expect(data).toBeTruthy();
  })
  // .catch(error => {
  //   expect(error).toContain('not found!');
  // });
});
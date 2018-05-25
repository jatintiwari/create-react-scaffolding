/**
 * source
 */
const versionsMap = require('./../src/versions.json');

/**
 * output
 */
const packageJSON = require('./../myapp/package.json');
const { dependencies, devDependencies } = packageJSON;

/**
 * tests
 */
test('Verify downloaded package count', () => {
  const packagesRequired = Object.keys(versionsMap).length;
  const packagesDownloaded = [...Object.keys(dependencies), ...Object.keys(devDependencies)].length;
  expect(packagesRequired).toEqual(packagesDownloaded);
});

test('Verify package versions', () => {
  const packagesDownloaded = Object.assign({}, dependencies, devDependencies);
  Object.keys(packagesDownloaded).forEach((packageName) => {
    let packageIndex = versionsMap[packageName].versions.indexOf(packagesDownloaded[packageName].replace('^', ''));
    expect(packageIndex).toBeGreaterThanOrEqual(0);
  });
});
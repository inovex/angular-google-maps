/**
 * Creates a package.json for the release NPM package structure.
 */
const fs = require('fs');
const path = require('path');

const pkgNames = ['core', 'clusterer'];

pkgNames.forEach(function(pkgName) {
  const basePkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

  // define the package name
  basePkgJson.name = `@agm/${pkgName}`

  const pkgJsonFile = `./src/${pkgName}/package.json`;
  if (fs.existsSync(pkgJsonFile)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonFile, 'utf8'));
    Object.keys(pkgJson).forEach(key => {
      basePkgJson[key] = pkgJson[key];
    });
  }

  // remove scripts
  delete basePkgJson.scripts;

  // remove devDependencies (as there are important for the sourcecode only)
  delete basePkgJson.devDependencies;

  basePkgJson.dependencies = {};

  const filepath = path.join(__dirname, `../dist/${pkgName}/package.json`);
  fs.writeFileSync(filepath, JSON.stringify(basePkgJson, null, 2), 'utf-8');
});

const { appSubFolderSchema } = require('./src/schema');

try {
  const reduceFiles = (appSubFolderSchema) => {
    return appSubFolderSchema.reduce((schema, folder) => {
      if (schema[folder.name] === undefined) schema[folder.name] = [];
      if (folder.subFolders) {
        schema[folder.name].push(reduceFiles(folder.subFolders))
      }
      return schema;
    }, {});
  };

  const files = reduceFiles(appSubFolderSchema);
  console.log(JSON.stringify(files, null, 2));
}catch(e){
  console.error(e.message);
}
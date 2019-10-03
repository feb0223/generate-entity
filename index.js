const path = require('path');
const fs = require('fs');
// const _ = require('lodash');
// const GenerateSchema = require('generate-schema');
// const mkdirp = require('mkdirp');

const template = fs.readFileSync(path.join(__dirname, './template/entity.ejs')).toString();
const generator = require('./Generator')(template);

// function getFilePath(jsonPath) {
//   return path.join(path.dirname(process.argv[1]), jsonPath);
// }

module.exports = {
  fromJson: (title, json) => {
    return generator.fromJson(title, json);
  },
  fromSchema: (schema) => {
    return generator.fromSchema(schema);
  },
  // fromJson: function fromJson(jsonPath, outDir) {
  //   const title = _.upperFirst(_.camelCase(path.basename(jsonPath, path.extname(jsonPath))));
  //   const schema = GenerateSchema.json(title, JSON.parse(fs.readFileSync(getFilePath(jsonPath))));
  //   const outFilePath = getFilePath(path.join(outDir, `${title}.js`));
  //   mkdirp.sync(path.dirname(outFilePath));
  //   fs.writeFileSync(outFilePath, generator.fromSchema(schema));
  //   console.log(`generate ${outFilePath}`);
  // },
  // fromJsonSchema: function fromJsonSchema(jsonSchemaPath) {
  //   const schema = JSON.parse(fs.readFileSync(getFilePath(jsonSchemaPath)));
  //   generator.fromSchema(schema);
  // }
};

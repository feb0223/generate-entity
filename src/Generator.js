const GenerateSchema = require('generate-schema');
const _ = require('lodash');
const ejs = require('ejs');
const pluralize = require('pluralize');

let template;

function getChildEntities(schema, childEntities = []) {
  Object.keys(schema.properties).forEach((prop) => {
    let childSchema = schema.properties[prop];
    const type = childSchema.type;
    if (type === 'object') {
      childSchema = Object.assign({}, childSchema, {
        title: schema.title + _.upperFirst(_.camelCase(prop))
      });
    } else if (type === 'array') {
      childSchema = Object.assign({}, childSchema.items, {
        title: schema.title + _.upperFirst(_.camelCase(pluralize.singular(prop)))
      });
    }

    if (type === 'object' || type === 'array') {
      childEntities.push(generate(childSchema, false));
      getChildEntities(childSchema, childEntities);
    }
  });
  return childEntities;
}

function generate(schema, root = true) {
  let childEntities = [];
  if (root) {
    childEntities = getChildEntities(Object.assign({}, schema, {
      title: ''
    }));
  }

  return ejs.render(template, {
    root,
    schema,
    _,
    singular: pluralize.singular,
    childEntities,
  });
}

export default (argTemplate) => {
  template = argTemplate;
  return {
    fromJson: (title, json) => {
      const schema = GenerateSchema.json(title, json);
      console.log(schema)
      return generate(schema);
    },
    fromSchema: (schema) => {
      return generate(schema);
    },
  };
};

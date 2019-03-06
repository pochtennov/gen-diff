import path from 'path';
import yaml from 'js-yaml';

export default (objectName, object) => {
  const objectFormat = path.extname(objectName);
  switch (objectFormat) {
    case '.json':
      return JSON.parse(object);
    case '.yml':
      return yaml.safeLoad(object);
    default:
      return JSON.parse(object);
  }
};

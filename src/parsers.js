import path from 'path';
import yaml from 'js-yaml';

export default (objectName) => {
  const objectFormat = path.extname(objectName);
  switch (objectFormat) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    default:
      return JSON.parse;
  }
};

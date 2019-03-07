import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.decode,
};
export default (fileFormat, fileContent) => parsers[fileFormat](fileContent);

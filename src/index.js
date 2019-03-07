import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';

const genDiff = (firstFilePath, secondFilePath) => {
  const firstConfigFile = fs.readFileSync(firstFilePath, 'utf8');
  const secondConfigFile = fs.readFileSync(secondFilePath, 'utf8');
  const firstConfigFormat = path.extname(firstFilePath);
  const secondConfigFormat = path.extname(secondFilePath);
  const firstConfigObj = parse(firstConfigFormat, firstConfigFile);
  const secondConfigObj = parse(secondConfigFormat, secondConfigFile);

  const objKeys = _.union(_.keys(firstConfigObj), _.keys(secondConfigObj));
  const differenceAst = objKeys.reduce((acc, currentKey) => {
    if (_.has(secondConfigObj, currentKey)) {
      if (_.has(firstConfigObj, currentKey)) {
        if (firstConfigObj[currentKey] === secondConfigObj[currentKey]) {
          return [...acc, {
            keyName: currentKey,
            keyValue: firstConfigObj[currentKey],
            operation: 'not changed',
          }];
        }
        return [...acc, {
          keyName: currentKey,
          keyValueBeforeChange: firstConfigObj[currentKey],
          keyValueAfterChange: secondConfigObj[currentKey],
          operation: 'changed',
        }];
      }
      return [...acc, {
        keyName: currentKey,
        keyValue: secondConfigObj[currentKey],
        operation: 'added',
      }];
    }
    return [...acc, {
      keyName: currentKey,
      keyValue: firstConfigObj[currentKey],
      operation: 'deleted',
    }];
  }, []);

  // Returns a string of differences
  const differenceString = differenceAst.reduce((acc, currentValue) => {
    if (currentValue.operation === 'changed') {
      return [...acc, `  + ${currentValue.keyName}: ${currentValue.keyValueAfterChange}`, `  - ${currentValue.keyName}: ${currentValue.keyValueBeforeChange}`];
    }
    if (currentValue.operation === 'added') {
      return [...acc, `  + ${currentValue.keyName}: ${currentValue.keyValue}`];
    }
    if (currentValue.operation === 'deleted') {
      return [...acc, `  - ${currentValue.keyName}: ${currentValue.keyValue}`];
    }
    return [...acc, `  ${currentValue.keyName}: ${currentValue.keyValue}`];
  }, []);

  return `{\n${differenceString.join('\n')}\n}`;
};

export default genDiff;

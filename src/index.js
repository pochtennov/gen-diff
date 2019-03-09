import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';
import render from './renderers';

const genDiff = (firstFilePath, secondFilePath, outputFormat = 'Object') => {
  const firstConfigFile = fs.readFileSync(firstFilePath, 'utf8');
  const secondConfigFile = fs.readFileSync(secondFilePath, 'utf8');
  const firstConfigFormat = path.extname(firstFilePath);
  const secondConfigFormat = path.extname(secondFilePath);
  const firstConfigObj = parse(firstConfigFormat, firstConfigFile);
  const secondConfigObj = parse(secondConfigFormat, secondConfigFile);

  const genDiffAst = (firstConfObj, secondConfObj) => {
    const objKeys = _.union(_.keys(firstConfObj), _.keys(secondConfObj));
    const differenceAst = objKeys.reduce((acc, currentKey) => {
      if (_.has(firstConfObj, currentKey)) {
        if (_.has(secondConfObj, currentKey)) {
          if (_.isObject(firstConfObj[currentKey]) && _.isObject(secondConfObj[currentKey])) {
            return [...acc, {
              keyName: currentKey,
              children: genDiffAst(firstConfObj[currentKey], secondConfObj[currentKey]),
              nodeType: 'nested',
            }];
          }
          if (firstConfObj[currentKey] === secondConfObj[currentKey]) {
            return [...acc, {
              keyName: currentKey,
              keyValue: firstConfObj[currentKey],
              nodeType: 'not changed',
            }];
          }
          return [...acc, {
            keyName: currentKey,
            keyValueBeforeChange: firstConfObj[currentKey],
            keyValueAfterChange: secondConfObj[currentKey],
            nodeType: 'changed',
          }];
        }
        return [...acc, {
          keyName: currentKey,
          keyValue: firstConfObj[currentKey],
          nodeType: 'deleted',
        }];
      }
      return [...acc, {
        keyName: currentKey,
        keyValue: secondConfObj[currentKey],
        nodeType: 'added',
      }];
    }, []);
    return differenceAst;
  };
  const difference = genDiffAst(firstConfigObj, secondConfigObj);
  return render(difference, outputFormat);
};

export default genDiff;

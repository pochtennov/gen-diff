import _ from 'lodash';
import fs from 'fs';

const genDiff = (firstFilePath, secondFilePath) => {
  const firstConfig = fs.readFileSync(firstFilePath, 'utf8');
  const secondConfig = fs.readFileSync(secondFilePath, 'utf8');
  const firstConfigObj = JSON.parse(firstConfig);
  const secondConfigObj = JSON.parse(secondConfig);

  const objKeys = _.union(Object.keys(firstConfigObj), Object.keys(secondConfigObj));
  const differenceAst = objKeys.reduce((acc, currentKey) => {
    if (_.has(secondConfigObj, currentKey)) {
      if (_.has(firstConfigObj, currentKey)) {
        if (firstConfigObj[`${currentKey}`] === secondConfigObj[`${currentKey}`]) {
          return [...acc, {
            keyName: currentKey,
            valueBeforeChange: firstConfigObj[`${currentKey}`],
            valueAfterChange: secondConfigObj[`${currentKey}`],
            operation: 'no change',
          }];
        }
        return [...acc, {
          keyName: currentKey,
          valueBeforeChange: firstConfigObj[`${currentKey}`],
          valueAfterChange: secondConfigObj[`${currentKey}`],
          operation: 'info change',
        }];
      }
      return [...acc, {
        keyName: currentKey,
        valueBeforeChange: firstConfigObj[`${currentKey}`],
        valueAfterChange: secondConfigObj[`${currentKey}`],
        operation: 'info added',
      }];
    }
    return [...acc, {
      keyName: currentKey,
      valueBeforeChange: firstConfigObj[`${currentKey}`],
      valueAfterChange: secondConfigObj[`${currentKey}`],
      operation: 'info deleted',
    }];
  }, []);

  // Returns a string of differences
  const differenceString = differenceAst.reduce((acc, currentValue) => {
    switch (currentValue.operation) {
      case 'info change':
        return `${acc}\n  + ${currentValue.keyName}: ${currentValue.valueAfterChange}\n  - ${currentValue.keyName}: ${currentValue.valueBeforeChange}`;
      case 'info added':
        return `${acc}\n  + ${currentValue.keyName}: ${currentValue.valueAfterChange}`;
      case 'info deleted':
        return `${acc}\n  - ${currentValue.keyName}: ${currentValue.valueBeforeChange}`;
      default:
        return `${acc}\n  ${currentValue.keyName}: ${currentValue.valueBeforeChange}`;
    }
  }, '');

  return `{${differenceString}\n}`;
};

export default genDiff;

import _ from 'lodash';
import fs from 'fs';

const showDiff = (firstFilePath, secondFilePath) => {
  const firstConfig = fs.readFileSync(firstFilePath, 'utf8');
  const secondConfig = fs.readFileSync(secondFilePath, 'utf8');
  const firstConfigObj = JSON.parse(firstConfig);
  const secondConfigObj = JSON.parse(secondConfig);

  const objKeys = _.union(Object.keys(firstConfigObj), Object.keys(secondConfigObj));
  const differenceAst = objKeys.reduce((acc, currentKey) => {
    if (_.has(secondConfigObj, currentKey)) {
      if (_.has(firstConfigObj, currentKey)) {
        if (firstConfigObj[`${currentKey}`] === secondConfigObj[`${currentKey}`]) {
          acc.push({
            keyName: currentKey,
            valueBeforeChange: firstConfigObj[`${currentKey}`],
            valueAfterChange: secondConfigObj[`${currentKey}`],
            operation: 'no change',
          });
          return acc;
        }
        acc.push({
          keyName: currentKey,
          valueBeforeChange: firstConfigObj[`${currentKey}`],
          valueAfterChange: secondConfigObj[`${currentKey}`],
          operation: 'info change',
        });
        return acc;
      }
      acc.push({
        keyName: currentKey,
        valueBeforeChange: firstConfigObj[`${currentKey}`],
        valueAfterChange: secondConfigObj[`${currentKey}`],
        operation: 'info added',
      });
      return acc;
    }
    acc.push({
      keyName: currentKey,
      valueBeforeChange: firstConfigObj[`${currentKey}`],
      valueAfterChange: secondConfigObj[`${currentKey}`],
      operation: 'info deleted',
    });
    return acc;
  }, []);

  // Returns a string of differences
  const differenceString = differenceAst.reduce((acc, currentValue) => {
    if (currentValue.operation === 'info change') {
      return `${acc}
  + ${currentValue.keyName}: ${currentValue.valueAfterChange}
  - ${currentValue.keyName}: ${currentValue.valueBeforeChange}`;
    } if (currentValue.operation === 'info added') {
      return `${acc}
  + ${currentValue.keyName}: ${currentValue.valueAfterChange}`;
    } if (currentValue.operation === 'info deleted') {
      return `${acc}
  - ${currentValue.keyName}: ${currentValue.valueBeforeChange}`;
    }
    return `${acc}
  ${currentValue.keyName}: ${currentValue.valueBeforeChange}`;
  }, '');
  return `{${differenceString}
}`;
};

export default showDiff;

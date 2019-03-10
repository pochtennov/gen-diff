import _ from 'lodash';

const render = (differenceAst) => {
  const getSpaces = depth => ' '.repeat(2 * depth);

  const stringify = (keyValue, depth) => {
    if (!_.isObject(keyValue)) {
      return `${keyValue}`;
    }
    const objString = Object.keys(keyValue)
      .reduce((accStr, currentKey) => [...accStr, `${getSpaces(depth + 1)}${currentKey}: ${keyValue[currentKey]}`], []);
    return `{\n${objString.join('\n')}\n${getSpaces(depth)}}`;
  };

  const initialDepth = 1;
  const findDifferenceString = (diffAst, depth) => {
    const differenceStr = _.flatten(diffAst.map((element) => {
      switch (element.nodeType) {
        case 'changed':
          return [`${getSpaces(depth)}+ ${element.keyName}: ${stringify(element.keyValueAfterChange, depth)}`,
            `${getSpaces(depth)}- ${element.keyName}: ${stringify(element.keyValueBeforeChange, depth)}`];
        case 'added':
          return `${getSpaces(depth)}+ ${element.keyName}: ${stringify(element.keyValue, depth)}`;
        case 'deleted':
          return `${getSpaces(depth)}- ${element.keyName}: ${stringify(element.keyValue, depth)}`;
        case 'same':
          return `${getSpaces(depth)}  ${element.keyName}: ${stringify(element.keyValue, depth)}`;
        case 'nested':
          return [`${getSpaces(depth)}${element.keyName}: {`, `${findDifferenceString(element.children, depth + 1)}\n${getSpaces(depth)}}`];
        default:
          return 'Error! Something wrong happened during reading the file';
      }
    }));
    return `${differenceStr.join('\n')}`;
  };
  return `{\n${findDifferenceString(differenceAst, initialDepth)}\n}`;
};

export default render;

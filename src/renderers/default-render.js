import _ from 'lodash';

const render = (differenceAst) => {
  const getSpaces = depth => ' '.repeat(2 * depth);

  const stringify = (keyValue, depth) => {
    if (!_.isObject(keyValue)) {
      return `${keyValue}`;
    }
    const objString = Object.keys(keyValue).reduce((accStr, currentKey) => [...accStr, `${getSpaces(depth + 1)}${currentKey}: ${keyValue[currentKey]}`], []);
    return `{\n${objString.join('\n')}\n${getSpaces(depth)}}`;
  };

  const initialDepth = 1;
  const differenceString = (diffAst, depth) => {
    const differenceStr = diffAst.reduce((acc, currentNode) => {
      switch (currentNode.nodeType) {
        case 'changed':
          return [...acc, `${getSpaces(depth)}+ ${currentNode.keyName}: ${stringify(currentNode.keyValueAfterChange, depth)}`, `${getSpaces(depth)}- ${currentNode.keyName}: ${stringify(currentNode.keyValueBeforeChange, depth)}`];
        case 'added':
          return [...acc, `${getSpaces(depth)}+ ${currentNode.keyName}: ${stringify(currentNode.keyValue, depth)}`];
        case 'deleted':
          return [...acc, `${getSpaces(depth)}- ${currentNode.keyName}: ${stringify(currentNode.keyValue, depth)}`];
        case 'not changed':
          return [...acc, `${getSpaces(depth)}  ${currentNode.keyName}: ${stringify(currentNode.keyValue, depth)}`];
        case 'nested':
          return [...acc, `${getSpaces(depth)}${currentNode.keyName}: {`, `${differenceString(currentNode.children, depth + 1)}\n${getSpaces(depth)}}`];
        default:
          return 'Error! Something wrong happened during reading the file';
      }
    }, []);
    return `${differenceStr.join('\n')}`;
  };
  return `{\n${differenceString(differenceAst, initialDepth)}\n}`;
};

export default render;

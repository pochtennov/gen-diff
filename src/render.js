import _ from 'lodash';

const render = (differenceAst) => {
  const getSpaces = (depth) => {
    switch (depth) {
      case 1: return ' '.repeat(2);
      case 2: return ' '.repeat(6);
      case 3: return ' '.repeat(10);
      default: return 'No such depth possible';
    }
  };

  const stringify = (keyValue, depth) => {
    if (_.isObject(keyValue)) {
      const objString = Object.keys(keyValue).reduce((accStr, currentKey) => [...accStr, `${getSpaces(depth + 1)}  ${currentKey}: ${keyValue[currentKey]}`], []);
      return `{\n${objString.join('\n')}\n${getSpaces(depth)}  }`;
    }
    return `${keyValue}`;
  };

  const initialDepth = 1;
  const differenceString = (diffAst, depth) => {
    const differenceStr = diffAst.reduce((acc, currentNode) => {
      if (currentNode.children) {
        return [...acc, `  ${getSpaces(depth)}${currentNode.keyName}: {`, `${differenceString(currentNode.children, depth + 1)}\n${getSpaces(depth)}  }`];
      }
      switch (currentNode.operation) {
        case 'changed':
          return [...acc, `${getSpaces(depth)}+ ${currentNode.keyName}: ${stringify(currentNode.keyValueAfterChange, depth)}`, `${getSpaces(depth)}- ${currentNode.keyName}: ${stringify(currentNode.keyValueBeforeChange, depth)}`];
        case 'added':
          return [...acc, `${getSpaces(depth)}+ ${currentNode.keyName}: ${stringify(currentNode.keyValue, depth)}`];
        case 'deleted':
          return [...acc, `${getSpaces(depth)}- ${currentNode.keyName}: ${stringify(currentNode.keyValue, depth)}`];
        case 'not changed':
          return [...acc, `${getSpaces(depth)}  ${currentNode.keyName}: ${stringify(currentNode.keyValue, depth)}`];
        default:
          return 'Error! Something wrong happened during reading the file';
      }
    }, []);
    return `${differenceStr.join('\n')}`;
  };
  return `{\n${differenceString(differenceAst, initialDepth)}\n}`;
};

export default render;

import _ from 'lodash';

const plainRender = (differenceAst) => {
  const stringify = (keyValue) => {
    if (_.isObject(keyValue)) {
      return '[complex value]';
    }
    if (_.isBoolean(keyValue)) {
      return `${keyValue}`;
    }
    return `'${keyValue}'`;
  };

  const differenceString = (diffAst, nodeParentName) => {
    const diffStr = diffAst.reduce((acc, currentNode) => {
      switch (currentNode.nodeType) {
        case 'changed':
          return [...acc, `Property '${nodeParentName}${currentNode.keyName}' was updated. From ${stringify(currentNode.keyValueBeforeChange)} to ${stringify(currentNode.keyValueAfterChange)}`];
        case 'added':
          return [...acc, `Property '${nodeParentName}${currentNode.keyName}' was added with value: ${stringify(currentNode.keyValue)}`];
        case 'deleted':
          return [...acc, `Property '${nodeParentName}${currentNode.keyName}' was removed`];
        case 'not changed':
          return [...acc];
        case 'nested':
          return [...acc, `${differenceString(currentNode.children, `${nodeParentName}${currentNode.keyName}.`)}`];
        default:
          return 'Error! Something wrong happened during reading the file';
      }
    }, []);
    return `${diffStr.join('\n')}`;
  };
  return differenceString(differenceAst, '');
};

export default plainRender;

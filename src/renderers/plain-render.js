import _ from 'lodash';

const render = (differenceAst) => {
  const stringify = (keyValue) => {
    if (_.isObject(keyValue)) {
      return '[complex value]';
    }
    if (_.isBoolean(keyValue)) {
      return `${keyValue}`;
    }
    return `'${keyValue}'`;
  };

  const findDifferenceString = (diffAst, nodeParentName) => {
    const diffStr = diffAst.map((element) => {
      switch (element.nodeType) {
        case 'changed':
          return `Property '${nodeParentName}${element.keyName}' was updated. From ${stringify(element.keyValueBeforeChange)} to ${stringify(element.keyValueAfterChange)}`;
        case 'added':
          return `Property '${nodeParentName}${element.keyName}' was added with value: ${stringify(element.keyValue)}`;
        case 'deleted':
          return `Property '${nodeParentName}${element.keyName}' was removed`;
        case 'same':
          return '';
        case 'nested':
          return `${findDifferenceString(element.children, `${nodeParentName}${element.keyName}.`)}`;
        default:
          return 'Error! Something wrong happened during reading the file';
      }
    });
    return `${diffStr.filter(element => element !== '').join('\n')}`;
  };
  return findDifferenceString(differenceAst, '');
};

export default render;

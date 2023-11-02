import _ from 'lodash';

const makeString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  if (_.isString(item)) {
    return `'${item}'`
  }
  return String(item)
};
const makePlain = (comparedData, path = '') => {
  const filtredData = comparedData.filter((item) => item.type !== 'same');
  const data = filtredData.map((item) => {
    const itemPath = `${path}${item.key}`;
    if (item.type === 'nested') {
      return makePlain(item.children, `${itemPath}.`);
    }
    if (item.type === 'added') {
      return `Property '${itemPath}' was added with value: ${makeString(item.value2)}`;
    }
    if (item.type === 'deleted') {
      return `Property '${itemPath}' was removed`;
    }
    if (item.type === 'updated') {
      return `Property '${itemPath}' was updated. From ${makeString(item.value1)} to ${makeString(item.value2)}`;
    }
    throw new Error(`Unknown type: '${item.type}'!`);
  });
  return `${data.join('\n')}`;
};

const makePlainReportDiff = (comparedData) => makePlain(comparedData);

export default makePlainReportDiff;

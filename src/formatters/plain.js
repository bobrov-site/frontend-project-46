const makeString = (value) => {
  if (typeof value !== 'object' && typeof value !== 'boolean' && typeof value !== 'number') {
    return `'${value}'`;
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return `${value}`;
  }
  return '[complex value]';
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

const buildPlainReportDiff = (comparedData) => makePlain(comparedData);

export default buildPlainReportDiff;

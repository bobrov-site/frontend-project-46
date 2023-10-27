const getString = (value) => {
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
  const filtredData = comparedData.filter((item) => item.status !== 'same');
  const data = filtredData.map((item) => {
    const itemPath = `${path}${item.name}`;
    if (item.status === 'nested') {
      return makePlain(item.children, `${itemPath}.`);
    }
    if (item.status === 'added') {
      return `Property '${itemPath}' was added with value: ${getString(item.value2)}`;
    }
    if (item.status === 'deleted') {
      return `Property '${itemPath}' was removed`;
    }
    if (item.status === 'updated') {
      return `Property '${itemPath}' was updated. From ${getString(item.value1)} to ${getString(item.value2)}`;
    }
    throw new Error(`Unknown status: '${item.status}'!`);
  });
  return `${data.join('\n')}`;
};

const buildPlain = (comparedData) => makePlain(comparedData);

export default buildPlain;

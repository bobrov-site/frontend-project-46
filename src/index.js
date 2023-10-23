import _ from 'lodash';
import parseFile from './parse.js';
// rename to Data
const sortData = (obj) => {
  const sorted = {};
  Object.keys(obj).sort().forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
};

// TODO поменять логику обхода
const compareData = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(uniqKeys)
  return sortedKeys.map((key) => {
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return {name: key,  status: 'nested', children: compareData(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { name: key, status: 'added', value2: data2[key], };
    }
    if (!Object.hasOwn(data2, key)) {
      return {name: key, status: 'deleted', value1: data1[key] };
    }
    
    if (data1[key] === data2[key]) {
      return {name: key, status: 'same', value: data1[key] };
    }
    return {name: key, status: 'updated', value1: data1[key], value2: data2[key]};
  })
};

const addMargin = (marginCount, marginSymbol = ' ') => _.repeat(marginSymbol, marginCount);

const getString = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return `${data}`
  }
  const str = Object.entries(data).map(([key, value]) => `${addMargin(depth * 4 - (-3))} ${key}: ${getString(value, depth + 1)}`)
  return `{\n${str.join('\n')}\n${addMargin(depth * 4 - 0)}}`
}

const makeTree = (comparedData, depth = 1) => {
  const data = comparedData.map((item) => {
    if (item.status === 'nested') {
      return `${addMargin(depth * 4 - 0)}${item.name}: ${makeTree(item.children, depth + 1)}`;
    }
    if (item.status === 'deleted') {
      return `${addMargin(depth * 4 - 2)}- ${item.name}: ${getString(item.value1, depth)}`;
    }
    if (item.status === 'added') {
      return `${addMargin(depth * 4 - 2)}+ ${item.name}: ${getString(item.value2, depth)}`;
    }
    if (item.status === 'updated') {
      const str1 = `${addMargin(depth * 4 - 2)}- ${item.name}: ${getString(item.value1, depth)}`;
      const str2 = `${addMargin(depth * 4 - 2)}+ ${item.name}: ${getString(item.value2, depth)}`;
      return `${str1}\n${str2}`;
    }
    if (item.status === 'same') {
      return `${addMargin(depth * 4 - 0)}${item.name}: ${getString(item.value)}`;
    }
    return item;
  });
  return `{\n${data.join('\n')}\n${addMargin(depth * 4 - 4)}}`;
};

const genDiff = (file1, file2) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const sortedData1 = sortData(data1);
  const sortedData2 = sortData(data2);
  const comparedData = compareData(sortedData1, sortedData2);
  const tree = makeTree(comparedData);
  return tree;
};

export default genDiff;

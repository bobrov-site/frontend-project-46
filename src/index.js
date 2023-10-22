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
    return {
      key, status: 'updated', value1: data1[key], value2: data2[key],
    };
  })
};

const addMargin = (marginCount, margin = ' ') => _.repeat(margin, marginCount);

const makeTree = (comparedData) => {
  const data = comparedData.map((item) => {
    if (item.status === 'deleted') {
      console.log(`${addMargin(2)}- ${item.name}: ${item.value1}`)
      return `${addMargin(2)}- ${item.name}: ${item.value1}`;
    }
    if (item.status === 'added') {
      return `${addMargin(2)}+ ${item.name}: ${item.value2}`;
    }
    if (item.status === 'updated') {
      const str1 = `${addMargin(2)}- ${item.name}: ${item.value1}`;
      const str2 = `${addMargin(2)}+ ${item.name}: ${item.value2}`;
      return `${str1}\n${str2}`;
    }
    if (item.status === 'same') {
      return `${addMargin(4)}${item.name}: ${item.value1}`;
    }
    return item;
  });
  return `{\n${data.join(' \n')}\n}`;
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

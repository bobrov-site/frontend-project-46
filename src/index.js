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

const compareData = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));
  const comparedData = uniqKeys.map((key) => {
    if (!_.has(data2, key)) {
      key = { name: key, status: 'deleted', value1: data1[key].value };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      key = { name: key, status: 'added', value2: data2[key].value };
    }
    if (_.has(data2, key) && data1[key].value !== data2[key].value && data1[key].value !== undefined) {
      key = {
        name: key, status: 'updated', value1: data1[key].value, value2: data2[key].value,
      };
    }
    if (_.has(data2, key) && data1[key].value === data2[key].value) {
      key = { name: key, status: 'same', value1: data1[key].value };
    }
    return key;
  });
  return comparedData;
};

const addMargin = (marginCount, margin = ' ') => {
  margin = _.repeat(margin, marginCount);
  return margin;
};

const makeTree = (comparedData) => {
  const data = comparedData.map((item) => {
    if (item.status === 'deleted') {
      item = `${addMargin(2)}- ${item.name}: ${item.value1}`;
    }
    if (item.status === 'added') {
      item = `${addMargin(2)}+ ${item.name}: ${item.value2}`;
    }
    if (item.status === 'updated') {
      const str1 = `${addMargin(2)}- ${item.name}: ${item.value1}`;
      const str2 = `${addMargin(2)}+ ${item.name}: ${item.value2}`;
      return `${str1}\n${str2}`;
    }
    if (item.status === 'same') {
      item = `${addMargin(4)}${item.name}: ${item.value1}`;
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

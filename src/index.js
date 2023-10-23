import _ from 'lodash';
import parseFile from './parse.js';
import setFormatter from './formatters/index.js';
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

const genDiff = (file1, file2, formatter = 'stylish') => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const sortedData1 = sortData(data1);
  const sortedData2 = sortData(data2);
  const comparedData = compareData(sortedData1, sortedData2);
  const formattedData = setFormatter(comparedData, formatter)
  return formattedData
};

export default genDiff;

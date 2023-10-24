import _ from 'lodash';
import parseFile from './parse.js';
import compareData from './compare.js';
import setFormatter from './formatters/index.js';

const genDiff = (file1, file2, formatter = 'stylish') => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const comparedData = compareData(data1, data2);
  const formattedData = setFormatter(comparedData, formatter);
  return formattedData;
};

export default genDiff;

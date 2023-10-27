import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import parseFile from './parse.js';
import compareData from './compare.js';
import makeReportDiff from './formatters/index.js';

const buildFullPathToFile = (file) => path.resolve(cwd(), file);

const extractFileType = (file) => path.extname(file).replace('.', '');

const readFile = (file) => {
  const filePath = buildFullPathToFile(file);
  const fileData = readFileSync(filePath, 'utf8');
  return fileData;
};

const genDiff = (file1, file2, formatter = 'stylish') => {
  const fileType1 = extractFileType(file1);
  const fileType2 = extractFileType(file2);
  const fileData1 = readFile(file1);
  const fileData2 = readFile(file2);
  const data1 = parseFile(fileData1, fileType1);
  const data2 = parseFile(fileData2, fileType2);
  const comparedData = compareData(data1, data2);
  const formattedData = makeReportDiff(comparedData, formatter);
  return formattedData;
};

export default genDiff;

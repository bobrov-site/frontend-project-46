import { readFileSync } from 'node:fs';
import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

describe('gendiff stylish', () => {
  test('shoud be equal string data from json file', () => {
    const expected = readFile('expectedFileStylish.txt');

    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');

    const resived = genDiff(file1, file2, 'stylish');
    expect(resived).toBe(expected);
  });
  test('shoud be equal string data from .yml file', () => {
    const expected = readFile('expectedFileStylish.txt');

    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');

    const resived = genDiff(file1, file2, 'stylish');
    expect(resived).toBe(expected);
  });
  test('shoud be equal string data from .yaml file', () => {
    const expected = readFile('expectedFileStylish.txt');

    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');

    const resived = genDiff(file1, file2, 'stylish');
    expect(resived).toBe(expected);
  });

  test('shoud be equal file1.json and file2.yml to string data', () => {
    const expected = readFile('expectedFileStylish.txt');

    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.yaml');

    const resived = genDiff(file1, file2);
    expect(resived).toBe(expected);
  });
});

describe('gendiff plain', () => {
  test('shoud be equal string data from json file', () => {
    const expected = readFile('expectedFilePlain.txt');

    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');

    const resived = genDiff(file1, file2, 'plain');
    expect(resived).toBe(expected);
  });
  test('shoud be equal string data from .yml file', () => {
    const expected = readFile('expectedFileStylish.txt');

    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');

    const resived = genDiff(file1, file2, 'stylish');
    expect(resived).toBe(expected);
  });
  test('shoud be equal string data from .yaml file', () => {
    const expected = readFile('expectedFileStylish.txt');

    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.yaml');

    const resived = genDiff(file1, file2, 'stylish');
    expect(resived).toBe(expected);
  });

  test('shoud be equal file1.json and file2.yml to string data', () => {
    const expected = readFile('expectedFileStylish.txt');

    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.yaml');

    const resived = genDiff(file1, file2);
    expect(resived).toBe(expected);
  });
});

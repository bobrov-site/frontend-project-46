import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import path from 'node:path';

describe('gendiff', () => {
  test('shoud be equal string data from json file', () => {
    const expected = readFileSync('__fixtures__/expectedFile.txt', 'utf8');
    
    const file1 = './__fixtures__/file1.json';
    const file2 = './__fixtures__/file2.json';
  
    const resived = genDiff(file1, file2);
    expect(resived).toBe(expected);
  });
  test('shoud be equal string data from .yml file', () => {
    const expected = readFileSync('__fixtures__/expectedFile.txt', 'utf8');
    
    const file1 = './__fixtures__/file1.yml';
    const file2 = './__fixtures__/file2.yml';

    const resived = genDiff(file1, file2);
    expect(resived).toBe(expected)
  })
  test('shoud be equal string data from .yaml file', () => {
    const expected = readFileSync('__fixtures__/expectedFile.txt', 'utf8');
    
    const file1 = './__fixtures__/file1.yaml';
    const file2 = './__fixtures__/file2.yaml';

    const resived = genDiff(file1, file2);
    expect(resived).toBe(expected)
  })
})

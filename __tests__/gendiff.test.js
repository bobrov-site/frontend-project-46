import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('shoud be equal to expected', () => {
  const expected = readFileSync('__fixtures__/expectedFile.txt', 'utf8');
  const file1 = './__fixtures__/file1.json';
  const file2 = './__fixtures__/file2.json';

  const resived = genDiff(file1, file2);
  expect(resived).toBe(expected);
});

import { readFileSync } from 'node:fs';
import {test, expect} from '@jest/globals'
import genDiff from '../src/index.js';
import path from 'node:path';
import { cwd } from 'node:process';

test('shoud be equal to expected', () => {
    const expected = `{
        - host: hexlet.io,
        + host: google.com,
        - timeout: 50,
        + timeout: 30
          verbose: true,
          proxy: 123.234.53.22,
          follow: false
    }`
    const file1 = './__fixtures__/file1.json'
    const file2 = './__fixtures__/file2.json'

    const resived = genDiff(file1, file2)
    expect(resived).toBe(expected)
})
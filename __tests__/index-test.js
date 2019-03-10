import fs from 'fs';
import genDiff from '../src';


const beforeJSONfilePath = '__tests__/__fixtures__/json-before.json';
const afterJSONfilePath = '__tests__/__fixtures__/json-after.json';
const beforeYMLfilePath = '__tests__/__fixtures__/yaml-before.yml';
const afterYMLfilePath = '__tests__/__fixtures__/yaml-after.yml';
const beforeINIfilePath = '__tests__/__fixtures__/ini-before.ini';
const afterINIfilePath = '__tests__/__fixtures__/ini-after.ini';
const correctResultComplexPath = '__tests__/__fixtures__/resultTextNested.txt';
const correctResultPlainPath = '__tests__/__fixtures__/resultTextPlain.txt';


test.each([[beforeJSONfilePath, afterJSONfilePath], [beforeYMLfilePath, afterYMLfilePath], [beforeINIfilePath, afterINIfilePath]])('compare two files', (configPathBefore, configPathAfter) => {
  const correctResultComplexFormat = fs.readFileSync(correctResultComplexPath, 'utf8');
  const currentDifference = genDiff(configPathBefore, configPathAfter, 'complex');
  expect(currentDifference).toBe(correctResultComplexFormat);
});

test('Compare two files with plain format output', () => {
  const correctResultPlainFormat = fs.readFileSync(correctResultPlainPath, 'utf8');
  const currentDifference = genDiff(beforeJSONfilePath, afterJSONfilePath, 'plain');
  expect(currentDifference).toBe(correctResultPlainFormat);
});

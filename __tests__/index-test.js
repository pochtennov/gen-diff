import fs from 'fs';
import genDiff from '../src';


const beforeJSONfilePath = '__tests__/__fixtures__/json-before.json';
const afterJSONfilePath = '__tests__/__fixtures__/json-after.json';
const beforeYMLfilePath = '__tests__/__fixtures__/yaml-before.yml';
const afterYMLfilePath = '__tests__/__fixtures__/yaml-after.yml';
const beforeINIfilePath = '__tests__/__fixtures__/ini-before.ini';
const afterINIfilePath = '__tests__/__fixtures__/ini-after.ini';
const correctResultDifferencePath = '__tests__/__fixtures__/resultText.txt';
const correctResultDifference = fs.readFileSync(correctResultDifferencePath, 'utf8');

test.each([[beforeJSONfilePath, afterJSONfilePath], [beforeYMLfilePath, afterYMLfilePath], [beforeINIfilePath, afterINIfilePath]])('compare two plain files', (configPathBefore, configPathAfter) => {
  const currentDifference = genDiff(configPathBefore, configPathAfter);
  expect(currentDifference).toBe(correctResultDifference);
});

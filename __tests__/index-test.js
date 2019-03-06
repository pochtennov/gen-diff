import fs from 'fs';
import genDiff from '../src';


const beforeJSON = '__tests__/__fixtures__/json-before.json';
const afterJSON = '__tests__/__fixtures__/json-after.json';
const beforeYML = '__tests__/__fixtures__/yaml-before.yml';
const afterYML = '__tests__/__fixtures__/yaml-after.yml';
const beforeINI = '__tests__/__fixtures__/ini-before.ini';
const afterINI = '__tests__/__fixtures__/ini-after.ini';
const correctResultDifferencePath = '__tests__/__fixtures__/resultText.txt';
const correctResultDifference = fs.readFileSync(correctResultDifferencePath, 'utf8');

test.each([[beforeJSON, afterJSON], [beforeYML, afterYML], [beforeINI, afterINI]])('compare two plain files', (configBefore, configAfter) => {
  const currentDifference = genDiff(configBefore, configAfter);
  expect(currentDifference).toBe(correctResultDifference);
});

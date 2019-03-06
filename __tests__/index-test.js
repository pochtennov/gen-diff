import fs from 'fs';
import genDiff from '../src';


const beforeJSON = '__tests__/__fixtures__/json-before.json';
const afterJSON = '__tests__/__fixtures__/json-after.json';
const beforeYML = '__tests__/__fixtures__/yaml-before.yml';
const afterYML = '__tests__/__fixtures__/yaml-after.yml';
const correctResultDifferencePath = '__tests__/__fixtures__/resultText.txt';
const correctResultDifference = fs.readFileSync(correctResultDifferencePath, 'utf8');

test.each([[beforeJSON, afterJSON], [beforeYML, afterYML]])('compare two plain files', (configBefore, configAfter) => {
  const currentDifference = genDiff(configBefore, configAfter);
  expect(currentDifference).toBe(correctResultDifference);
});

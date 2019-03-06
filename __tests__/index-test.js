import fs from 'fs';
import genDiff from '../src';


const beforeJSON = '__tests__/__fixtures__/json-before.json';
const afterJSON = '__tests__/__fixtures__/json-after.json';
const correctResultDifferencePath = '__tests__/__fixtures__/resultText.txt';
const correctResultDifference = fs.readFileSync(correctResultDifferencePath, 'utf8');

// Can't understand what is the problem with linter here
test('compare two plain JSON files', () => {
  const currentDifference = genDiff(beforeJSON, afterJSON);
  expect(currentDifference).toBe(correctResultDifference);
});

import showDiff from '../src';


const beforeJSON = '__tests__/__fixtures__/json-before.json';
const afterJSON = '__tests__/__fixtures__/json-after.json';

const actual = `{
  host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

// Can't understand what is the problem with linter here
test('compare two plain JSON files', () => {
  const current = showDiff(beforeJSON, afterJSON);
  expect(current).toBe(actual);
});

import path from 'path';
import { fileURLToPath } from 'url';
import makeDiff from '../src/makeDiff.js';
import readFile from '../src/readFile.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const getFixturePath = (name) => path.join(dirname, '..', '__fixtures__', name);

test('test default diff', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expectedResultPath = getFixturePath('defaultResult.txt');
  const expectedResult = readFile(expectedResultPath);
  expect(makeDiff(filePath1, filePath2)).toBe(expectedResult);
});

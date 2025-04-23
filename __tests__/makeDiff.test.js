import path from 'path';
import { fileURLToPath } from 'url';
import makeDiff from '../src/makeDiff.js';
import readFile from '../src/readFile.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const getFixturePath = (name) => path.join(dirname, '..', '__fixtures__', name);

let expectedResult;

beforeEach(() => {
  expectedResult = readFile(getFixturePath('defaultResult.txt'));
});

const testCases = [
  ['YAML vs YAML', 'file1.yaml', 'file2.yml'],
  ['JSON vs JSON', 'file1.json', 'file2.json'],
  ['JSON vs YAML', 'file1.json', 'file2.yml'],
  ['YAML vs JSON', 'file1.yaml', 'file2.json'],
];

testCases.forEach(([description, file1, file2]) => {
  test(`makeDiff works correctly for ${description}`, () => {
    const filePath1 = getFixturePath(file1);
    const filePath2 = getFixturePath(file2);
    expect(makeDiff(filePath1, filePath2)).toBe(expectedResult);
  });
});

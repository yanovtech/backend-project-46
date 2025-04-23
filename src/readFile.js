import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';

export default (filePath) => {
  try {
    const pwd = cwd();
    return readFileSync(path.resolve(pwd, filePath), 'utf-8');
  } catch (e) {
    throw new Error(`Не удалось прочитать файл: ${filePath}\n${e.message}`);
  }
};

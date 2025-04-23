import { readFileSync } from 'node:fs';

export default (filePath) => {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch (e) {
    throw new Error(e);
  }
};

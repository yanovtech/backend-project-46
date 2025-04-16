import { readFileSync } from 'node:fs';

export default (filePath) => {
  try {
    return readFileSync(filePath);
  } catch (e) {
    throw new Error(e);
  }
};

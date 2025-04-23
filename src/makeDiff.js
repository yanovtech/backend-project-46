import _ from 'lodash';
import readFile from './readFile.js';
import jsonParse from './parse.js';
import makeDefault from './options/makeDefault.js';

export default (firstFilePath, secondFilePath) => {
  const firstObj = jsonParse(readFile(firstFilePath));
  const secondObj = jsonParse(readFile(secondFilePath));

  const combinedObj = addingObjects(firstObj, secondObj);
  
  return makeDefault(combinedObj);
};

const addingObjects = (firstObj, secondObj) => {
  const allKeys = _.union(Object.keys(firstObj), Object.keys(secondObj)).sort();

  return allKeys.reduce((acc, key) => {
    const hasFirst = Object.hasOwn(firstObj, key);
    const hasSecond = Object.hasOwn(secondObj, key);

    const val1 = firstObj[key];
    const val2 = secondObj[key];

    if (hasFirst && hasSecond) {
      const bothAreObjects = _.isPlainObject(val1) && _.isPlainObject(val2);

      if (bothAreObjects) {
        acc[key] = { newOldValue: addingObjects(val1, val2) };
      } else if (_.isEqual(val1, val2)) {
        acc[key] = { newOldValue: val1 };
      } else {
        acc[key] = { oldValue: val1, newValue: val2 };
      }
    } else if (hasFirst) {
      acc[key] = { oldValue: val1 };
    } else {
      acc[key] = { newValue: val2 };
    }

    return acc;
  }, {});
};

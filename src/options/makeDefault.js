import _ from 'lodash';

const INDENT_SIZE = 4;
const NEW_VALUE_PREFIX = '+ ';
const OLD_VALUE_PREFIX = '- ';

const getIndent = (depth) => ' '.repeat(depth * INDENT_SIZE);

export default (obj) => {
  const iter = (currentValue, depth = 1) => {
    if (!_.isPlainObject(currentValue)) {
      return String(currentValue);
    }

    const indent = ' '.repeat(depth * INDENT_SIZE - 2);
    const bracketIndent = getIndent(depth - 1);

    const lines = Object.entries(currentValue).flatMap(([key, val]) => {
      if (_.has(val, 'newOldValue')) {
        return `${indent}  ${key}: ${iter(val.newOldValue, depth + 1)}`;
      }

      if (_.has(val, 'newValue') && _.has(val, 'oldValue')) {
        return [
          `${indent}${OLD_VALUE_PREFIX}${key}: ${iter(val.oldValue, depth + 1)}`,
          `${indent}${NEW_VALUE_PREFIX}${key}: ${iter(val.newValue, depth + 1)}`
        ];
      }

      if (_.has(val, 'newValue')) {
        return `${indent}${NEW_VALUE_PREFIX}${key}: ${iter(val.newValue, depth + 1)}`;
      }

      if (_.has(val, 'oldValue')) {
        return `${indent}${OLD_VALUE_PREFIX}${key}: ${iter(val.oldValue, depth + 1)}`;
      }

      return `${indent}  ${key}: ${iter(val, depth + 1)}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(obj);
};

import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

export default (obj) => {
  const iter = (currentValue, parent = '') => {
    const result = Object.entries(currentValue).flatMap(([key, value]) => {
      const propertyPath = parent ? `${parent}.${key}` : key;

      if (_.has(value, 'newOldValue')) {
        const nested = value.newOldValue;
        return _.isPlainObject(nested) ? iter(nested, propertyPath) : [];
      }

      if (_.has(value, 'oldValue') && _.has(value, 'newValue')) {
        return [
          `Property '${propertyPath}' was updated. From ${formatValue(value.oldValue)} to ${formatValue(value.newValue)}`,
        ];
      }

      if (_.has(value, 'oldValue')) {
        return [`Property '${propertyPath}' was removed`];
      }

      if (_.has(value, 'newValue')) {
        return [`Property '${propertyPath}' was added with value: ${formatValue(value.newValue)}`];
      }

      return [];
    });

    return result;
  };

  return iter(obj).join('\n');
};

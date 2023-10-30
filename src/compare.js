import _ from 'lodash';

const compareData = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(uniqKeys);
  return sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { name: key, status: 'added', value2: data2[key] };
    }

    if (!Object.hasOwn(data2, key)) {
      return { name: key, status: 'deleted', value1: data1[key] };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { name: key, status: 'nested', children: compareData(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return { name: key, status: 'same', value: data1[key] };
    }
    return {
      name: key, status: 'updated', value1: data1[key], value2: data2[key],
    };
  });
};

export default compareData;

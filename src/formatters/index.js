import setStylish from './stylish.js';

const setFormatter = (data, format) => {
  switch (format) {
    case 'stylish':
      return setStylish(data);
    case 'plain':
      return setPlain
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default setFormatter;

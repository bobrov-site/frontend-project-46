import setStylish from './stylish.js';
import setPlain from './plain.js';

const setFormatter = (data, format) => {
  switch (format) {
    case 'stylish':
      return setStylish(data);
    case 'plain':
      return setPlain(data)
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default setFormatter;

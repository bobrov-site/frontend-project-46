import buildStylish from './stylish.js';
import setPlain from './plain.js';
import setJson from './json.js';

const makeReportDiff = (data, format) => {
  switch (format) {
    case 'stylish':
      return buildStylish(data);
    case 'plain':
      return setPlain(data);
    case 'json':
      return setJson(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default makeReportDiff;

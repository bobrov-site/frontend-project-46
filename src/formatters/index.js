import buildStylishReportDiff from './stylish.js';
import buildPlain from './plain.js';
import setJson from './json.js';

const makeReportDiff = (data, format) => {
  switch (format) {
    case 'stylish':
      return buildStylishReportDiff(data);
    case 'plain':
      return buildPlain(data);
    case 'json':
      return setJson(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default makeReportDiff;

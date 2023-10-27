import buildStylishReportDiff from './stylish.js';
import buildPlainReportDiff from './plain.js';
import setJson from './json.js';

const makeReportDiff = (data, format) => {
  switch (format) {
    case 'stylish':
      return buildStylishReportDiff(data);
    case 'plain':
      return buildPlainReportDiff(data);
    case 'json':
      return setJson(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default makeReportDiff;

import makeStylishReportDiff from './stylish.js';
import buildPlainReportDiff from './plain.js';
import buildJsonReportDiff from './json.js';

const makeReportDiff = (data, format) => {
  switch (format) {
    case 'stylish':
      return makeStylishReportDiff(data);
    case 'plain':
      return buildPlainReportDiff(data);
    case 'json':
      return buildJsonReportDiff(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default makeReportDiff;

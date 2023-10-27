import yaml from 'js-yaml';

const parse = (data, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension: '${fileType}'!`);
  }
};

const parseFile = (fileData, fileType) => {
  const parsedData = parse(fileData, fileType);
  return parsedData;
};
export default parseFile;

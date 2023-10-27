import yaml from 'js-yaml';

const getFileParse = (data, fileType) => {
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
  const parsedData = getFileParse(fileData, fileType);
  return parsedData;
};
export default parseFile;

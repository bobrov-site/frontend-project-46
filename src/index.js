import parseFile from "./parse.js"
import _ from "lodash"

const sortObject = (obj) => {
    const newObj = {}
    const keys = Object.keys(obj).sort()
    for (const key of keys) {
        newObj[key] = obj[key]
    }
    return newObj
}

const compareData = (data1, data2) => {
    const keys = [Object.keys(data1), Object.keys(data2)].flat()
    const uniqKeys = _.uniq(keys)
    const comparedData = {}
    for (const key of uniqKeys) {
        if (!_.has(data2, key)) {
            comparedData[key] = {status: 'deleted', value1: data1[key]}
        }
        if (_.has(data2, key) && data1[key] !== data2[key]) {
            comparedData[key] = {status: 'updated', value1: data1[key], value2: data2[key]}
        }
        if (_.has(data2, key) && data1[key] === data2[key]) {
            comparedData[key] = {status: 'same', value1: data1[key]}
        }
    }
    console.log(comparedData)
}

// {
    // verbose: true +
//     "host": "hexlet.io", +
//     "timeout": 50, +
//     "proxy": "123.234.53.22", +
//     "follow": false +
// }

const genDiff = (file1, file2) => {
    const data1 = parseFile(file1)
    const data2 = parseFile(file2)
    const sortedData1 = sortObject(data1)
    const sortedData2 = sortObject(data2)
    const comparedData = compareData(sortedData1, sortedData2)
    console.log(comparedData)
    //has https://lodash.com/docs/4.17.15#has
    //
    
}

export default genDiff
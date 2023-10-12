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
        if (!_.has(data1, key) && _.has(data2, key)) {
            comparedData[key] = {status: 'added', value2: data2[key]}
        }
        if (_.has(data2, key) && data1[key] !== data2[key] && data1[key] !== undefined) {
            comparedData[key] = {status: 'updated', value1: data1[key], value2: data2[key]}
        }
        if (_.has(data2, key) && data1[key] === data2[key]) {
            comparedData[key] = {status: 'same', value1: data1[key]}
        }
    }
    return comparedData
}

const makeTree = (comparedData) => {
    console.log(comparedData)
    const keys = Object.keys(comparedData)
    let tree = '{\n'
    for (const key of keys) {
        if (comparedData[key].status === 'deleted') {
            tree += `- ${key}: ${comparedData[key].value1}\n`
        }
        if (comparedData[key].status === 'updated') {
            tree += `- ${key}: ${comparedData[key].value1}\n`
            tree += `+ ${key}: ${comparedData[key].value2}\n`
        }
        if (comparedData[key].status === 'added') {
            tree += `+ ${key}: ${comparedData[key].value2}\n`
        }   
    }
    tree += '}'
    console.log(tree)
    return tree
}

const genDiff = (file1, file2) => {
    const data1 = parseFile(file1)
    const data2 = parseFile(file2)
    const sortedData1 = sortObject(data1)
    const sortedData2 = sortObject(data2)
    const comparedData = compareData(sortedData1, sortedData2)
    const tree = makeTree(comparedData)
}

export default genDiff
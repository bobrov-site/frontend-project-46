import parseFile from "./parse.js"

const sortObject = (obj) => {
    const newObj = {}
    const keys = Object.keys(obj).sort()
    for (const key of keys) {
        newObj[key] = obj[key]
    }
    return newObj
}

const genDiff = (file1, file2) => {
    const data1 = parseFile(file1)
    const data2 = parseFile(file2)
    const sortedData1 = sortObject(data1)
    const sortedData2 = sortObject(data2)
    console.log(sortedData1, sortedData2)
    //has https://lodash.com/docs/4.17.15#has
    //
    
}

export default genDiff
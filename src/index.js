import parseFile from "./parse.js"

const genDiff = (file1, file2) => {
    const data1 = parseFile(file1)
    const data2 = parseFile(file2)
    console.log(data1, data2, 'data1 and data2')
}

export default genDiff
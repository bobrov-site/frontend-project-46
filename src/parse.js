import { readFileSync } from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'

const getFilePath = (file) => path.resolve(cwd(), file)

const getFileParse = (data) => {
    const parsedData = JSON.parse(data)
    return parsedData
}

const parseFile = (file) => {
    const filePath = getFilePath(file)
    const fileData = readFileSync(filePath, 'utf8')
    console.log(fileData)
    const parsedData = getFileParse(fileData)
    return parsedData
}
export default parseFile
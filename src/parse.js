import { readFile } from 'node:fs'
const parseFile = (file) => {
    readFile(file, (err, data) => {
        if (err) {
            throw err
        }
        const parsedData = JSON.parse(data)
        return parsedData
    })
}
export default parseFile
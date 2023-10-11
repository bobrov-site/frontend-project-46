const parseFile = (file) => {
    const data = fs.readFileSync(file, 'utf-8')
    const parsedData = JSON.parse(data)
    return parsedData
}
export default parseFile
const getString = (value) => {
    if (typeof value !== 'object' && typeof value !== 'boolean') {
        return `'${value}'`
    }
    if (value === null) {
        return 'null'
    }
    if (typeof value === 'boolean') {
        return `${value}`
    }
    return `[complex value]`
}
const makePlain = (comparedData, path = '') => {
    const data = comparedData.map((item) => {
        const itemPath = `${path}${item.name}`;
        if (item.status === 'nested') {
            return makePlain(item.children, `${itemPath}.`)
        }
        if (item.status === 'added') {
            return `Property '${itemPath}' was added with value: ${getString(item.value2)}`
        }
        if (item.status === 'deleted') {
            return `Property '${itemPath}' was removed`
        }
        if (item.status === 'updated') {
            return `Property '${itemPath}' was updated. From ${getString(item.value1)} to ${getString(item.value2)}`
        }
    })
    console.log(`${data.join('\n')}`)
    return `${data.join('\n')}`
}

const setPlain = (comparedData) => makePlain(comparedData)

export default setPlain
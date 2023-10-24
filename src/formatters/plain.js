const getString = (item) => {
    if (item.status === 'added') {
        if (typeof item.value2 !== 'object' && typeof item.value2 !== 'boolean' || item.value2 === null) {
            return `'${item.value2}'`
        }
        if (typeof item.value2 === 'boolean') {
            return `${item.value2}`
        }
        return `[complex value]`
    }
    if (item.status === 'deleted') {
        return ``
    }
}

const getProperty = (item) => {

}

const makePlain = (comparedData, path = '') => {
    const data = comparedData.map((item) => {
        const itemPath = `${path}${item.name}`;
        if (item.status === 'nested') {
            return makePlain(item.children, `${itemPath}.`)
        }
        if (item.status === 'added') {
            return `Property '${itemPath}' was added with value: ${getString(item)}`
        }
        if (item.status === 'deleted') {
            return `Property '${itemPath}' was removed`
        }
    })
    return `${data.join('\n')}`
}

const setPlain = (comparedData) => makePlain(comparedData)

export default setPlain
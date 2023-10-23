const getString = (data) => {
    if (typeof data !== 'object' || data === null) {

    }
    return `[complex value]`
}

const makePlain = (comparedData, depth = 1) => {
    const data = comparedData.map((item) => {
        if (item.status === 'added') {
            return `Property '${item.name}' was added with value: ${getString(item.value2)}`
        }
    })
    return `${data.join('\n')}`
}

const setPlain = (comparedData) => makePlain(comparedData)

export default setPlain
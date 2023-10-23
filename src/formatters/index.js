import setStylish from "./stylish.js"

const setFormatter = (data, format) => {
    if (format === 'stylish') {
        return setStylish(data)
    }
}

export default setFormatter
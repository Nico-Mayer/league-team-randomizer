function genKeystoneArr(maxSize: number) {
    const newArray = []
    for (let i = 0; i < maxSize; i++) {
        let randomIndex = Math.floor(Math.random() * maxSize)
        newArray.push(randomIndex)
    }
    return newArray
}

export default genKeystoneArr

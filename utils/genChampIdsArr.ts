function genChampIdsArr(size: number, maxIndex: number) {
    const indexArray: number[] = []

    while (indexArray.length < size) {
        const randomIndex = Math.floor(Math.random() * maxIndex)
        if (!indexArray.includes(randomIndex) && randomIndex !== 0) {
            indexArray.push(randomIndex)
        }
    }
    return indexArray
}

export default genChampIdsArr

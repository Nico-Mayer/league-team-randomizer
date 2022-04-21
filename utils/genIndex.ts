function genIndex(
    prevChampionListIndex: number,
    maxIndex: number,
    indexArray: number[]
) {
    let newChampionListIndex = Math.floor(Math.random() * maxIndex)
    while (
        newChampionListIndex === 0 ||
        indexArray.includes(newChampionListIndex) ||
        newChampionListIndex === prevChampionListIndex
    ) {
        let temp = newChampionListIndex
        newChampionListIndex = Math.floor(Math.random() * maxIndex)
        console.log(
            'Hit on Zero or Duplicate Index Reroll new index from ' +
                temp +
                ' to ' +
                newChampionListIndex
        )
    }
    return newChampionListIndex
}

export default genIndex

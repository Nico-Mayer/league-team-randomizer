function genEmtyChampArr() {
    const emptyChamp = {
        alias: '',
        id: 0,
        name: '',
        roles: [],
        squarePortraitPath: 'nochamp.png',
    }
    const champArr = []

    for (let i = 0; i < 5; i++) {
        champArr.push(emptyChamp)
    }

    return champArr
}

export default genEmtyChampArr

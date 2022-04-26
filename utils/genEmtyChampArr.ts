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
    console.log(champArr)
    return champArr
}

export default genEmtyChampArr

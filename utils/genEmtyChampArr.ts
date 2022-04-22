function genEmtyChampArr() {
    const emptyChamp = {
        alias: '',
        id: 0,
        name: '',
        roles: [],
        squarePortraitPath:
            'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg',
    }
    const champArr = []

    for (let i = 0; i < 5; i++) {
        champArr.push(emptyChamp)
    }
    console.log(champArr)
    return champArr
}

export default genEmtyChampArr

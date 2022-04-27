import keystones from '../public/keystones'

function genKeystoneArr(teamSize: number) {
    let keyStoneArr = []
    for (let i = 0; i < teamSize; i++) {
        keyStoneArr.push(Math.floor(Math.random() * keystones.length))
    }
    return keyStoneArr
}

export default genKeystoneArr

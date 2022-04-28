import shuffleArray from './shuffleArray'

function genLaneIdArr(teamSize: number) {
    let laneIds = [1, 2, 3, 4, 5]
    let shuffled = shuffleArray(laneIds)

    if (teamSize === 5) {
        return [1, 2, 3, 4, 5]
    } else {
        return shuffled.splice(0, teamSize)
    }
}

export default genLaneIdArr

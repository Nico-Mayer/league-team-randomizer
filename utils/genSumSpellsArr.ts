import summonerSpells from '../public/summonerSpells'
import shuffleArray from '../utils/shuffleArray'

export default function genSumSpellsArr(teamSize: number) {
    const newArray = []
    for (let i = 0; i < teamSize; i++) {
        let temp = [...summonerSpells]
        let shuffled = shuffleArray(temp)

        let spells = shuffled.splice(0, 2)
        newArray.push(spells)
    }
    return newArray
}

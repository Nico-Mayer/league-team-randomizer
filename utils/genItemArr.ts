import shuffleArray from '../utils/shuffleArray'

export default function genItemArr(
    teamSize: number,
    genItems: [],
    mythics: [],
    boots: []
) {
    let newItems = []
    for (let i = 0; i < teamSize; i++) {
        let normalItems = shuffleArray([...genItems]).splice(0, 4)

        let loadout = {
            slot1: mythics[Math.floor(Math.random() * mythics.length)],
            slot2: boots[Math.floor(Math.random() * boots.length)],
            slot3: normalItems[0],
            slot4: normalItems[1],
            slot5: normalItems[2],
            slot6: normalItems[3],
        }
        newItems.push(loadout)
    }
    return newItems
}

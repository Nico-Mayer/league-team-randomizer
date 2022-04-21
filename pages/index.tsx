import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import ChampionCard from '../components/ChampionCard'
import populateIndexArray from '../utils/populateIndexArray'

let indexArray: number[] = []

const Home: NextPage = () => {
  const [championList, setChampionList] = useState([])
  const [randomChamps, setRandomChamps] = useState([])
  const championCards = randomChamps?.map((champion, index) => {
    return (
      <ChampionCard
        key={index}
        index={index}
        champion={champion}
        rerollFunc={rerollChampion}
      />
    )
  })

  useEffect(() => {
    fetch(
      'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
    )
      .then((response) => response.json())
      .then((data) => setChampionList(data))
  }, [])

  function getRandomChamps() {
    setRandomChamps([])
    indexArray = populateIndexArray(5, championList.length)

    for (var i = 0; i < indexArray.length; i++) {
      setRandomChamps((prevArray) => {
        return [...prevArray, championList[indexArray[i]]]
      })
    }
  }

  function rerollChampion(index: number) {
    const prevChampionListIndex = indexArray[index]

    let newChampionListIndex = Math.floor(Math.random() * championList.length)

    while (
      newChampionListIndex === 0 ||
      indexArray.includes(newChampionListIndex) ||
      newChampionListIndex === prevChampionListIndex
    ) {
      newChampionListIndex = Math.floor(Math.random() * championList.length)
    }
    setRandomChamps((prevArray) => {
      let newArray: object[] = []
      for (let i = 0; i < prevArray.length; i++) {
        if (i == index) {
          newArray.push(championList[newChampionListIndex])
        } else {
          newArray.push(prevArray[i])
        }
      }
      return newArray
    })
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-800">
      <div className="m-4 flex">{championCards}</div>

      <button
        className="block h-16 rounded-full bg-white px-8 py-2"
        onClick={getRandomChamps}
      >
        Random
      </button>
    </div>
  )
}

export default Home

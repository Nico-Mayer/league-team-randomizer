export async function getStaticProps() {
    const res = await fetch(
        'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
    )
    const data = await res.json()

    return { props: { champList: data } }
}

import type { InferGetStaticPropsType, NextPage } from 'next'
import { useState, useEffect } from 'react'
import ChampionCard from '../components/ChampionCard'
import populateIndexArray from '../utils/populateIndexArray'

interface ChampionProps {
    alias: string
    id: number
    name: string
    roles: string[]
    squarePortraitPath: string
}

const Home = ({
    champList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [indexArray, setIndexArray] = useState<Array<number>>(
        populateIndexArray(5, champList.length)
    )
    const [randomChamps, setRandomChamps] = useState<Array<ChampionProps>>([])

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

    function getRandomChamps() {
        if (champList) {
            setRandomChamps([])
            let temp = populateIndexArray(5, champList.length)
            setIndexArray(temp)
            for (var i = 0; i < indexArray.length; i++) {
                setRandomChamps((prevArray) => {
                    return [...prevArray, champList[indexArray[i]]]
                })
            }
        }
    }

    function rerollChampion(index: number) {
        const prevChampionListIndex = indexArray[index]
        let newChampionListIndex = Math.floor(Math.random() * champList.length)
        while (
            newChampionListIndex === 0 ||
            indexArray.includes(newChampionListIndex) ||
            newChampionListIndex === prevChampionListIndex
        ) {
            let temp = newChampionListIndex
            newChampionListIndex = Math.floor(Math.random() * champList.length)
            console.log(
                'Hit on Zero or Duplicate Index Reroll new index from ' +
                    temp +
                    ' to ' +
                    newChampionListIndex
            )
        }

        setRandomChamps((prevArray) => {
            let newArray = []
            for (let i = 0; i < prevArray.length; i++) {
                if (i == index) {
                    newArray.push(champList[newChampionListIndex])
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

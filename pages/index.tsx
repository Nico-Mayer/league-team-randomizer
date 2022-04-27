export async function getStaticProps() {
    const res = await fetch(
        'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
    )
    const data = await res.json()

    return { props: { champList: data } }
}

import type { InferGetStaticPropsType, NextPage } from 'next'
import { useState } from 'react'
import ChampionCard from '../components/ChampionCard'
import genEmtyChampArr from '../utils/genEmtyChampArr'
import genIndex from '../utils/genIndex'
import populateIndexArray from '../utils/populateIndexArray'
import keystones from '../public/keystones'
import genKeystoneArr from '../utils/genKeystoneArr'
import genRandNum from '../utils/genRandNum'
import summonerSpells from '../public/summonerSpells'
import genSumSpellsArr from '../utils/genSumSpellsArr'
import shuffleArray from '../utils/shuffleArray'

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
    const [randomChamps, setRandomChamps] = useState<Array<ChampionProps>>(
        genEmtyChampArr()
    )
    const [keystoneIndexArr, setKeystoneIndArr] = useState<Array<number>>(
        genKeystoneArr(keystones.length)
    )

    const [sumSpellsArr, setSumSpellsArr] = useState(genSumSpellsArr())

    const championCards = randomChamps?.map((champion, index) => {
        return (
            <ChampionCard
                key={index}
                index={index}
                champion={champion}
                rerollFunc={rerollChampion}
                keystoneIndex={keystoneIndexArr[index]}
                sumSpells={sumSpellsArr[index]}
            />
        )
    })

    function getRandomChamps() {
        if (champList) {
            setRandomChamps([])
            setSumSpellsArr(genSumSpellsArr())
            setKeystoneIndArr(genKeystoneArr(keystones.length))
            setIndexArray(populateIndexArray(5, champList.length))
            for (var i = 0; i < indexArray.length; i++) {
                setRandomChamps((prevArray) => {
                    return [...prevArray, champList[indexArray[i]]]
                })
            }
        }
    }

    function rerollChampion(index: number) {
        const prevChampListIndex = indexArray[index]
        const newChampListIndex = genIndex(
            prevChampListIndex,
            champList.length,
            indexArray
        )
        setSumSpellsArr((prevArray) => {
            let newArray = []
            for (let i = 0; i < prevArray.length; i++) {
                if (i === index) {
                    let temp = [...summonerSpells]
                    let shuffled = shuffleArray(temp)
                    newArray.push(shuffled.splice(0, 2))
                } else {
                    newArray.push(prevArray[i])
                }
            }
            return newArray
        })

        setKeystoneIndArr((prevArray) => {
            let newArray = []
            for (let i = 0; i < keystoneIndexArr.length; i++) {
                if (i === index) {
                    newArray.push(genRandNum(keystones.length))
                } else {
                    newArray.push(prevArray[i])
                }
            }
            return newArray
        })

        setRandomChamps((prevArray) => {
            let newArray = []
            for (let i = 0; i < prevArray.length; i++) {
                if (i == index) {
                    newArray.push(champList[newChampListIndex])
                } else {
                    newArray.push(prevArray[i])
                }
            }
            return newArray
        })
    }

    return (
        <div className="background flex h-screen flex-col items-center justify-center bg-gray-800">
            <div className="m-4 flex">{championCards}</div>

            <div
                className="block h-16 cursor-pointer  border border-gray-300 bg-gray-700 px-8 py-2"
                onClick={getRandomChamps}
            >
                RANDOM
            </div>
        </div>
    )
}

export default Home

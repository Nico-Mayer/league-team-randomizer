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
import genChampIdsArr from '../utils/genChampIdsArr'
import genKeystoneArr from '../utils/genKeystoneArr'
import keystones from '../public/keystones'

const Home = ({
    champList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [teamSize, setTeamSize] = useState(5)
    const [champIds, setChampIds] = useState<Array<number>>(
        genChampIdsArr(teamSize, champList.length)
    )
    const [keyStoneArr, setKeyStoneArr] = useState(genKeystoneArr(teamSize))

    const championCards = champIds?.map((champId, index) => {
        return (
            <ChampionCard
                key={index}
                index={index}
                champId={champId}
                champList={champList}
                keyStone={keyStoneArr[index]}
                rerollFunc={rerollChampion}
            />
        )
    })

    function getRandomChamps() {
        setChampIds(genChampIdsArr(teamSize, champList.length))
        setKeyStoneArr(genKeystoneArr(teamSize))
    }

    function rerollChampion(champId: number, index: number) {
        // Change the Champ Id Array
        let newId = Math.floor(Math.random() * champList.length)
        while (newId === 0 || champIds.includes(newId)) {
            newId = Math.floor(Math.random() * champList.length)
        }
        setChampIds((prevArr) => {
            let newChampIdArr = []
            for (var i = 0; i < champIds.length; i++) {
                if (champIds[i] == champId) {
                    newChampIdArr.push(newId)
                } else {
                    newChampIdArr.push(prevArr[i])
                }
            }
            return newChampIdArr
        })
        // Change the keystone array
        console.log(index)
        setKeyStoneArr((prevArr) => {
            let newKeystoneArr = []
            let newKeystone = Math.floor(Math.random() * keystones.length)
            for (let i = 0; i < champIds.length; i++) {
                if (i === index) {
                    newKeystoneArr.push(newKeystone)
                } else {
                    newKeystoneArr.push(prevArr[i])
                }
            }
            return newKeystoneArr
        })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = parseInt(e.target.value)
        setTeamSize(newValue)
    }

    return (
        <div className="background h-screen w-full max-w-full overflow-hidden">
            <div className="hero-grid absolute z-0 h-screen w-full "></div>
            <div className="gradient absolute h-screen w-full"></div>
            <div className=" relative z-[1] flex h-screen w-full flex-col items-center justify-center">
                <div>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={teamSize}
                        onChange={handleChange}
                    />
                </div>
                <div className="m-4 flex">{championCards}</div>

                <div
                    className="block h-16 cursor-pointer  border border-gray-300 bg-gray-700 px-8 py-2"
                    onClick={getRandomChamps}
                >
                    RANDOM
                </div>
            </div>
        </div>
    )
}

export default Home

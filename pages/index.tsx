export async function getStaticProps() {
    const res = await fetch(
        'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
    )
    const data = await res.json()

    const res2 = await fetch(
        'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json'
    )
    let data2 = await res2.json()
    let mythics = data2.filter(
        (item: { requiredAlly: string }) => item.requiredAlly == 'Ornn'
    )
    let boots = data2.filter((item: { categories: string | string[] }) =>
        item.categories.includes('Boots')
    )
    boots = boots.filter(
        (item: { priceTotal: number }) => item.priceTotal > 300
    )

    let genItems = data2.filter(
        (item: { requiredAlly: boolean }) => item.requiredAlly == false
    )
    genItems = genItems.filter(
        (item: { requiredBuffCurrencyName: boolean }) =>
            item.requiredBuffCurrencyName == false
    )
    genItems = genItems.filter(
        (item: { categories: string | string[] }) =>
            !item.categories.includes('Boots')
    )
    genItems = genItems.filter((item: { to: boolean }) => item.to == false)
    genItems = genItems.filter(
        (item: { inStore: any }) => !item.inStore == false
    )
    genItems = genItems.filter(
        (item: { name: string | string[] }) => !item.name.includes('Doran')
    )
    genItems = genItems.filter(
        (item: { name: string | string[] }) => !item.name.includes('Cull')
    )
    genItems = genItems.filter(
        (item: { name: string | string[] }) => !item.name.includes("Guardian's")
    )
    genItems = genItems.filter(
        (item: { name: string | string[] }) => !item.name.includes('Spatula')
    )
    genItems = genItems.filter(
        (item: { categories: string | string[] }) =>
            !item.categories.includes('Trinket')
    )
    genItems = genItems.filter(
        (item: { categories: string | string[] }) =>
            !item.categories.includes('GoldPer')
    )
    genItems = genItems.filter(
        (item: { categories: string | string[] }) =>
            !item.categories.includes('Consumable')
    )
    genItems = genItems.filter(
        (item: { categories: string | string[] }) =>
            !item.categories.includes('Jungle')
    )

    return {
        props: {
            champList: data,
            genItems: genItems,
            mythics: mythics,
            boots: boots,
        },
    }
}

import type { InferGetStaticPropsType, NextPage } from 'next'
import { useState } from 'react'
import ChampionCard from '../components/ChampionCard'
import genChampIdsArr from '../utils/genChampIdsArr'
import genKeystoneArr from '../utils/genKeystoneArr'
import keystones from '../public/keystones'
import summonerSpells from '../public/summonerSpells'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import genLaneIdArr from '../utils/genLaneIdArr'
import genSumSpellsArr from '../utils/genSumSpellsArr'
import shuffleArray from '../utils/shuffleArray'

const Home = ({
    champList,
    genItems,
    mythics,
    boots,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [teamSize, setTeamSize] = useState(5)
    const [champIds, setChampIds] = useState<Array<number>>(
        genChampIdsArr(teamSize, champList.length)
    )
    const [keyStoneArr, setKeyStoneArr] = useState(genKeystoneArr(teamSize))
    const [laneIds, setLaneIds] = useState(genLaneIdArr(teamSize))
    const [sumSpells, setSumSpells] = useState(genSumSpellsArr(teamSize))

    const championCards = champIds?.map((champId, index) => {
        return (
            <ChampionCard
                key={index}
                index={index}
                champId={champId}
                champData={champList[champId]}
                keyStone={keyStoneArr[index]}
                laneId={laneIds[index]}
                sumSpells={sumSpells[index]}
                rerollFunc={rerollChampion}
            />
        )
    })

    function getRandomChamps() {
        setChampIds(genChampIdsArr(teamSize, champList.length))
        setKeyStoneArr(genKeystoneArr(teamSize))
        setLaneIds(genLaneIdArr(teamSize))
        setSumSpells(genSumSpellsArr(teamSize))
    }

    function rerollChampion(
        champId: number,
        index: number,
        prevLaneId: number
    ) {
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
        // Change laneIds
        setLaneIds((prevArr: number[]) => {
            const laneIds = [1, 2, 3, 4, 5]
            const possibleLanes = []
            for (let i = 0; i < laneIds.length; i++) {
                if (!prevArr.includes(laneIds[i])) {
                    possibleLanes.push(laneIds[i])
                }
            }
            possibleLanes.push(prevLaneId)

            const newArray = []
            for (let i = 0; i < prevArr.length; i++) {
                if (i === index) {
                    newArray.push(
                        possibleLanes[
                            Math.floor(Math.random() * possibleLanes.length)
                        ]
                    )
                } else {
                    newArray.push(prevArr[i])
                }
            }
            return newArray
        })

        // Chane SummonerSpells
        setSumSpells((prevArr) => {
            const newArray = []
            const shuffled = shuffleArray([...summonerSpells])
            const newSpells = shuffled.splice(0, 2)
            for (let i = 0; i < prevArr.length; i++) {
                if (i === index) {
                    newArray.push(newSpells)
                } else {
                    newArray.push(prevArr[i])
                }
            }
            return newArray
        })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = parseInt(e.target.value)
        setTeamSize(newValue)
    }

    return (
        <div className="background flex h-screen flex-col overflow-hidden">
            <Navbar />
            <div className="hero-grid absolute z-0 h-full w-full "></div>
            <div className="gradient absolute h-full w-full"></div>
            <div className="relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center">
                <div>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={teamSize}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex w-full flex-col">{championCards}</div>

                <div
                    className="z-10 flex h-16 w-52 cursor-pointer select-none items-center justify-center rounded-full bg-[#0BC6E3] px-8 py-2 text-lg font-semibold text-white transition duration-500 hover:scale-105"
                    onClick={getRandomChamps}
                >
                    <span>RANDOM</span>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home

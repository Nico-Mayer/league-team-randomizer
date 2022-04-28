import React, { useState, useEffect } from 'react'
import keystones from '../public/keystones'
import summonerSpells from '../public/summonerSpells'

interface Props {
    index: number
    champId: number
    champData: {
        alias: string
        id: number
        name: string
        roles: string[]
        squarePortraitPath: string
    }
    keyStone: number
    laneId: number
    sumSpells: [
        {
            id: number
            imgURL: string
            name: string
        },
        {
            id: number
            imgURL: string
            name: string
        }
    ]
    rerollFunc: (champId: number, index: number, laneId: number) => void
}

function ChampionCard({
    index,
    champId,
    champData,
    keyStone,
    laneId,
    sumSpells,
    rerollFunc,
}: Props) {
    const champion = champData
    if (laneId === 2) {
        sumSpells[0] = summonerSpells[8]
        if (sumSpells[1] === summonerSpells[8]) {
            sumSpells[1] = summonerSpells[Math.floor(Math.random() * 7)]
        }
    }
    const laneIcon = () => {
        switch (laneId) {
            case 1:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-top.svg'
            case 2:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-jungle.svg'
            case 3:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-middle.svg'
            case 4:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-bottom.svg'
            case 5:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-utility.svg'
        }
    }

    return (
        <div
            className="mx-auto my-4 flex h-32 w-full max-w-[80rem] items-center justify-between rounded-lg bg-[#082032a1] p-2 text-white transition duration-500 hover:scale-105"
            onClick={() => rerollFunc(champId, index, laneId)}
        >
            <div className="flex w-[50%] items-center justify-between">
                <img
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.id}.png`}
                    alt=""
                    className="h-24 w-24 rounded-lg"
                />
                <div className="flex h-24 w-32 flex-col items-center justify-center">
                    <h3 className="h3 text-xl font-semibold">
                        {champion.name}
                    </h3>
                    <img className="h-12 w-12" src={laneIcon()} alt="" />
                </div>
                <img
                    src={keystones[keyStone].imgURL}
                    alt=""
                    className="h-16 w-16"
                />
                <div className="">
                    <img
                        className="mb-1 h-10 w-10 rounded-lg"
                        src={sumSpells[0].imgURL}
                        alt=""
                    />
                    <img
                        className="h-10 w-10 rounded-lg"
                        src={sumSpells[1].imgURL}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default ChampionCard

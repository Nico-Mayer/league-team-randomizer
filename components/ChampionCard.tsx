import React, { useState, useEffect } from 'react'
import keystones from '../public/keystones'
import summonerSpells from '../public/summonerSpells'
import Image from 'next/image'

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
    items: {
        slot1: {
            iconPath: string
        }
        slot2: { iconPath: string }
        slot3: { iconPath: string }
        slot4: { iconPath: string }
        slot5: { iconPath: string }
        slot6: { iconPath: string }
    }
    rerollFunc: (champId: number, index: number, laneId: number) => void
}

function ChampionCard({
    index,
    champId,
    champData,
    keyStone,
    laneId,
    sumSpells,
    items,
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

    console.log(items)

    return (
        <div
            className="mx-auto my-4 flex h-32 w-full max-w-[80rem] items-center justify-between rounded-lg bg-[#082032a1] py-2 px-4 text-white transition duration-500 hover:scale-105"
            onClick={() => rerollFunc(champId, index, laneId)}
        >
            <div className="flex w-full items-center justify-between">
                <img
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.id}.png`}
                    alt=""
                    className="undragable h-[96px] w-[96px] rounded-lg"
                />
                <div className="undragable flex h-24 w-32 flex-col items-center justify-center">
                    <h3 className="h3 text-xl font-semibold">
                        {champion.name}
                    </h3>
                    <img
                        className="undragable h-12 w-12"
                        src={laneIcon()}
                        alt=""
                    />
                </div>
                <img
                    src={keystones[keyStone].imgURL}
                    alt=""
                    className="undragable h-16 w-16"
                />
                <div className="">
                    <img
                        className="undragable mb-1 h-10 w-10 rounded-lg"
                        src={sumSpells[0].imgURL}
                        alt=""
                    />
                    <img
                        className="undragable h-10 w-10 rounded-lg"
                        src={sumSpells[1].imgURL}
                        alt=""
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <div className="flex space-x-1">
                        <Image
                            className="undragable w-10 rounded-lg"
                            src={
                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/' +
                                items.slot1.iconPath.slice(43).toLowerCase()
                            }
                            height={40}
                            width={40}
                        />
                        <img
                            className="undragable w-10 rounded-lg"
                            src={
                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/' +
                                items.slot2.iconPath.slice(43).toLowerCase()
                            }
                            alt=""
                        />
                        <img
                            className="undragable w-10 rounded-lg"
                            src={
                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/' +
                                items.slot3.iconPath.slice(43).toLowerCase()
                            }
                            alt=""
                        />
                    </div>
                    <div className="flex space-x-1">
                        <img
                            className="undragable w-10 rounded-lg"
                            src={
                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/' +
                                items.slot4.iconPath.slice(43).toLowerCase()
                            }
                            alt=""
                        />
                        <img
                            className="undragable w-10 rounded-lg"
                            src={
                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/' +
                                items.slot5.iconPath.slice(43).toLowerCase()
                            }
                            alt=""
                        />
                        <img
                            className="undragable w-10 rounded"
                            src={
                                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/' +
                                items.slot6.iconPath.slice(43).toLowerCase()
                            }
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChampionCard

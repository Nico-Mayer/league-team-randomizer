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
            className=" relative m-2 inline-block  min-w-[310px] max-w-[310px] cursor-pointer  select-none transition duration-500 hover:scale-105"
            onClick={() => rerollFunc(champId, index, laneId)}
        >
            <div className="relative">
                <img
                    src="border.svg"
                    className="undragable  relative z-10"
                    alt=""
                />
                <div className="absolute top-0  left-0 h-full w-full">
                    <img
                        className="absolute z-0 h-full w-full object-cover  p-[4.5%] "
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champion.id}/${champion.id}000.jpg`}
                        alt=""
                    />
                </div>
            </div>

            {/* Bottom Part  */}

            <div className="absolute bottom-0 flex h-[30%] w-full   p-[4.5%]">
                <div className="  innerShadow h-full w-full   text-center">
                    <span className=" w-full font-bold text-white shadow-2xl">
                        {champion.name}
                    </span>

                    <div className="relative h-full flex-row  px-2 pb-6">
                        <div className="top-0 right-0 flex h-full w-full ">
                            <div className="flex flex-1 justify-center">
                                <div className="flex h-8 w-16 self-center  bg-gray-900">
                                    <img src={sumSpells[0].imgURL} alt="" />
                                    <img src={sumSpells[1].imgURL} alt="" />
                                </div>
                            </div>
                            <div className="flex flex-1 justify-center">
                                <div className="flex h-12 w-12 self-center rounded-full border border-yellow-700 bg-gray-900 p-2">
                                    <img src={laneIcon()} alt="" />
                                </div>
                            </div>
                            <div className="flex flex-1 justify-center ">
                                <div className="flex h-10 w-10 self-center rounded-full border border-yellow-700 bg-gray-900">
                                    <img
                                        className=" h-10 w-10"
                                        src={keystones[keyStone].imgURL}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 h-full w-full border bg-black opacity-20 blur-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChampionCard

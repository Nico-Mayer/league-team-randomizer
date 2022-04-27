import React, { useState, useEffect } from 'react'
import keystones from '../public/keystones'

interface Props {
    champion: {
        alias: string
        id: number
        name: string
        roles: string[]
        squarePortraitPath: string
    }
    rerollFunc: (number: number) => void
    index: number
    keystoneIndex: number
    sumSpells: Array<{
        id: number
        name: string
        imgURL: string
    }>
}

function ChampionCard({
    champion,
    index,
    rerollFunc,
    keystoneIndex,
    sumSpells,
}: Props) {
    const lane = () => {
        switch (index) {
            case 0:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-top.svg'
            case 1:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-jungle.svg'
            case 2:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-middle.svg'
            case 3:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-bottom.svg'
            case 4:
                return 'https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-utility.svg'
        }
    }

    return (
        <div
            className=" relative m-2 inline-block  min-w-[310px] max-w-[310px] cursor-pointer  transition duration-500 hover:scale-105"
            onClick={() => rerollFunc(index)}
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
                        src={
                            champion.id
                                ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champion.id}/${champion.id}000.jpg`
                                : champion.squarePortraitPath
                        }
                        alt=""
                    />
                </div>
            </div>

            {/* Bottom Part  */}
            {champion.id ? (
                <div className="absolute bottom-0 flex h-[30%] w-full   p-[4.5%]">
                    <div className="  innerShadow h-full w-full   text-center">
                        <span className=" w-full   font-bold text-white shadow-2xl">
                            {champion?.name}
                        </span>

                        <div className="relative h-full flex-row  px-2 pb-6">
                            <div className="top-0 right-0 flex h-full w-full ">
                                <div className="flex flex-1 justify-center ">
                                    <div className="mt-8 flex h-8 w-16 bg-gray-900">
                                        <img
                                            src={sumSpells[0]?.imgURL}
                                            alt=""
                                        />
                                        <img
                                            src={sumSpells[1]?.imgURL}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-1 justify-center  pt-5">
                                    <div className="flex h-12 w-12 rounded-full border border-yellow-700 bg-gray-900 p-2">
                                        <img src={lane()} alt="" />
                                    </div>
                                </div>
                                <div className="flex flex-1 justify-end ">
                                    <div className="mt-5 mr-3 flex h-10 w-10 rounded-full bg-gray-900">
                                        <img
                                            className=" h-10 w-10"
                                            src={
                                                champion.id
                                                    ? keystones[keystoneIndex]
                                                          ?.imgURL
                                                    : ''
                                            }
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 h-full w-full border border-red-700 bg-black opacity-20 blur-lg "></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default ChampionCard

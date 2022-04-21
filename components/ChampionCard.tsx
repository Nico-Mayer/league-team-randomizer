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
}

function ChampionCard({ champion, index, rerollFunc }: Props) {
    return (
        <div className=" m-2 flex h-96 w-80 flex-col  transition duration-500 hover:scale-105">
            <img
                className="flex flex-1 object-cover "
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champion?.id}/${champion?.id}000.jpg`}
            />
            <div className="flex">
                {champion?.name} {champion?.roles[0]}
            </div>
            <button className="bg-red-100" onClick={() => rerollFunc(index)}>
                Reroll
            </button>
            {keystones.percision.presstheattack.imgURL}
        </div>
    )
}

export default ChampionCard

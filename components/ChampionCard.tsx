import React, { useState, useEffect } from 'react'

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
        <div className=" m-2 flex h-96 w-80 flex-col bg-white">
            <img
                className="flex flex-1 object-cover"
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champion?.id}/${champion?.id}000.jpg`}
            />
            <div className="flex">
                {champion?.name} {champion?.roles[0]}
            </div>
            <button className="bg-red-100" onClick={() => rerollFunc(index)}>
                Reroll
            </button>
        </div>
    )
}

export default ChampionCard

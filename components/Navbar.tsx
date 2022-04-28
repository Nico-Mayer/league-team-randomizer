import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function Navbar() {
    return (
        <div className="z-10 flex h-12  select-none items-center py-9 px-6 text-xl font-semibold text-white">
            <FontAwesomeIcon
                className="mr-4 h-8 w-8 animate-spin-slow"
                icon={faAtom}
            />
            <span>RandomTeam Generator</span>
        </div>
    )
}

export default Navbar

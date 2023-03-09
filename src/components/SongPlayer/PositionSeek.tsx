import React from 'react'

interface PositionSeekProps {
    seekPosition: number
    setSeekPosition: React.Dispatch<React.SetStateAction<number>>
    handleSeek: (position: number) => void
}

export const PositionSeek: React.FC<PositionSeekProps> = ({
    seekPosition,
    setSeekPosition,
    handleSeek,
}) => {
    return (
        <input
            type='range'
            name=''
            id=''
            value={seekPosition}
            onMouseUp={() => handleSeek(seekPosition)}
            onChange={(e) => setSeekPosition(Number(e.target.value))}
            className='absolute top-0 h-[1px] w-full cursor-pointer rounded-lg accent-lightSupport transition duration-500 hover:h-1 hover:accent-yellow-500 focus:outline-none'
        />
    )
}

export default PositionSeek

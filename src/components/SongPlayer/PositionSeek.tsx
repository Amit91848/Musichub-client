import React from 'react'

interface PositionSeekProps {}

export const PositionSeek: React.FC<PositionSeekProps> = ({}) => {
    return (
        <div className='absolute top-0 h-[1px] w-full cursor-pointer bg-yellow-500 transition duration-500 hover:h-1'></div>
    )
}

export default PositionSeek

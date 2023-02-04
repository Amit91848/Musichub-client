import React from 'react'

import ServiceIcon from '@/components/ServiceIcon/ServiceIcon'

import { CommonPlaylist } from '@/constant/services'

interface SinglePlaylistProps {
    playlist: CommonPlaylist
}

export const SinglePlaylist: React.FC<SinglePlaylistProps> = ({ playlist }) => {
    return (
        <div className='group flex w-full cursor-pointer items-center justify-between text-left transition hover:scale-105 hover:text-white'>
            <div
                className='overflow-hidden text-ellipsis whitespace-nowrap
                    font-light tracking-wide'
            >
                {playlist.name}
            </div>
            <ServiceIcon
                className='ml-3 hidden duration-300 group-hover:flex'
                size={18}
                source={playlist.source}
            />
        </div>
    )
}

export default SinglePlaylist

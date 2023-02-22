import React, { useEffect, useState } from 'react'
import { AiFillSound } from 'react-icons/ai'
import { useSelector } from 'react-redux'

import ServiceIcon from '@/components/ServiceIcon/ServiceIcon'

import { RootState } from '@/store/store'

import { CommonPlaylist } from '@/constant/services'
interface SinglePlaylistProps {
    playlist: CommonPlaylist
}

export const SinglePlaylist: React.FC<SinglePlaylistProps> = ({ playlist }) => {
    const playlistPlaying = useSelector(
        (state: RootState) => state.player.playlist
    )
    const [isCurrentPlaylistPlaying, setIsCurrentPlaylistPlaying] =
        useState(false)

    useEffect(() => {
        setIsCurrentPlaylistPlaying(playlistPlaying.id === playlist.playlistId)
    }, [playlistPlaying])
    return (
        <div className='group flex w-full cursor-pointer items-center justify-between text-left transition hover:scale-105 hover:text-white'>
            <div
                className='overflow-hidden text-ellipsis whitespace-nowrap
                    font-light tracking-wide'
            >
                {playlist.name}
            </div>
            {!isCurrentPlaylistPlaying ? (
                <ServiceIcon
                    className='ml-3 hidden duration-300 group-hover:flex'
                    size={18}
                    source={playlist.source}
                    disabled
                />
            ) : (
                <AiFillSound size={16} />
            )}
        </div>
    )
}

export default SinglePlaylist

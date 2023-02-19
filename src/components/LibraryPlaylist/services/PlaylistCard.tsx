import Link from 'next/link'
import React from 'react'

import { CommonPlaylist, source } from '@/constant/services'

interface PlaylistCardProps {
    playlist: CommonPlaylist
    source: source
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
    playlist,
    source,
}) => {
    return (
        <Link
            href={`http://localhost:3000/library/playlist/${source.toLowerCase()}/${
                playlist.playlistId
            }`}
        >
            <div className='align-center duration-3000 group flex h-fit w-full cursor-pointer flex-col justify-center space-y-5 rounded-lg bg-[#1e2629] p-6 shadow-lg transition duration-300 hover:bg-[#2f3638]'>
                <div className='m-auto'>
                    {/* <BsFillPlayFill className='z-10' size='100px' /> */}
                    <div
                        style={{
                            backgroundImage: `url(${playlist.img[0].url})`,
                        }}
                        className='h-28 w-28 rounded-lg border-[2px] border-gray-700  bg-cover bg-center bg-no-repeat group-hover:brightness-75'
                    ></div>
                </div>
                <div className='overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm'>
                    {playlist.name}
                    <div className='mt-1 font-primary text-xs text-gray-400/50'>
                        {playlist.total} tracks
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaylistCard

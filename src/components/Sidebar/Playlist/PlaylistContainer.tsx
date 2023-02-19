import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

// import { libraryData } from '@/constant/services'
import Source from './Source'

// interface PlaylistsProps {}

export const PlaylistContainer: React.FC = () => {
    const { spotify, youtube, soundcloud } = useSelector(
        (state: RootState) => state.library.playlists
    )
    const user = useSelector((state: RootState) => state.user)
    // console.log(user.user)

    return (
        <div className='mt-5 w-full text-center'>
            <div className='font-eliteSpecial text-2xl'>Playlists</div>
            <div className='flex h-fit overflow-y-scroll rounded-lg scrollbar-hide'>
                <div className='mx-auto w-11/12 p-1'>
                    <Source source='spotify' playlists={spotify} />
                    <Source source='youtube' playlists={youtube} />
                    <Source source='soundcloud' playlists={soundcloud} />
                </div>
            </div>
        </div>
    )
}

export default PlaylistContainer

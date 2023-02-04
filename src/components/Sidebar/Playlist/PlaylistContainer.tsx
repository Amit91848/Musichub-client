import React from 'react'
import { useSelector } from 'react-redux'

// import { libraryData } from '@/constant/services'
import Source from './Source'
import { RootState } from '@/stores/store'

// interface PlaylistsProps {}

export const PlaylistContainer: React.FC = () => {
    const { spotify, youtube, soundcloud } = useSelector(
        (state: RootState) => state.library.playlists
    )
    const user = useSelector((state: RootState) => state.user)
    // console.log(user.user)

    return (
        <>
            <div className='font-eliteSpecial text-2xl'>Playlists</div>
            <div className='flex h-fit w-11/12 overflow-y-scroll rounded-lg scrollbar-hide'>
                <div className='w-full text-center'>
                    <Source source='spotify' playlists={spotify} />
                    <Source source='youtube' playlists={youtube} />
                    <Source source='soundcloud' playlists={soundcloud} />
                </div>
            </div>
        </>
    )
}

export default PlaylistContainer

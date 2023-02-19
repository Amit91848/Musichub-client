import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import PlaylistRow from './services/PlaylistRow'

export const Playlists: React.FC = () => {
    const playlists = useSelector((state: RootState) => state.library.playlists)

    return (
        <div className='space-y-9'>
            {playlists.spotify.length !== 0 && (
                // <div className='m-auto h-fit w-11/12 rounded-lg bg-dark p-7'>
                <PlaylistRow source='spotify' playlists={playlists.spotify} />
                // </div>
            )}
            {playlists.youtube.length !== 0 && (
                // <div className='m-auto h-fit w-11/12 rounded-lg bg-dark p-7'>
                <PlaylistRow source='youtube' playlists={playlists.youtube} />
                // </div>
            )}
            {playlists.soundcloud.length !== 0 && (
                // <div className='m-auto h-fit w-11/12 rounded-lg bg-dark p-7'>
                <PlaylistRow
                    source='soundcloud'
                    playlists={playlists.soundcloud}
                />
                // </div>
            )}
        </div>
    )
}

export default Playlists

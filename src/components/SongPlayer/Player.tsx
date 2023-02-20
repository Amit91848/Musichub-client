import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import PlayerUI from './PlayerUI'
import SpotifyPlayer from './SpotifyPlayer'
import YoutubePlayer from './YoutubePlayer'

interface PlayerProps {}

export const Player: React.FC<PlayerProps> = ({}) => {
    const { shuffleEnabled, currentTrack, isPlaying, volume } = useSelector(
        (state: RootState) => state.player
    )

    return (
        <>
            <div className=''>
                <YoutubePlayer
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    volume={volume}
                />
            </div>
            <div className='absolute bottom-0 z-10 mt-3 w-full bg-dark'>
                <PlayerUI shuffleEnabled={shuffleEnabled} />
                <SpotifyPlayer
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                />
            </div>
        </>
    )
}

export default Player

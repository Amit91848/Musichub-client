import React from 'react'
import { useSelector } from 'react-redux'

import { changeTrack, emptyQueue, toggleShuffle } from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import SpotifyPlayer from './SpotifyPlayer'
import YoutubePlayer from './YoutubePlayer'
import PlayerUI from './PlayerUI'

interface PlayerProps {}

export const Player: React.FC<PlayerProps> = ({}) => {
    const { shuffleEnabled, currentTrack, isPlaying } = useSelector(
        (state: RootState) => state.player
    )

    return (
        <>
            <PlayerUI shuffleEnabled={shuffleEnabled} />
            <SpotifyPlayer currentTrack={currentTrack} isPlaying={isPlaying} />
            {/* <YoutubePlayer currentTrack={currentTrack} isPlaying={isPlaying} /> */}
        </>
    )
}

export default Player

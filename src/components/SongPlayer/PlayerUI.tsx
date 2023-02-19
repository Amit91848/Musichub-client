import React from 'react'
import { useSelector } from 'react-redux'

import {
    changeTrack,
    emptyQueue,
    handlePlayPause,
    toggleShuffle,
} from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import YoutubePlayer from './YoutubePlayer'

interface PlayerUIProps {
    shuffleEnabled: boolean
}

export const PlayerUI: React.FC<PlayerUIProps> = ({ shuffleEnabled }) => {
    const { currentTrack, isPlaying } = useSelector(
        (state: RootState) => state.player
    )
    const dispatch = useAppDispatch()
    const nextTrack = () => {
        dispatch(changeTrack(1))
    }

    const previousTrack = () => {
        dispatch(changeTrack(-1))
    }

    const pauseMusic = () => {
        dispatch(handlePlayPause(false))
    }
    const playMusic = () => {
        // player.current?.play()
        dispatch(handlePlayPause(true))
    }

    const handleShuffle = () => {
        dispatch(toggleShuffle())
    }

    const handleEmptyQueue = () => {
        dispatch(emptyQueue())
    }
    return (
        <>
            <div className='flex h-20 w-full space-x-5 text-white'>
                <button onClick={previousTrack}>Previous Track</button>
                <button onClick={playMusic}>Play music</button>
                <button onClick={pauseMusic}>Pause Music</button>
                <button onClick={nextTrack}>Next Track</button>
                <button onClick={handleShuffle}>
                    {shuffleEnabled ? 'Unshuffle Queue' : 'Shuffle Queue'}
                </button>
                <button onClick={handleEmptyQueue}>Emtpy Queue</button>
            </div>
        </>
    )
}

export default PlayerUI

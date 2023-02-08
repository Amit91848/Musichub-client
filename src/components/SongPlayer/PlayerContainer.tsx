import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { changeTrack, emptyQueue, toggleShuffle } from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import { useSpotifyWebPlaybackSDKScript } from './utils'
import { SpotifyWebPlaybackSDK } from './utils/SpotifyWebPlaybackSDK'

interface PlayerContainerProps {}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({}) => {
    useSpotifyWebPlaybackSDKScript()
    const dispatch = useAppDispatch()

    const shuffleEnabled = useSelector(
        (state: RootState) => state.player.shuffleEnabled
    )
    const currentTrack = useSelector(
        (state: RootState) => state.player.currentTrack
    )

    const player = useRef<SpotifyWebPlaybackSDK | null>(null)

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            if (!player.current) {
                player.current = new SpotifyWebPlaybackSDK('Music Hub', 0.5)
                player.current.initPlayer()
            }
        }
    }, [])

    useEffect(() => {
        if (player.current) {
            player.current?.load(currentTrack.id)
        }
    }, [currentTrack, player.current])

    const playMusic = () => {
        player.current?.play()
    }

    const nextTrack = () => {
        dispatch(changeTrack(1))
    }

    const previousTrack = () => {
        dispatch(changeTrack(-1))
    }

    const pauseMusic = () => {
        player.current?.pause()
    }

    const handleShuffle = () => {
        dispatch(toggleShuffle())
    }

    const handleEmptyQueue = () => {
        dispatch(emptyQueue())
    }

    return (
        <div className='flex h-20 w-full space-x-5 bg-lime-400'>
            <button onClick={previousTrack}>Previous Track</button>
            <button onClick={playMusic}>Play music</button>
            <button onClick={pauseMusic}>Pause Music</button>
            <button onClick={nextTrack}>Next Track</button>
            <button onClick={handleShuffle}>
                {shuffleEnabled ? 'Unshuffle Queue' : 'Shuffle Queue'}
            </button>
            <button onClick={handleEmptyQueue}>Emtpy Queue</button>
        </div>
    )
    // return <React.Fragment />
}

export default PlayerContainer

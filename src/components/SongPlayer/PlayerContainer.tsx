import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import { useSpotifyWebPlaybackSDKScript } from './utils'
import { SpotifyWebPlaybackSDK } from './utils/SpotifyWebPlaybackSDK'

interface PlayerContainerProps {}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({}) => {
    useSpotifyWebPlaybackSDKScript()

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

    const pauseMusic = () => {
        player.current?.pause()
    }
    return (
        <div className='h-20 w-full bg-lime-400'>
            <button onClick={playMusic}>Play music</button>
            <button onClick={pauseMusic}>Pause Music</button>
        </div>
    )
    // return <React.Fragment />
}

export default PlayerContainer

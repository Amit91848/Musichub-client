import React, { useEffect, useRef } from 'react'

import { useSpotifyWebPlaybackSDKScript } from './utils'
import { SpotifyWebPlaybackSDK } from './utils/SpotifyWebPlaybackSDK'

interface PlayerContainerProps {}

export const PlayerContainer: React.FC<PlayerContainerProps> = ({}) => {
    useSpotifyWebPlaybackSDKScript()
    const player = useRef<SpotifyWebPlaybackSDK | null>(null)
    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            if (!player.current) {
                player.current = new SpotifyWebPlaybackSDK('Music Hub', 0.5)
            }

            player.current.initPlayer()
            player.current.play()
        }
    }, [])

    const playMusic = () => {
        console.log('clicked play music')
        player.current?.play()
    }

    const pauseMusic = () => {
        player.current?.pause
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

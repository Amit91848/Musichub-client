import React, { useEffect, useRef } from 'react'

import { changeTrack } from '@/store/reducers/player'
import { useAppDispatch } from '@/store/store'

import { CommonTracks } from '@/constant/services'

import { useSpotifyWebPlaybackSDKScript } from './utils'
import { SpotifyWebPlaybackSDK } from './utils/SpotifyWebPlaybackSDK'

interface PlayerContainerProps {
    currentTrack: CommonTracks
    isPlaying: boolean
}

export const SpotifyPlayer: React.FC<PlayerContainerProps> = ({
    currentTrack,
    isPlaying,
}) => {
    useSpotifyWebPlaybackSDKScript()

    const dispatch = useAppDispatch()
    const player = useRef<SpotifyWebPlaybackSDK | null>(null)

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            if (!player.current) {
                player.current = new SpotifyWebPlaybackSDK('Music Hub', 0.5)
                player.current.initPlayer()
            }
        }

        return () => {
            player.current = null
        }
    }, [])

    useEffect(() => {
        if (
            player.current &&
            currentTrack &&
            currentTrack.source === 'spotify' &&
            isPlaying
        ) {
            player.current.load(currentTrack.id)
        } else if (player.current && currentTrack.source !== 'spotify') {
            player.current.pause()
        } else if (player.current === null) {
            window.onSpotifyWebPlaybackSDKReady = () => {
                if (!player.current) {
                    player.current = new SpotifyWebPlaybackSDK('Music Hub', 0.5)
                    player.current.initPlayer()
                }
            }
        }
    }, [currentTrack, player.current])

    useEffect(() => {
        if (currentTrack.source === 'spotify' && player.current) {
            if (isPlaying) player.current.play()
            else player.current.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        console.log(player.current)
        if (player.current && player.current.songEnded) {
            dispatch(changeTrack(1))
        }
    }, [player.current?.songEnded])

    return <React.Fragment />
}

export default SpotifyPlayer

import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { changeTrack } from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import { CommonTracks } from '@/constant/services'

import { useSpotifyWebPlaybackSDKScript } from './utils'
import { SpotifyWebPlaybackSDK } from './utils/SpotifyWebPlaybackSDK'

interface PlayerContainerProps {
    currentTrack: CommonTracks
    isPlaying: boolean
    songPosition: number
    forwardRef: React.MutableRefObject<SpotifyWebPlaybackSDK | null>
}

export const SpotifyPlayer: React.FC<
    PlayerContainerProps & {
        forwardRef: React.RefObject<SpotifyWebPlaybackSDK>
    }
> = ({ currentTrack, isPlaying, songPosition, forwardRef }) => {
    useSpotifyWebPlaybackSDKScript()

    const dispatch = useAppDispatch()
    const player = useRef<SpotifyWebPlaybackSDK | null>(null)

    const { volume } = useSelector((state: RootState) => state.player)

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            if (!player.current) {
                player.current = new SpotifyWebPlaybackSDK('Music Hub', 0.5)
                player.current.initPlayer()
                if (forwardRef.current == null) {
                    console.log('inside forwardRef')
                    forwardRef.current = player.current
                }
            }
        }

        return () => {
            player.current = null
        }
    }, [forwardRef])

    useEffect(() => {
        if (
            player.current &&
            currentTrack &&
            currentTrack.source === 'spotify' &&
            isPlaying
        ) {
            player.current.load(currentTrack.id, songPosition)
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
    }, [currentTrack, player.current, songPosition])

    useEffect(() => {
        if (currentTrack.source === 'spotify' && player.current) {
            if (isPlaying) player.current.play()
            else player.current.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        console.log('song ended changed: ', player.current)
        if (player.current && player.current.songEnded) {
            dispatch(changeTrack(1))
        }
    }, [player.current?.songEnded])

    useEffect(() => {
        if (player.current) {
            player.current.updateVolume(volume)
        }
    }, [volume])

    return <React.Fragment />
}

export default SpotifyPlayer

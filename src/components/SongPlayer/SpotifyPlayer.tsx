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
    // songPosition: number
    spotifyRef: React.MutableRefObject<SpotifyWebPlaybackSDK | null>
}

export const SpotifyPlayer: React.FC<PlayerContainerProps> = ({
    currentTrack,
    isPlaying,
    // songPosition,
    spotifyRef,
}) => {
    useSpotifyWebPlaybackSDKScript()

    const dispatch = useAppDispatch()
    const player = useRef<SpotifyWebPlaybackSDK | null>(null)

    const { volume } = useSelector((state: RootState) => state.player)

    useEffect(() => {
        if (!spotifyRef.current) {
            window.onSpotifyWebPlaybackSDKReady = () => {
                if (!player.current) {
                    player.current = new SpotifyWebPlaybackSDK('Music Hub', 0.5)
                    spotifyRef.current = player.current
                    player.current.initPlayer()
                }
            }
        }

        return () => {
            if (spotifyRef.current) {
                player.current = null
            }
        }
        //eslint-disable-next-line
    }, [spotifyRef.current])

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
        //eslint-disable-next-line
    }, [currentTrack, player.current])

    useEffect(() => {
        if (currentTrack.source === 'spotify' && player.current) {
            if (isPlaying) player.current.play()
            else player.current.pause()
        }
        //eslint-disable-next-line
    }, [isPlaying])

    useEffect(() => {
        if (player.current && player.current.songEnded) {
            dispatch(changeTrack(1))
        }
        //eslint-disable-next-line
    }, [player.current?.songEnded])

    useEffect(() => {
        if (player.current) {
            player.current.updateVolume(volume)
        }
    }, [volume])

    return <React.Fragment />
}

export default SpotifyPlayer

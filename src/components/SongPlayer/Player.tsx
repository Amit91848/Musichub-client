import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import PlayerUI from './PlayerUI'
import SpotifyPlayer from './SpotifyPlayer'
import { SpotifyWebPlaybackSDK } from './utils/SpotifyWebPlaybackSDK'
import YoutubePlayer from './YoutubePlayer'

interface PlayerProps {}

export const Player: React.FC<PlayerProps> = ({}) => {
    const { shuffleEnabled, currentTrack, isPlaying, volume, duration } =
        useSelector((state: RootState) => state.player)
    const [inputSeekPosition, setInputSeekPosition] = useState(0)
    const [songPosition, setSongPosition] = useState(0)
    const spotifyPlayer = useRef<SpotifyWebPlaybackSDK | null>(null)
    const youtubePlayer = useRef()

    const handleSeek = (value: number) => {
        const seconds = duration / 100
        const newTime = Math.round(value * seconds)
        console.log(newTime)
        const { source } = currentTrack

        if (source === 'spotify') {
            console.log('spotifyplayer in player: ', spotifyPlayer)
            spotifyPlayer.current?.seek(newTime)
        }
    }

    const updateSongPosition = (value: number, duration: number) => {
        const seconds = duration / 100
        const newTime = Math.round(value * seconds)
        setSongPosition(newTime)
    }
    return (
        <>
            <div className=''>
                <YoutubePlayer
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    volume={volume}
                    forwardRef={youtubePlayer}
                />
            </div>
            <div className='absolute bottom-0 z-10 mt-3 w-full bg-dark'>
                <PlayerUI
                    updateSongPosition={updateSongPosition}
                    inputSeekPosition={inputSeekPosition}
                    setInputSeekPosition={setInputSeekPosition}
                    shuffleEnabled={shuffleEnabled}
                    songPosition={songPosition}
                    handleSeek={handleSeek}
                />
                <SpotifyPlayer
                    forwardRef={spotifyPlayer}
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    songPosition={songPosition}
                />
            </div>
        </>
    )
}

export default Player

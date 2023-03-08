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
    const spotifyPlayer = useRef<SpotifyWebPlaybackSDK | null>(null)
    const youtubePlayer = useRef<YT.Player>()

    const handleSeek = (value: number) => {
        const seconds = duration / 100
        // Time in milliseconds
        const newTime = Math.round(value * seconds)
        const { source } = currentTrack

        if (source === 'spotify') {
            console.log('spotifyplayer in player: ', spotifyPlayer)
            spotifyPlayer.current?.seek(newTime)
        } else if (source === 'youtube') {
            youtubePlayer.current?.seekTo(newTime / 1000, true)
        }
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
                    // updateSongPosition={updateSongPosition}
                    inputSeekPosition={inputSeekPosition}
                    setInputSeekPosition={setInputSeekPosition}
                    shuffleEnabled={shuffleEnabled}
                    handleSeek={handleSeek}
                />
                <SpotifyPlayer
                    spotifyRef={spotifyPlayer}
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    // songPosition={songPosition}
                />
            </div>
        </>
    )
}

export default Player

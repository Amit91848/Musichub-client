import React from 'react'
import { AiOutlinePause } from 'react-icons/ai'
import { BiRepeat, BiShuffle, BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { BsFillPlayFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

import {
    changeTrack,
    emptyQueue,
    handlePlayPause,
    toggleShuffle,
} from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import PositionSeek from './PositionSeek'
import VolumeController from './VolumeController'
import ArtistLink from '../PlaylistPage/ArtistLink'

interface PlayerUIProps {
    shuffleEnabled: boolean
    inputSeekPosition: number
    setInputSeekPosition: React.Dispatch<React.SetStateAction<number>>
    handleSeek: (position: number) => void
}

export const PlayerUI: React.FC<PlayerUIProps> = ({
    inputSeekPosition,
    setInputSeekPosition,
    handleSeek,
}) => {
    const { currentTrack, isPlaying, shuffleEnabled, duration } = useSelector(
        (state: RootState) => state.player
    )
    function millisToMinutesAndSeconds(millis: number) {
        const minutes = Math.floor(millis / 60000)
        const seconds = parseInt(((millis % 60000) / 1000).toFixed(0))
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }

    const dispatch = useAppDispatch()
    const nextTrack = () => {
        dispatch(changeTrack(1))
        setInputSeekPosition(0)
    }

    const previousTrack = () => {
        dispatch(changeTrack(-1))
        setInputSeekPosition(0)
    }

    const pauseMusic = () => {
        dispatch(handlePlayPause(false))
    }
    const playMusic = () => {
        dispatch(handlePlayPause(true))
    }

    const handleShuffle = () => {
        dispatch(toggleShuffle())
    }

    // eslint-disable-next-line
    const handleEmptyQueue = () => {
        dispatch(emptyQueue())
    }
    return (
        <div className='grid h-20 w-full grid-cols-3 items-center space-x-5 px-2 text-white'>
            <PositionSeek
                seekPosition={inputSeekPosition}
                setSeekPosition={setInputSeekPosition}
                // updateSongPosition={updateSongPosition}
                // duration={duration}
                handleSeek={handleSeek}
            />
            <div className='flex items-center gap-3 overflow-hidden whitespace-nowrap p-1'>
                <div
                    className='h-16 min-w-[5rem] rounded-lg border border-[#383f41] bg-cover bg-center bg-no-repeat'
                    style={
                        currentTrack.id !== '' && currentTrack.img !== undefined
                            ? {
                                  backgroundImage: `url(${currentTrack?.img[1].url})`,
                              }
                            : {
                                  backgroundImage: `url(https://icones.pro/wp-content/uploads/2021/03/icone-de-la-musique-jaune.png)`,
                              }
                    }
                ></div>
                <div className='text-xs font-light tracking-wide'>
                    <p className='text-ellipsis'>{currentTrack?.title}</p>
                    {currentTrack.artist?.map((a, index) => (
                        <ArtistLink
                            className='text-[0.725rem]'
                            artist={a}
                            key={a.id}
                            source={currentTrack.source}
                            index={index}
                        />
                    ))}
                </div>{' '}
            </div>
            <div className='flex items-center space-x-4'>
                <button onClick={handleShuffle}>
                    {shuffleEnabled ? (
                        <BiShuffle size={20} />
                    ) : (
                        <BiShuffle size={20} />
                    )}
                </button>
                <div className='text-xs font-light text-lightSupport'></div>
                <div className='flex items-center justify-center rounded-full border'>
                    <button onClick={previousTrack}>
                        <BiSkipPrevious size={30} />
                    </button>
                </div>
                <div className='flex items-center justify-center rounded-full border'>
                    {isPlaying ? (
                        <button onClick={pauseMusic}>
                            <AiOutlinePause size={50} />
                        </button>
                    ) : (
                        <button onClick={playMusic}>
                            <BsFillPlayFill size={50} />
                        </button>
                    )}
                </div>
                <div className='flex items-center justify-center rounded-full border'>
                    <button onClick={nextTrack}>
                        <BiSkipNext size={30} />
                    </button>
                </div>
                <div className='text-xs font-light text-lightSupport'>
                    {millisToMinutesAndSeconds(duration)}
                </div>
                <button>
                    <BiRepeat size={20} />
                </button>
            </div>
            <div className='flex items-center justify-self-end'>
                <VolumeController />
            </div>
        </div>
    )
}

export default PlayerUI

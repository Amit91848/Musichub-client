import React from 'react'
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import {
    BiRepeat,
    BiShuffle,
    BiSkipNextCircle,
    BiSkipPreviousCircle,
} from 'react-icons/bi'
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
        <div className='grid h-20 w-full grid-cols-3 items-center space-x-5 px-2 text-white'>
            <PositionSeek />
            <div className='flex items-center gap-3 overflow-hidden whitespace-nowrap p-1'>
                {currentTrack.id !== '' ? (
                    <>
                        {' '}
                        <div
                            className='h-16 min-w-[5rem] rounded-lg border border-[#383f41] bg-cover bg-center bg-no-repeat'
                            style={
                                {
                                    // backgroundImage: `url(${currentTrack?.img[1].url})`,
                                }
                            }
                        ></div>
                        <div className='text-xs font-light tracking-wide'>
                            <p className='text-ellipsis'>
                                {currentTrack?.title}
                            </p>
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
                    </>
                ) : (
                    <>
                        {' '}
                        <div
                            className='h-16 min-w-[5rem] rounded-lg border border-[#383f41] bg-red-900 bg-cover bg-center bg-no-repeat'
                            // style={{
                            //     background
                            // }}
                        ></div>
                        <div className='text-xs font-light tracking-wide'>
                            <p className='text-ellipsis'>No Song Loaded</p>
                        </div>{' '}
                    </>
                )}
            </div>
            <div className='flex space-x-3'>
                <button onClick={handleShuffle}>
                    {shuffleEnabled ? (
                        <BiShuffle size={30} />
                    ) : (
                        <BiShuffle size={30} />
                    )}
                </button>
                <button onClick={previousTrack}>
                    <BiSkipPreviousCircle size={30} />
                </button>
                {isPlaying ? (
                    <button onClick={pauseMusic}>
                        <AiOutlinePauseCircle size={60} />
                    </button>
                ) : (
                    <button onClick={playMusic}>
                        <AiOutlinePlayCircle size={60} />
                    </button>
                )}
                <button onClick={nextTrack}>
                    <BiSkipNextCircle size={30} />
                </button>
                <button>
                    <BiRepeat size={30} />
                </button>
                <button onClick={handleEmptyQueue}>Emtpy Queue</button>
            </div>
            <div className='flex items-center justify-self-end'>
                <VolumeController />
            </div>
        </div>
    )
}

export default PlayerUI

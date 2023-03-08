import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { Audio } from 'react-loader-spinner'

import clsxm from '@/lib/clsxm'

import { addToQueue } from '@/store/reducers/player'
import { useAppDispatch } from '@/store/store'

import { CommonTracks } from '@/constant/services'

import ArtistLink from './ArtistLink'
import Dropdown from './Dropdown'
import ServiceIcon from '../ServiceIcon/ServiceIcon'

interface TrackProps {
    track: CommonTracks
    isActive: boolean
    handlePlay?: (track: CommonTracks) => void
}

export const Track: React.FC<TrackProps> = ({
    track,
    isActive,
    handlePlay,
}) => {
    const { url } = track.img[2]

    const dispatch = useAppDispatch()
    function millisToMinutesAndSeconds(millis: number) {
        const minutes = Math.floor(millis / 60000)
        const seconds = parseInt(((millis % 60000) / 1000).toFixed(0))
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }

    function pauseTrack() {
        isActive = false
    }

    const handleAddToQueue = () => {
        dispatch(addToQueue(track))
    }

    return (
        <div className='group my-2 flex h-16 w-full items-center rounded-lg  px-6 text-light transition duration-500 hover:bg-[#2f3638]'>
            <div className='group flex h-9 w-full items-center'>
                <div className='mr-2 h-full'>
                    <div
                        style={{ backgroundImage: `url(${url})` }}
                        className='mr-2 h-full rounded bg-cover bg-center bg-no-repeat transition duration-200 group-hover:brightness-50'
                    >
                        <div
                            className={clsxm(
                                'align-center absolute z-10 flex cursor-pointer justify-center transition duration-200' &&
                                    !isActive &&
                                    'opacity-0 group-hover:opacity-100'
                            )}
                        >
                            {' '}
                            {!isActive ? (
                                <BsFillPlayFill
                                    className='cursor-pointer'
                                    onClick={() => {
                                        if (handlePlay) {
                                            handlePlay(track)
                                        }
                                    }}
                                    color='#f7f7f7'
                                    size={35}
                                />
                            ) : (
                                <div onClick={pauseTrack}>
                                    <Audio
                                        height='27'
                                        width='35'
                                        color='#fff'
                                        ariaLabel='audio-loading'
                                        wrapperStyle={{}}
                                        wrapperClass='wrapper-class cursor-pointer'
                                        visible={true}
                                    />
                                </div>
                            )}{' '}
                        </div>
                    </div>
                </div>
                <div className='flex grow flex-col items-start overflow-hidden text-ellipsis whitespace-nowrap'>
                    <div className=' text-xs font-bold text-light'>
                        {track.title}
                    </div>
                    <div className=''>
                        {track.artist.map((a, index) => (
                            <ArtistLink
                                key={a.id}
                                artist={a}
                                source={track.source}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
                <div className='mr-4 cursor-pointer'>
                    <a
                        href={
                            track.source === 'spotify'
                                ? `https://open.spotify.com/track/${track.id}`
                                : `https://www.youtube.com/watch?v=${track.id}`
                        }
                        target='_blank'
                        rel='noreferrer'
                    >
                        <ServiceIcon
                            source={track.source}
                            size={23}
                            className='hidden duration-300 group-hover:flex'
                        />
                    </a>
                </div>
                <div className='cursor-pointer'>
                    <Dropdown handleAddToQueue={handleAddToQueue} />
                </div>
                <div className=' text-sm'>
                    <div>{millisToMinutesAndSeconds(track.duration)}</div>
                </div>
            </div>
        </div>
    )
}

export default Track

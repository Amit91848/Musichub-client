import Link from 'next/link'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BsFillPlayFill } from 'react-icons/bs'
import { Audio } from 'react-loader-spinner'

import clsxm from '@/lib/clsxm'

import { play } from '@/store/reducers/player'
import { useAppDispatch } from '@/store/store'

import { CommonTracks } from '@/constant/services'

import ArtistLink from './ArtistLink'
import ServiceIcon from '../ServiceIcon/ServiceIcon'

interface TrackProps {
    track: CommonTracks
    isActive: boolean
}

export const Track: React.FC<TrackProps> = ({ track, isActive }) => {
    const { url } = track.img[2]

    const dispatch = useAppDispatch()
    function millisToMinutesAndSeconds(millis: number) {
        const minutes = Math.floor(millis / 60000)
        const seconds = parseInt(((millis % 60000) / 1000).toFixed(0))
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }

    function playTrack() {
        // dispatch(toggleIsPlaying())
        dispatch(play(track))
    }

    function pauseTrack() {
        isActive = false
    }

    return (
        <div className='group my-2 flex h-16 w-full items-center rounded-lg  px-6 text-light transition duration-500 hover:bg-[#2f3638]'>
            <div className='group flex h-9 w-full items-center'>
                <div className='flex h-full w-full space-x-4 '>
                    <div
                        style={{ backgroundImage: `url(${url})` }}
                        className='bg-cover bg-center bg-no-repeat transition duration-200 group-hover:brightness-50'
                    >
                        <div
                            className={clsxm(
                                'absolute z-10 flex cursor-pointer transition duration-200' &&
                                    !isActive &&
                                    'opacity-0 group-hover:opacity-100'
                            )}
                        >
                            {' '}
                            {!isActive ? (
                                <BsFillPlayFill
                                    className='cursor-pointer'
                                    onClick={playTrack}
                                    color='#f7f7f7'
                                    size={35}
                                />
                            ) : (
                                <div onClick={pauseTrack} className=''>
                                    <Audio
                                        height='28'
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
                        {/* <div
                            className='h-full w-9 bg-cover bg-center bg-no-repeat transition duration-200 group-hover:brightness-50'
                            style={{ backgroundImage: `url(${url})` }}
                        ></div> */}
                    </div>

                    <div className='flex flex-col items-start'>
                        <div className='w-52 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-light'>
                            {track.title}
                        </div>
                        <div className='block w-52 overflow-hidden text-ellipsis whitespace-nowrap'>
                            {track.artist.map((a) => (
                                <ArtistLink
                                    key={a.id}
                                    artist={a}
                                    source={track.source}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='ml-auto flex w-1/4 items-center justify-between text-sm'>
                    <div className='cursor-pointer'>
                        <Link
                            href={
                                track.source === 'spotify'
                                    ? `https://open.spotify.com/track/${track.id}`
                                    : ``
                            }
                        >
                            <ServiceIcon
                                source={track.source}
                                size={23}
                                className='hidden duration-300 group-hover:flex'
                            />
                        </Link>
                    </div>
                    <div className='cursor-pointer'>
                        <BsThreeDotsVertical
                            className='hidden duration-300 group-hover:flex'
                            size={22}
                        />
                    </div>
                    <div>{millisToMinutesAndSeconds(track.duration)}</div>
                </div>
            </div>
        </div>
    )
}

export default Track

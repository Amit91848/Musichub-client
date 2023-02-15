import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { FaSyncAlt } from 'react-icons/fa'
import { TailSpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

import { loadTracksOnPlaylist } from '@/store/reducers/library'
import { play } from '@/store/reducers/player'
import { RootState, useAppDispatch } from '@/store/store'

import { CommonPlaylist, CommonTracks } from '@/constant/services'

import Track from './Track'
import YoutubePlayer from '../SongPlayer/YoutubePlayer'

export const MainContainer: React.FC = () => {
    const router = useRouter()
    const { source, playlistId } = router.query
    const sourceCapital = useRef('')
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

    const [tracks, setTracks] = useState<CommonTracks[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const playlists = useSelector((state: RootState) => state.library.playlists)
    const playerPlaylist = useSelector(
        (state: RootState) => state.player.currentTrack
    )
    const currentPlaylist: CommonPlaylist = playlists[source]?.find(
        (p: CommonPlaylist) => p.playlistId === playlistId
    )
    const { currentTrack, isPlaying } = useSelector(
        (state: RootState) => state.player
    )

    const imgUrl = currentPlaylist?.img[0].url
    const width = currentPlaylist?.img[0].width
    const loadedTracks = currentPlaylist?.tracks

    const handlePlay = (track: CommonTracks) => {
        dispatch(play({ track, playlist: currentPlaylist }))
    }

    const fetchTracks = async () => {
        setIsLoading(true)
        const response = await axios.get(
            `${backendURL}/api/${source}/playlist/${playlistId}/tracks`,
            {
                withCredentials: true,
            }
        )
        const track = response.data.mappedTracks
        setTracks(response.data.mappedTracks)
        dispatch(
            loadTracksOnPlaylist({
                tracks: track,
                playlistId: playlistId,
                source: source,
            })
        )
        setIsLoading(false)
    }

    // Use tracks in redux or fetch from server
    useEffect(() => {
        if (currentPlaylist?.name)
            document.title = `Music Hub | ${currentPlaylist.name}`
        if (source != undefined) {
            sourceCapital.current =
                source[0]?.toUpperCase() + source?.substring(1)
            if (loadedTracks.length === 0) {
                fetchTracks()
            } else {
                setTracks(loadedTracks)
            }
        }
    }, [playlistId, source])

    return (
        <div className='flex h-[calc(100vh_-_66px_-_80px)] w-full overflow-scroll bg-darkSupport py-10 text-lightSupport transition'>
            <div className='mx-auto h-fit w-[95%] rounded-lg bg-dark p-9'>
                <div className='mb-16 flex h-52 w-full px-6'>
                    <div className='flex h-full w-52'>
                        <div
                            className={`h-full w-[${width}px] flex-1 rounded-lg border border-gray-700 bg-cover bg-center bg-no-repeat`}
                            style={{
                                backgroundImage: `url(${imgUrl})`,
                            }}
                        ></div>
                    </div>
                    <div className='ml-6 flex flex-col justify-between '>
                        <div className=' mt-4 h-[3rem] cursor-pointer whitespace-pre-wrap font-eliteSpecial text-2xl text-light transition duration-300 hover:text-white lg:text-[2.8rem]'>
                            {currentPlaylist?.name}
                        </div>
                        <div>
                            <div className=''>
                                {sourceCapital.current} Playlist
                            </div>
                            <div className='text-sm'>
                                {currentPlaylist?.total} Tracks
                            </div>
                        </div>
                        <div className='w-dit h-fit w-24'>
                            {/* <AiFillPlayCircle color='#a76af7' size={75} /> */}
                            <div className='w-fit cursor-pointer rounded-full  bg-gradient-to-r from-violet-700 to-fuchsia-700 p-4 transition duration-300 hover:scale-110'>
                                <BsFillPlayFill
                                    onClick={() => {
                                        handlePlay(tracks[0])
                                    }}
                                    size={35}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='ml-auto h-full '>
                        <div className='ml-auto flex cursor-pointer space-x-7 text-2xl '>
                            <AiFillStar
                                className='transition duration-300 hover:text-white'
                                size={50}
                            />
                            <FaSyncAlt
                                className='transition duration-300 hover:text-white'
                                onClick={() => fetchTracks()}
                                size={44}
                            />
                        </div>
                    </div>
                </div>
                {!isLoading ? (
                    tracks?.map((track) => (
                        <Track
                            isActive={
                                track.id === currentTrack.id
                                // currentPlaylist.playlistId === playerPlaylist.id
                            }
                            key={track.id}
                            track={track}
                            handlePlay={handlePlay}
                        />
                    ))
                ) : (
                    <div className='flex h-full w-full justify-center'>
                        <TailSpin
                            height='60'
                            width='60'
                            color='#A020F0'
                            ariaLabel='tail-spin-loading'
                            radius='0'
                            wrapperStyle={{}}
                            wrapperClass=''
                            visible={true}
                        />
                    </div>
                )}
                {source === 'youtube' && (
                    <YoutubePlayer
                        currentTrack={currentTrack}
                        isPlaying={isPlaying}
                    />
                )}
            </div>
        </div>
    )
}

export default MainContainer

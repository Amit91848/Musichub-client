import React from 'react'
import { useSelector } from 'react-redux'

import Track from '@/components/PlaylistPage/Track'

import { RootState, useAppDispatch } from '@/store/store'

import { CommonPlaylist, CommonTracks } from '@/constant/services'
import { play } from '@/store/reducers/player'

interface ModalSubheadingProps {
    subheading: string
    type: 'current' | 'queue' | 'userQueue'
}

export const ModalBody: React.FC<ModalSubheadingProps> = ({
    subheading,
    type,
}) => {
    const { currentTrack, queue, userQueue, index, userQueueIndex, playlist } =
        useSelector((state: RootState) => state.player)

    const dispatch = useAppDispatch()

    // const handlePlay = (track: CommonTracks) => {
    //     dispatch(play({ track, playlist: currentPlaylist }))
    // }

    return (
        <div className='w-full px-6'>
            <div className='border-b border-borderGray px-2 pb-2 pt-4 text-xl text-lightSupport'>
                {subheading}
            </div>
            {currentTrack && type === 'current' && (
                <Track
                    track={currentTrack}
                    key={currentTrack.id}
                    isActive={true}
                />
            )}

            {userQueue &&
                type === 'userQueue' &&
                userQueue
                    .slice(userQueueIndex)
                    .map((t) => (
                        <Track
                            key={t.id}
                            track={t}
                            isActive={currentTrack.id === t.id}
                        />
                    ))}

            {queue &&
                type === 'queue' &&
                queue
                    .slice(index + 1)
                    .map((t) => (
                        <Track
                            key={t.id}
                            track={t}
                            isActive={currentTrack.id === t.id}
                        />
                    ))}
        </div>
    )
}

export default ModalBody

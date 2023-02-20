import React, { useEffect, useState } from 'react'
import {
    BsFillVolumeDownFill,
    BsFillVolumeMuteFill,
    BsFillVolumeUpFill,
} from 'react-icons/bs'

import { updateVolume } from '@/store/reducers/player'
import { useAppDispatch } from '@/store/store'

interface VolumeControllerProps {}

export const VolumeController: React.FC<VolumeControllerProps> = ({}) => {
    const [volume, setVolume] = useState(0.5)
    const dispatch = useAppDispatch()

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value))
    }

    const handleUpdateVolume = () => {
        dispatch(updateVolume(volume))
    }

    const handleMute = () => {
        if (volume !== 0) {
            setVolume(0)
        } else {
            setVolume(0.5)
        }
        dispatch(updateVolume(volume))
    }

    return (
        <div className='group flex items-center space-x-3 transition duration-700'>
            <div
                className='cursor-pointer group-hover:text-yellow-500/80'
                onClick={handleMute}
            >
                {volume === 0 ? (
                    <BsFillVolumeMuteFill className=' ' size={21} />
                ) : volume < 0.4 ? (
                    <BsFillVolumeDownFill className='' size={21} />
                ) : (
                    <BsFillVolumeUpFill className='' size={21} />
                )}
            </div>
            <input
                type='range'
                min='0'
                max='1'
                step='0.05'
                value={volume}
                onChange={(e) => handleVolumeChange(e)}
                onMouseUp={handleUpdateVolume}
                className='h-1 cursor-pointer rounded-lg accent-lightSupport group-hover:accent-yellow-500'
            />
        </div>
    )
}

export default VolumeController

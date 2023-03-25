import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

interface ModalHeaderProps {
    setShowQueueModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
    setShowQueueModal,
}) => {
    const active = useSelector((state: RootState) => state.user.active)
    return (
        <div className='flex h-20 w-full items-center rounded-t-lg border-b border-[#383f41] bg-[#151d20] px-6'>
            <div className='text-xl text-light'>
                {active.charAt(0).toUpperCase() + active.substring(1)}
            </div>
            <div className='ml-auto cursor-pointer text-light hover:text-white'>
                {active === 'queue' && (
                    <IoMdClose
                        onClick={() => {
                            if (setShowQueueModal) {
                                setShowQueueModal(false)
                            }
                        }}
                        size={24}
                    />
                )}
                {(active === 'spotify' ||
                    active === 'youtube' ||
                    active === 'soundcloud') && (
                    <label htmlFor='my-modal-5' className='cursor-pointer'>
                        <IoMdClose size={24} />
                    </label>
                )}
                {active === 'playlists' && (
                    <label htmlFor='my-modal-5' className='cursor-pointer'>
                        <IoMdClose size={24} />
                    </label>
                )}
            </div>
        </div>
    )
}

export default ModalHeader

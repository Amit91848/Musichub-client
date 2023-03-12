import React from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalHeaderProps {
    heading: string
    setShowQueueModal?: React.Dispatch<React.SetStateAction<boolean>>
    type: 'queue' | 'settings'
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
    heading,
    setShowQueueModal,
    type,
}) => {
    return (
        <div className='flex h-20 w-full items-center rounded-t-lg border-b border-[#383f41] bg-[#151d20] px-6'>
            <div className='text-xl text-light'>{heading}</div>
            <div className='ml-auto cursor-pointer text-light hover:text-white'>
                {type === 'queue' && (
                    <IoMdClose
                        onClick={() => {
                            if (setShowQueueModal) {
                                setShowQueueModal(false)
                            }
                        }}
                        size={24}
                    />
                )}
                {type === 'settings' && (
                    <label htmlFor='my-modal-5' className='cursor-pointer'>
                        <IoMdClose size={24} />
                    </label>
                )}
            </div>
        </div>
    )
}

export default ModalHeader

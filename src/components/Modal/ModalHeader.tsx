import React from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalHeaderProps {
    heading: string
    setShowQueueModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
    heading,
    setShowQueueModal,
}) => {
    return (
        <div className='flex h-16 w-full items-center rounded-t-lg border-b border-[#383f41] bg-[#151d20] px-6'>
            <div className='text-xl text-light'>{heading}</div>
            <div className='ml-auto cursor-pointer text-light hover:text-white'>
                <IoMdClose onClick={() => setShowQueueModal(false)} size={24} />
            </div>
        </div>
    )
}

export default ModalHeader

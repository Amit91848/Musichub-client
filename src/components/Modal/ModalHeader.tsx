import React from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalHeaderProps {
    heading: string
    onClickClose: VoidFunction
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
    heading,
    onClickClose,
}) => {
    return (
        <div className='flex h-20 w-full items-center rounded-t-lg border-b border-[#383f41] bg-[#151d20] px-6'>
            <div className='text-xl text-light'>{heading}</div>
            <div className='ml-auto cursor-pointer text-light hover:text-white'>
                <IoMdClose onClick={onClickClose} size={24} />
            </div>
        </div>
    )
}

export default ModalHeader

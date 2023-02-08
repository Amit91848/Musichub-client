import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillTrashFill, BsThreeDotsVertical } from 'react-icons/bs'
import { MdQueueMusic } from 'react-icons/md'

interface DropdownProps {
    handleAddToQueue: () => void
}

export const Dropdown: React.FC<DropdownProps> = ({ handleAddToQueue }) => {
    return (
        <div className='dropdown dropdown-end dropdown-hover compact'>
            <label
                tabIndex={0}
                className='btn m-1 border-none bg-transparent hover:bg-transparent'
            >
                <BsThreeDotsVertical
                    className='hidden duration-300 group-hover:flex'
                    size={22}
                />
            </label>
            <ul
                tabIndex={0}
                className='dropdown-content menu rounded-box w-52 bg-darkSupport p-2 shadow'
            >
                <li>
                    <a
                        className='hover:bg-[#2f3638]'
                        onClick={handleAddToQueue}
                    >
                        {' '}
                        <MdQueueMusic size={17} /> Add To Queue
                    </a>
                </li>
                <li>
                    <a className='hover:bg-[#2f3638]'>
                        {' '}
                        <AiOutlinePlus size={17} /> Add to playlist
                    </a>
                </li>
                <li>
                    <a className='hover:bg-[#2f3638]'>
                        {' '}
                        <BsFillTrashFill size={17} /> Remove from playlist
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Dropdown

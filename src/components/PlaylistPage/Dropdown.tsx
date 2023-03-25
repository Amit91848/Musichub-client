import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillTrashFill, BsThreeDotsVertical } from 'react-icons/bs'
import { MdQueueMusic } from 'react-icons/md'

import { updateActive } from '@/store/reducers/user'
import { useAppDispatch } from '@/store/store'

interface DropdownProps {
    handleAddToQueue: () => void
}

export const Dropdown: React.FC<DropdownProps> = ({ handleAddToQueue }) => {
    const dispatch = useAppDispatch()
    return (
        <div className='dropdown-hover dropdown-end dropdown compact'>
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
                        <label
                            className='relative flex cursor-pointer items-center'
                            htmlFor='my-modal-5'
                            onClick={() => dispatch(updateActive('playlists'))}
                        >
                            <AiOutlinePlus className='mr-3' size={17} /> Add to
                            playlist
                        </label>
                    </a>
                </li>
                <li>
                    <a className='hover:bg-[#2f3638]'>
                        {' '}
                        <BsFillTrashFill size={17} /> Remove
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Dropdown

import clsx from 'clsx'
import { useState } from 'react'
import Link from 'next/link'

import PlaylistContainer from './Playlist/PlaylistContainer'

const Sidebar = () => {
    const [mode, setMode] = useState<'dark' | 'light'>('dark')
    return (
        <>
            <div
                className={clsx(
                    'main-bg flex h-full w-60 flex-col space-y-4 pl-7 pb-8 text-font shadow-lg',
                    mode === 'dark' ? 'bg-dark' : 'bg-light'
                )}
            >
                <h4 className='mt-5 flex items-baseline '>
                    Hello <p className='ml-2 font-eliteSpecial'>User!</p>{' '}
                </h4>
                <div className='text ml-6 flex flex-col gap-2 font-light'>
                    <Link href='/library'>
                        <div className='cursor-pointer'>Library</div>
                    </Link>
                    <Link href='/search'>
                        <div className='cursor-pointer'>Search</div>
                    </Link>
                </div>
                <PlaylistContainer />
            </div>
        </>
    )
}

export default Sidebar

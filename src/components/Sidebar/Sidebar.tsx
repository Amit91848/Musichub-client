import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons'
import { BiSearch } from 'react-icons/bi'
import { ImMusic } from 'react-icons/im'

import PlaylistContainer from './Playlist/PlaylistContainer'

const Sidebar = () => {
    const router = useRouter()
    return (
        <>
            <div className='flex h-full w-60 flex-col overflow-scroll text-font shadow-lg'>
                <div className='mt-5 flex w-full flex-col items-center'>
                    <div className='h-16'>
                        <Link
                            href='/library'
                            className='text-xl normal-case text-font'
                        >
                            Music Hub
                        </Link>
                    </div>
                    <h3 className='font-eliteSpecial'>App</h3>
                    <div className='text mt-1 w-4/5 font-light'>
                        <Link href='/library'>
                            <SidebarNav
                                Icon={ImMusic}
                                name='Library'
                                selected={router.pathname === '/library'}
                            />
                        </Link>
                        <Link href='/library/search'>
                            <SidebarNav
                                Icon={BiSearch}
                                name='Search'
                                selected={router.pathname.includes(
                                    '/library/search'
                                )}
                            />
                        </Link>
                    </div>
                    <PlaylistContainer />
                </div>
            </div>
        </>
    )
}

export default Sidebar

interface SidebarNav {
    selected: boolean
    Icon: IconType
    name: string
}

function SidebarNav({ selected, Icon, name }: SidebarNav) {
    return (
        <div
            className={clsx(
                'flex w-full cursor-pointer items-center gap-2 py-2 px-4 transition duration-300 hover:text-white',
                selected && 'rounded-lg bg-gray-300/10'
            )}
        >
            {' '}
            <Icon size={20} />
            <div className='text-sm'>{name}</div>
        </div>
    )
}

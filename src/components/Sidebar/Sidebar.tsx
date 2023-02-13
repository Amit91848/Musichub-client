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
            <div
                className={clsx(
                    'main-bg flex h-full w-60 flex-col justify-center space-y-4 pl-7 text-font shadow-lg'
                )}
            >
                <h4 className='font-eliteSpecial'>App</h4>
                <div className='text ml-6 flex flex-col gap-2 font-light'>
                    <Link href='/library'>
                        <SidebarNav
                            Icon={ImMusic}
                            name='Library'
                            selected={router.pathname.includes('/library')}
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
                'flex w-fit cursor-pointer items-center gap-2 p-1 px-3',
                selected && 'rounded-lg bg-gray-300/30'
            )}
        >
            {' '}
            <Icon size={20} />
            <div>{name}</div>
        </div>
    )
}

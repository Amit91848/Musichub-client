import * as React from 'react'

import Header from './Header'
import Sidebar from '../Sidebar/Sidebar'
import Player from '../SongPlayer/Player'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className='flex h-screen overflow-y-hidden bg-dark'>
                <Sidebar />
                <div className='relative w-full'>
                    <Header />
                    <div className='absolute top-[66px] right-0 bottom-20 w-full'>
                        {children}
                    </div>
                    <Player />
                </div>
            </div>
        </>
    )
}

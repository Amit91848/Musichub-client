import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import PlayerContainer from '../SongPlayer/PlayerContainer'
import Header from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
    // Put Header or Footer Here
    return (
        <>
            <div className='h-screen overflow-y-hidden bg-dark'>
                <Header />
                <div className='flex h-[calc(100vh_-_66px_-_80px)] overflow-scroll'>
                    <Sidebar />
                    {children}
                </div>
                <PlayerContainer />
            </div>
        </>
    )
}

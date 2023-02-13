import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import SpotifyPlayer from '../SongPlayer/SpotifyPlayer'
import Header from './Header'
import Player from '../SongPlayer/Player'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className='h-screen overflow-y-hidden bg-dark'>
                <Header />
                <div className='flex h-[calc(100vh_-_66px_-_80px)] overflow-scroll'>
                    <Sidebar />
                    {children}
                </div>
                {/* <SpotifyPlayer /> */}
                <Player />
            </div>
        </>
    )
}

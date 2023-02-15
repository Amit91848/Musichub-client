import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import SpotifyPlayer from '../SongPlayer/SpotifyPlayer'
import Header from './Header'
import Player from '../SongPlayer/Player'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className='flex h-screen overflow-y-hidden bg-dark'>
                {/* <Header />
                <div className='flex h-full overflow-scroll'>
                    <Sidebar />
                    {children}
                </div>
                <SpotifyPlayer />
                <Player /> */}
                <Sidebar />
                <div className='w-full'>
                    <Header />
                    {children}
                    <Player />
                </div>
            </div>
        </>
    )
}

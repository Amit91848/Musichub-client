import axios from 'axios'
import * as React from 'react'

import Layout from '@/components/layout/Layout'
import Playlists from '@/components/LibraryPlaylist/Playlists'

import { updatePlaylists } from '@/store/reducers/library'
import { useAppDispatch } from '@/store/store'

export default function LibraryPage() {
    const dispatch = useAppDispatch()
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const getAllPlaylists = async () => {
        const res = await axios.get(`${backendURL}/api/playlists`, {
            withCredentials: true,
        })

        dispatch(updatePlaylists(res.data))
    }
    React.useEffect(() => {
        async function getUserData() {
            const res = await axios.get(`${backendURL}/api/user`, {
                withCredentials: true,
            })
        }
        // getUserData()
        // getAllPlaylists()
    }, [])
    return (
        <>
            <button onClick={getAllPlaylists}> Sync </button>
            <Playlists />
        </>
    )
}

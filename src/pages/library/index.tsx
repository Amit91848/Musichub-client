import axios from 'axios'
import * as React from 'react'

import Layout from '@/components/layout/Layout'
import Playlists from '@/components/LibraryPlaylist/Playlists'

import { updatePlaylists } from '@/stores/reducers/library'
import { useAppDispatch } from '@/stores/store'

export default function LibraryPage() {
    const dispatch = useAppDispatch()
    async function getAllPlaylists() {
        const res = await axios.get('http://localhost:4040/api/playlists', {
            withCredentials: true,
        })

        dispatch(updatePlaylists(res.data))
    }
    React.useEffect(() => {
        async function getUserData() {
            const res = await axios.get('http://localhost:4040/api/user', {
                withCredentials: true,
            })
        }
        // getUserData()
        // getAllPlaylists()
    }, [])
    return (
        <Layout>
            <Playlists />
        </Layout>
    )
}

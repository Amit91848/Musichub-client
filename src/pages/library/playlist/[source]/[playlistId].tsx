import React from 'react'

import Layout from '@/components/layout/Layout'
import MainContainer from '@/components/PlaylistPage/MainContainer'

interface playlistIdProps {}

export const PlaylistId: React.FC<playlistIdProps> = ({}) => {
    return (
        <Layout>
            <MainContainer />
        </Layout>
    )
}
export default PlaylistId

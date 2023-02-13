import React from 'react'

import Layout from '@/components/layout/Layout'
import RecentSearchContainer from '@/components/Serach/RecentSearchContainer'

interface indexProps {
    source: string
}

export const index: React.FC<indexProps> = ({ source }) => {
    return (
        <>
            {/* <Layout> */}
            <RecentSearchContainer />
            {source}
            {/* </Layout> */}
        </>
    )
}

export default index

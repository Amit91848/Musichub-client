import SearchContainer from '@/components/Serach/SearchContainer'
import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import React from 'react'

interface indexProps {}

export const Index: React.FC<indexProps> = ({}) => {
    return (
        <Layout>
            <SearchContainer />
        </Layout>
    )
}

export default Index

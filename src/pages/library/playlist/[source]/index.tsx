import { useRouter } from 'next/router'
import React from 'react'

interface indexProps {}

export const Index: React.FC<indexProps> = ({}) => {
    const router = useRouter()
    const route = router.query
    return (
        <div>
            <div> {route.source}</div>
        </div>
    )
}

export default Index

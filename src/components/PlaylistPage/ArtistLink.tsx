import Link from 'next/link'
import React from 'react'

import { CommonTracks, service } from '@/constant/services'

interface ArtistLinkProps {
    artist: CommonTracks['artist'][0]
    source: service
    length: number
    index: number
}

export const ArtistLink: React.FC<ArtistLinkProps> = ({
    artist,
    source,
    length,
    index,
}) => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    return (
        <>
            {index === 0 ? '' : ', '}
            <Link
                className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary-600 hover:underline'
                href={`/library/artist/${source}/${artist.id}/${artist.name}`}
            >
                {artist.name}
            </Link>
        </>
    )
}

export default ArtistLink

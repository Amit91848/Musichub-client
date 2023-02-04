import { CommonTracks, service } from '@/constant/services'
import Link from 'next/link'
import React from 'react'

interface ArtistLinkProps {
    artist: CommonTracks['artist'][0]
    source: service
}

export const ArtistLink: React.FC<ArtistLinkProps> = ({ artist, source }) => {
    return (
        <Link
            className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary-600 hover:underline'
            href={`http://localhost:4040/api/artist/${source}/${artist.id}/${artist.name}`}
        >
            {', '}
            {artist.name}
        </Link>
    )
}

export default ArtistLink

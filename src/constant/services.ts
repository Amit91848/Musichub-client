export type source = 'youtube' | 'spotify' | 'soundcloud'
export type service = 'youtube' | 'spotify' | 'soundcloud'


export interface CommonPlaylist {
    playlistId: string,
    description: string,
    img:
    { url: string, width: number | null, height: number | null }[],
    name: string,
    tracks: CommonTracks[],
    isStarred: false,
    isConnected: true,
    total: number,
    source: source
}

export interface libraryData {
    playlists: {
        spotify: CommonPlaylist[],
        youtube: CommonPlaylist[],
        soundcloud: CommonPlaylist[]
    }
}

export interface CommonTracks {
    album: {
        id: string,
        title: string
    },
    artist: {
        id: string,
        name: string,
    }[],
    duration: number,
    img: {
        height: number | null,
        url: string,
        width: number | null
    }[],
    source: service,
    title: string,
    id: string
}

export interface SpotifyArtists extends SpotifyCommon {
    items: {
        externals_urls: {
            spotify: string,
        },
        followers: {
            href: null,
            total: number,
        },
        genres: string[],
        href: string,
        id: string,
        images: {
            height: number,
            url: string,
            width: number
        }[],
        name: string,
        popularity: 89,
        type: string,
        uri: string
    }[]
}

export interface SpotifyCommon {
    href: string,
    limit: number,
    next: string,
    offset: 0,
    previous: string | null,
    total: number
}